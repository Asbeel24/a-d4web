'use client';

export default function BackgroundPattern() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 点状背景 */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.15) 1px, transparent 0)',
          backgroundSize: '20px 20px',
        }}
      />
      
      {/* 抽象几何图形 */}
      <div className="absolute top-20 right-10 w-64 h-64 opacity-10">
        <div className="absolute inset-0 border border-white/20 transform rotate-45" />
        <div className="absolute inset-4 border border-white/10 transform -rotate-45" />
      </div>
      
      <div className="absolute bottom-20 left-10 w-96 h-96 opacity-5">
        <div className="absolute inset-0 border-2 border-white/10 transform rotate-12" />
        <div className="absolute inset-8 border border-white/5 transform -rotate-12" />
      </div>
      
      {/* 流动线条效果 */}
      <svg className="absolute top-0 left-0 w-full h-full opacity-5" viewBox="0 0 1000 1000">
        <path
          d="M0,500 Q250,300 500,500 T1000,500"
          stroke="white"
          strokeWidth="2"
          fill="none"
          className="animate-pulse"
        />
        <path
          d="M0,300 Q250,700 500,300 T1000,300"
          stroke="white"
          strokeWidth="1"
          fill="none"
          className="animate-pulse"
          style={{ animationDelay: '1s' }}
        />
      </svg>
    </div>
  );
}

