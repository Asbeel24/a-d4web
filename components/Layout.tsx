import Navigation from './Navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <main className="pt-20 md:pt-24">
        {children}
      </main>
    </div>
  );
}

