'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { formatPrice, getProduct, isPurchasable, type Product } from '@/lib/store/products';
import { useCart } from './cart';

export function StoreBar() {
  const { count, ready } = useCart();
  const pathname = usePathname();
  return (
    <div className="st-bar">
      <Link href="/store" className={`st-bar-link${pathname === '/store' ? ' is-on' : ''}`}>
        ALL PRODUCTS
      </Link>
      <Link href="/store/cart" className={`st-bar-link${pathname === '/store/cart' ? ' is-on' : ''}`}>
        CART <span className="st-bar-count">{ready ? count : 0}</span>
      </Link>
    </div>
  );
}

export function AddToCart({ slug }: { slug: string }) {
  const { add, has, ready } = useCart();
  const p = getProduct(slug);
  if (!p || !isPurchasable(p)) return null;
  return ready && has(slug) ? (
    <Link href="/store/cart" className="st-btn">
      IN CART · 去结算 →
    </Link>
  ) : (
    <button type="button" className="st-btn" onClick={() => add(slug)}>
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
      className="st-btn st-btn-solid"
      onClick={() => {
        add(slug);
        router.push('/store/cart');
      }}
    >
      立即购买
    </button>
  );
}

export function FreeDownload({ p }: { p: Product }) {
  if (p.status !== 'free') return null;
  return p.freeDownload ? (
    <a href={p.freeDownload} className="st-btn st-btn-solid" download>
      免费下载 ↓
    </a>
  ) : (
    <span className="st-btn is-disabled">安装包即将上线</span>
  );
}

// Before / after player: both files play in sync, the switch just swaps which one is audible.
export function AudioAB({ p }: { p: Product }) {
  const dry = useRef<HTMLAudioElement>(null);
  const wet = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [side, setSide] = useState<'dry' | 'wet'>('wet');

  useEffect(() => {
    if (dry.current) dry.current.muted = side !== 'dry';
    if (wet.current) wet.current.muted = side !== 'wet';
  }, [side]);

  if (!p.preview) return null;

  const toggle = () => {
    const a = dry.current;
    const b = wet.current;
    if (!a || !b) return;
    if (playing) {
      a.pause();
      b.pause();
      setPlaying(false);
    } else {
      b.currentTime = a.currentTime;
      Promise.all([a.play(), b.play()]).then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  return (
    <div className="st-ab">
      <audio ref={dry} src={p.preview.dry} preload="none" loop muted={side !== 'dry'} />
      <audio ref={wet} src={p.preview.wet} preload="none" loop muted={side !== 'wet'} />
      <button type="button" className="st-ab-play" onClick={toggle} aria-pressed={playing}>
        {playing ? '■ STOP' : '▶ PLAY'}
      </button>
      <div className="st-ab-switch" role="group" aria-label="试听对比">
        {(['dry', 'wet'] as const).map((s) => (
          <button
            key={s}
            type="button"
            className={side === s ? 'is-on' : ''}
            aria-pressed={side === s}
            onClick={() => setSide(s)}
          >
            {s === 'dry' ? p.preview!.dryLabel : p.preview!.wetLabel}
          </button>
        ))}
      </div>
    </div>
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
