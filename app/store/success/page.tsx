import Link from 'next/link';
import { formatPrice } from '@/lib/store/products';
import { deliveryUrl, verifyPayment } from '@/lib/store/zpay';
import { ClearCartOnMount } from '@/components/store/StoreUI';

export const dynamic = 'force-dynamic';

// ZPAY redirects the buyer here with signed parameters. The same signature check as the
// notify callback decides whether the download links are shown, so the URL works as a receipt.
export default async function Success({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const raw = await searchParams;
  const query = Object.fromEntries(
    Object.entries(raw).map(([k, v]) => [k, Array.isArray(v) ? v[0] : v]),
  ) as Record<string, string | undefined>;
  const result = verifyPayment(query);

  if (!result.ok) {
    return (
      <div className="st-wrap st-narrow">
        <p className="st-eyebrow">Payment</p>
        <h1 className="st-title st-title-sm">没有确认到付款</h1>
        <p className="st-body">
          如果你已经付款，请保留支付凭证并联系我，附上订单号 <span className="st-mono">{query.out_trade_no ?? '—'}</span>。
        </p>
        <Link href="/store/cart" className="st-btn">返回购物车 →</Link>
      </div>
    );
  }

  return (
    <div className="st-wrap st-narrow">
      <ClearCartOnMount />
      <p className="st-eyebrow">Payment confirmed</p>
      <h1 className="st-title st-title-sm">THANK YOU</h1>
      <p className="st-body">
        订单 <span className="st-mono">{result.orderId}</span> · {formatPrice(result.total)}。请收藏本页，之后可以随时回来下载。
      </p>
      <ul className="st-lines">
        {result.items.map((p) => {
          const url = deliveryUrl(p);
          return (
            <li key={p.slug}>
              <span>{p.name}</span>
              {url ? (
                <a href={url} className="st-btn st-btn-solid" target="_blank" rel="noopener noreferrer">
                  下载 ↓
                </a>
              ) : (
                <span className="st-muted">下载链接整理中，请联系我领取</span>
              )}
            </li>
          );
        })}
      </ul>
      <Link href="/store" className="st-btn">继续逛逛 →</Link>
    </div>
  );
}
