import Navigation from './Navigation';
import BackgroundPattern from './BackgroundPattern';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white relative">
      <BackgroundPattern />
      <Navigation />
      <main className="relative z-10 pt-20 md:pt-24">
        {children}
      </main>
    </div>
  );
}

