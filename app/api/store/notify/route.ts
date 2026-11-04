import { verifyPayment } from '@/lib/store/zpay';

// ZPAY asynchronous notification. ZPAY keeps retrying until it receives the plain text "success".
// The order is logged to Vercel logs (Project → Logs, search "[store] paid").
async function handle(params: URLSearchParams) {
  const query = Object.fromEntries(params.entries());
  const result = verifyPayment(query);
  if (!result.ok) {
    console.warn('[store] notify rejected', result.reason, query.out_trade_no ?? '-');
    return new Response('fail', { status: 400 });
  }
  console.log(
    '[store] paid',
    result.orderId,
    result.tradeNo,
    result.total,
    result.items.map((p) => p.slug).join(','),
    result.email ?? '-',
  );
  return new Response('success', { headers: { 'content-type': 'text/plain' } });
}

export async function GET(req: Request) {
  return handle(new URL(req.url).searchParams);
}

export async function POST(req: Request) {
  const text = await req.text();
  return handle(new URLSearchParams(text));
}
