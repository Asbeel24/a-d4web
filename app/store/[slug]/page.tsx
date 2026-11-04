import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { formatPrice, getProduct, products, statusLabel } from '@/lib/store/products';
import { AddToCart, AudioAB, BuyNow, FreeDownload } from '@/components/store/StoreUI';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProduct((await params).slug);
  return p ? { title: `${p.name} | STORE`, description: p.summary } : {};
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProduct((await params).slug);
  if (!p) notFound();

  return (
    <div className="st-wrap" style={{ ['--accent' as string]: p.accent }}>
      <Link href="/store" className="st-back">← ALL PRODUCTS</Link>
      <div className="st-detail">
        <div className="st-detail-media motion-rise">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.image} alt={p.imageAlt} />
        </div>
        <div className="st-detail-info motion-rise motion-delay-1">
          <div className="st-row">
            <span className={`st-badge st-badge-${p.status}`}>{statusLabel[p.status]}</span>
            <span className="st-muted">{p.kind}</span>
          </div>
          <h1 className="st-detail-title">{p.name}</h1>
          <p className="st-card-short">{p.short}</p>
          <p className="st-body">{p.summary}</p>

          <div className="st-price-line">
            {p.status === 'free' ? 'FREE' : p.price === null ? 'COMING SOON' : formatPrice(p.price)}
          </div>

          <div className="st-actions">
            <BuyNow slug={p.slug} />
            <AddToCart slug={p.slug} />
            <FreeDownload p={p} />
            {p.status === 'in-development' && <span className="st-btn is-disabled">开发中，敬请期待</span>}
          </div>

          {p.preview && (
            <div className="st-block">
              <div className="st-label">A / B PREVIEW</div>
              <AudioAB p={p} />
            </div>
          )}

          <div className="st-block">
            <div className="st-label">FEATURES</div>
            <ul className="st-list">
              {p.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>

          <div className="st-specs">
            <div><span>FORMAT</span><strong>{p.formats.join(' / ')}</strong></div>
            <div><span>PLATFORM</span><strong>{p.platforms.join(' / ')}</strong></div>
            <div><span>LICENCE</span><strong>1 user</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
}
