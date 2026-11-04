import type { Metadata } from 'next';
import { CartProvider } from '@/components/store/cart';
import { StoreBar } from '@/components/store/StoreUI';
import './wz.css';
import './store.css';

export const metadata: Metadata = {
  title: 'STORE | ASBEEL/D4nn9',
  description: '为自录自混的说唱制作者做的插件：HARDICK、UDG、SPIKE MIX HUB。',
};

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="st-page is-wz">
      <div className="wz">
        <CartProvider>
          <StoreBar />
          {children}
        </CartProvider>
      </div>
    </div>
  );
}
