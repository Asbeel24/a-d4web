import Navigation from './Navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white relative">
      <Navigation />
      <main className="relative z-10 page-enter">
        {children}
      </main>
    </div>
  );
}
