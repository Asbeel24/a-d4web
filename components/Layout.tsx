import Navigation from './Navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white relative">
      <a className="skip-link" href="#main-content">跳至内容</a>
      <Navigation />
      <main id="main-content" className="relative z-10 page-enter">
        {children}
      </main>
    </div>
  );
}
