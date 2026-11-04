import type { Metadata } from 'next';
import { CartProvider } from '@/components/store/cart';
import { StoreBar } from '@/components/store/StoreUI';
import './store.css';

export const metadata: Metadata = {
  title: 'STORE | ASBEEL/D4nn9',
  description: 'Plugins and software by ASBEEL/D4nn9.',
};

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <div className="st-page">
        <StoreBar />
        {children}
      </div>
    </CartProvider>
  );
}
