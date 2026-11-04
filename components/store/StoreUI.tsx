'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { formatPrice, getProduct, isPurchasable, statusLabel, type Product } from '@/lib/store/products';
import { useCart } from './cart';

export function StoreBar() {
  const { count, ready } = useCart();
  const pathname = usePathname();
  const links = [
    { href: '/store', label: 'ALL PRODUCTS' },
    { href: '/store/support', label: 'HELP' },
  ];
  return (
    <div className="st-bar">
      {links.map((l) => (
        <Link key={l.href} href={l.href} className={`st-bar-link${pathname === l.href ? ' is-on' : ''}`}>
          {l.label}
        </Link>
      ))}
      <Link href="/store/cart" className={`st-bar-link${pathname === '/store/cart' ? ' is-on' : ''}`}>
        CART <span className="st-bar-count">{ready ? count : 0}</span>
      </Link>
    </div>
  );
}

export function StatusBadge({ p }: { p: Product }) {
  const cls = p.status === 'free' ? 'badge-free' : p.status === 'in-development' ? 'badge-dev' : 'badge-sale';
  return <span className={`badge ${cls}`}>{statusLabel[p.status]}</span>;
}

export function PriceTag({ p }: { p: Product }) {
  if (p.status === 'free') return <span className="price">免费</span>;
  if (p.price === null) return <span className="price muted">即将推出</span>;
  return (
    <span className="price">
      {formatPrice(p.price)}
      {p.compareAt ? <s className="muted">{formatPrice(p.compareAt)}</s> : null}
    </span>
  );
}

export function ProductCard({ p, large = false }: { p: Product; large?: boolean }) {
  return (
    <Link href={`/store/${p.slug}`} className={`pcard${large ? ' pcard-lg' : ''}`}>
      <div className={`pcard-media pcard-media-${p.slug}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.image} alt={p.imageAlt} loading="lazy" />
      </div>
      <div className="pcard-body">
        <div className="pcard-row">
          <StatusBadge p={p} />
          <span className="pcard-fmt mono">{p.formats.join(' · ')}</span>
        </div>
        <h3 className="h3">{p.name}</h3>
        <p className="muted">{p.short}</p>
        <div className="pcard-row pcard-foot">
          <PriceTag p={p} />
          <span className="pcard-more">
            查看详情 <span aria-hidden>→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}

export function AddToCart({ slug, big = false }: { slug: string; big?: boolean }) {
  const { add, has, ready } = useCart();
  const p = getProduct(slug);
  if (!p || !isPurchasable(p)) return null;
  return ready && has(slug) ? (
    <Link href="/store/cart" className={`btn btn-light${big ? '' : ' btn-sm'}`}>
      已在购物车，去结算 <span className="arrow">→</span>
    </Link>
  ) : (
    <button type="button" className={`btn btn-primary${big ? '' : ' btn-sm'}`} onClick={() => add(slug)}>
      加入购物车 · {formatPrice(p.price!)}
    </button>
  );
}

export function BuyNow({ slug }: { slug: string }) {
  const { add } = useCart();
  const router = useRouter();
  const p = getProduct(slug);
  if (!p || !isPurchasable(p)) return null;
  return (
    <button
      type="button"
      className="btn"
      onClick={() => {
        add(slug);
        router.push('/store/cart');
      }}
    >
      立即购买
    </button>
  );
}

export function DownloadButton({ slug }: { slug: string }) {
  const { toast } = useCart();
  const p = getProduct(slug);
  if (!p?.download) return null;
  const { url, label, note } = p.download;
  return (
    <div className="dl">
      <a
        className="dl-btn"
        href={url || '#download'}
        target={url ? '_blank' : undefined}
        rel="noopener noreferrer"
        onClick={(e) => {
          if (!url) {
            e.preventDefault();
            toast('安装包正在上传，马上就好');
          }
        }}
      >
        <span className="dl-os">{label}</span>
        <span className="dl-note">{note}</span>
        <span className="dl-icon" aria-hidden>
          ↓
        </span>
      </a>
    </div>
  );
}

export function WaitlistForm({ product }: { product: string }) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState('sending');
    try {
      const r = await fetch('/api/store/waitlist', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, product }),
      });
      setState(r.ok ? 'done' : 'error');
    } catch {
      setState('error');
    }
  }
  if (state === 'done')
    return (
      <p className="wl-done">
        <span className="eyebrow">已登记</span>
        <br />
        上线第一时间通知你：{email}
      </p>
    );
  return (
    <form className="wl" onSubmit={submit}>
      <label htmlFor={`wl-${product}`} className="sr">
        邮箱
      </label>
      <input
        id={`wl-${product}`}
        className="input"
        type="email"
        required
        placeholder="你的邮箱"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="btn btn-primary" disabled={state === 'sending'}>
        {state === 'sending' ? '提交中…' : '上线提醒我'}
      </button>
      {state === 'error' && <p className="wl-err">没提交成功，稍后再试一次。</p>}
    </form>
  );
}

export function ClearCartOnMount() {
  const { clear, ready } = useCart();
  useEffect(() => {
    if (ready) clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);
  return null;
}
