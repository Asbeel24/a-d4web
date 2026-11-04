import { NextResponse } from 'next/server';
import { getProduct, isPurchasable } from '@/lib/store/products';
import { PAY_TYPES, buildPaymentUrl, newOrderId, zpayConfig, type PayType } from '@/lib/store/zpay';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Creates a ZPAY payment for the cart and returns the hosted payment page URL.
export async function POST(req: Request) {
  let body: { email?: string; type?: string; items?: string[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'bad_json' }, { status: 400 });
  }

  if (!zpayConfig().ready) {
    return NextResponse.json({ error: 'payments_not_configured' }, { status: 503 });
  }

  const email = (body.email ?? '').trim();
  if (email && !EMAIL.test(email)) return NextResponse.json({ error: 'invalid_email' }, { status: 400 });
  const type: PayType = PAY_TYPES.includes(body.type as PayType) ? (body.type as PayType) : 'alipay';

  const items = Array.from(new Set(body.items ?? []))
    .map((s) => getProduct(s))
    .filter((p) => p && isPurchasable(p))
    .map((p) => p!);
  if (items.length === 0) return NextResponse.json({ error: 'empty_cart' }, { status: 400 });

  const total = items.reduce((n, p) => n + p.price!, 0);
  const orderId = newOrderId(items);
  const name = items.map((p) => p.name).join(' + ');
  const paymentUrl = buildPaymentUrl({ orderId, type, name, total, email: email || undefined });

  console.log('[store] order created', orderId, total, items.map((p) => p.slug).join(','), email || '-');
  return NextResponse.json({ orderId, total, paymentUrl });
}
