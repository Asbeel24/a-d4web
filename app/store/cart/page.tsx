'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/components/store/cart';
import { formatPrice } from '@/lib/store/products';

const ERRORS: Record<string, string> = {
  payments_not_configured: '支付通道还没配置好，请稍后再来。',
  invalid_email: '邮箱格式不对，请再检查一下。',
  empty_cart: '购物车是空的。',
};

export default function Cart() {
  const { items, total, ready, remove } = useCart();
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function pay(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    try {
      const r = await fetch('/api/store/checkout', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, type: 'wxpay', items: items.map((p) => p.slug) }),
      });
      const d = await r.json();
      if (!r.ok || !d.paymentUrl) throw new Error(d.error);
      window.location.href = d.paymentUrl;
    } catch (e) {
      const code = e instanceof Error ? e.message : '';
      setErr(ERRORS[code] ?? '订单没有创建成功，请稍后再试。');
      setBusy(false);
    }
  }

  if (ready && items.length === 0) {
    return (
      <div className="st-wrap st-narrow">
        <p className="st-eyebrow">Cart</p>
        <h1 className="st-title st-title-sm">购物车是空的</h1>
        <Link href="/store" className="st-btn">去看看 →</Link>
      </div>
    );
  }

  return (
    <div className="st-wrap st-checkout">
      <div>
        <p className="st-eyebrow">Cart</p>
        <h1 className="st-title st-title-sm">CHECKOUT</h1>
        <ul className="st-lines">
          {items.map((p) => (
            <li key={p.slug}>
              <Link href={`/store/${p.slug}`}>{p.name}</Link>
              <span>{formatPrice(p.price!)}</span>
              <button type="button" onClick={() => remove(p.slug)} aria-label={`移除 ${p.name}`}>
                REMOVE
              </button>
            </li>
          ))}
        </ul>
        <div className="st-total">
          <span>TOTAL</span>
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>

      <form className="st-form" onSubmit={pay}>
        <div className="st-label">PAYMENT</div>
        <div className="st-pay st-pay-one">
          <label className="is-on">
            <input type="radio" name="type" value="wxpay" checked readOnly />
            微信支付
          </label>
        </div>

        <label className="st-label" htmlFor="st-email">EMAIL（选填，用于找回订单）</label>
        <input
          id="st-email"
          className="st-input"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {err && <p className="st-err" role="alert">{err}</p>}

        <button className="st-btn st-btn-solid st-btn-block" disabled={busy || !ready || items.length === 0}>
          {busy ? '正在跳转支付…' : `微信支付 · ${formatPrice(total)}`}
        </button>
        <p className="st-note">
          数字商品，付款后页面会直接显示下载方式。请收藏付款成功页，方便之后再次下载。
        </p>
      </form>
    </div>
  );
}
