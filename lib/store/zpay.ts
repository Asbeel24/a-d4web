// ZPAY (易支付 protocol) helpers. Server only: these read the merchant key.
//
// Required environment variables (set them in Vercel → Settings → Environment Variables):
//   ZPAY_PID       merchant id (商户ID)
//   ZPAY_KEY       merchant key (商户密钥). Never commit it.
//   SITE_URL       public site address, e.g. https://example.com (used for notify / return URLs)
// Optional:
//   ZPAY_GATEWAY   defaults to https://zpayz.cn
//   STORE_DELIVERY_<SLUG>   download link shown after payment, e.g. STORE_DELIVERY_HARDICK

import { createHash, randomBytes } from 'node:crypto';
import { getProductByCode, isPurchasable, type Product } from './products';

export type PayType = 'alipay' | 'wxpay';
export const PAY_TYPES: PayType[] = ['alipay', 'wxpay'];

export function zpayConfig() {
  const pid = process.env.ZPAY_PID ?? '';
  const key = process.env.ZPAY_KEY ?? '';
  const gateway = (process.env.ZPAY_GATEWAY || 'https://zpayz.cn').replace(/\/+$/, '');
  const siteUrl = (process.env.SITE_URL || '').replace(/\/+$/, '');
  return { pid, key, gateway, siteUrl, ready: Boolean(pid && key && siteUrl) };
}

// 易支付 signature: drop sign / sign_type / empty values, sort keys by ASCII,
// join as k=v&k=v, append the merchant key, MD5, lowercase hex.
export function sign(params: Record<string, string | undefined>, key: string) {
  const str = Object.keys(params)
    .filter((k) => k !== 'sign' && k !== 'sign_type' && params[k] !== undefined && params[k] !== '')
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join('&');
  return createHash('md5').update(str + key, 'utf8').digest('hex');
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

// Order numbers look like D4 + 8 time chars + 4 random chars (uppercase) + product codes (lowercase),
// e.g. D4MH3K2Q1ZA7F9hd. The codes let the callback rebuild the order without a database.
const ORDER_RE = /^D4[0-9A-Z]{12}((?:[a-z]{2})+)$/;

export function newOrderId(items: Product[]) {
  const t = Date.now().toString(36).toUpperCase().padStart(8, '0').slice(-8);
  const r = randomBytes(3).toString('hex').toUpperCase().slice(0, 4);
  return `D4${t}${r}${items.map((p) => p.code).join('')}`;
}

export function itemsFromOrderId(orderId: string): Product[] | null {
  const m = ORDER_RE.exec(orderId);
  if (!m) return null;
  const codes = m[1].match(/.{2}/g) ?? [];
  const items = codes.map((c) => getProductByCode(c));
  if (items.some((p) => !p || !isPurchasable(p))) return null;
  return items as Product[];
}

export function toMoney(n: number) {
  return n.toFixed(2);
}

export function buildPaymentUrl(opts: {
  orderId: string;
  type: PayType;
  name: string;
  total: number;
  email?: string;
}) {
  const cfg = zpayConfig();
  const params: Record<string, string> = {
    pid: cfg.pid,
    type: opts.type,
    out_trade_no: opts.orderId,
    notify_url: `${cfg.siteUrl}/api/store/notify`,
    return_url: `${cfg.siteUrl}/store/success`,
    name: opts.name.slice(0, 100),
    money: toMoney(opts.total),
  };
  if (opts.email) params.param = opts.email;
  params.sign = sign(params, cfg.key);
  params.sign_type = 'MD5';
  return `${cfg.gateway}/submit.php?${new URLSearchParams(params).toString()}`;
}

export type VerifiedPayment =
  | { ok: true; orderId: string; tradeNo: string; items: Product[]; total: number; email?: string }
  | { ok: false; reason: string };

// Checks a ZPAY notify / return callback: signature, merchant id, status,
// and that the amount paid matches the catalogue price of what was ordered.
export function verifyPayment(query: Record<string, string | undefined>): VerifiedPayment {
  const cfg = zpayConfig();
  if (!cfg.pid || !cfg.key) return { ok: false, reason: 'not_configured' };
  const given = (query.sign ?? '').toLowerCase();
  if (!given || !safeEqual(given, sign(query, cfg.key))) return { ok: false, reason: 'bad_sign' };
  if (query.pid !== cfg.pid) return { ok: false, reason: 'bad_pid' };
  if (query.trade_status !== 'TRADE_SUCCESS') return { ok: false, reason: 'not_paid' };
  const orderId = query.out_trade_no ?? '';
  const items = itemsFromOrderId(orderId);
  if (!items) return { ok: false, reason: 'bad_order' };
  const total = items.reduce((n, p) => n + (p.price ?? 0), 0);
  if (Math.round(Number(query.money) * 100) !== Math.round(total * 100)) return { ok: false, reason: 'bad_amount' };
  return { ok: true, orderId, tradeNo: query.trade_no ?? '', items, total, email: query.param || undefined };
}

export function deliveryUrl(p: Product) {
  return process.env[`STORE_DELIVERY_${p.slug.replace(/-/g, '_').toUpperCase()}`] ?? '';
}
