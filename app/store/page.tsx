import Link from 'next/link';
import { formatPrice, products, statusLabel, type Product } from '@/lib/store/products';

function Price({ p }: { p: Product }) {
  if (p.status === 'free') return <span>FREE</span>;
  if (p.price === null) return <span className="st-muted">COMING SOON</span>;
  return <span>{formatPrice(p.price)}</span>;
}

export default function Store() {
  return (
    <div className="st-wrap">
      <header className="st-head">
        <p className="st-eyebrow motion-rise">Digital Store</p>
        <h1 className="st-title motion-rise motion-delay-1">STORE</h1>
        <p className="st-lead motion-rise motion-delay-2">
          自己做的插件和软件。支付宝 / 微信支付，付款后立即获取下载。
        </p>
      </header>

      <div className="st-grid motion-rise motion-delay-3">
        {products.map((p, i) => (
          <Link key={p.slug} href={`/store/${p.slug}`} className="st-card" style={{ ['--accent' as string]: p.accent }}>
            <div className="st-card-media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image} alt={p.imageAlt} loading={i < 2 ? 'eager' : 'lazy'} />
            </div>
            <div className="st-card-body">
              <div className="st-row">
                <span className={`st-badge st-badge-${p.status}`}>{statusLabel[p.status]}</span>
                <span className="st-muted">{p.kind} · {p.formats.join(' / ')}</span>
              </div>
              <h2 className="st-card-title">{p.name}</h2>
              <p className="st-card-short">{p.short}</p>
              <div className="st-row st-card-foot">
                <Price p={p} />
                <span className="st-more">VIEW →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
