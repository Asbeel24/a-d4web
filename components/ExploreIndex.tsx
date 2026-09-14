import Image from 'next/image';
import Link from 'next/link';

const works = [
  { title: 'ATTACHMENT', category: 'Experimental film', image: '/media/images/recent/attachment/i2.webp', href: '/visual#attachment', note: '探索画面 ↗' },
  { title: 'SHANGHAI NIGHT', category: 'Music video', image: '/media/images/recent/shanghai-night/k1.webp', href: '/visual#music-video', note: '探索画面 ↗' },
  { title: '拍拍 TAPTAP', category: 'AI horror short film', image: '/media/images/recent/taptap/h1.webp', href: '/visual#taptap', note: '探索画面 ↗' },
];

export default function ExploreIndex() {
  return (
    <section id="explore" className="explore-section">
      <div className="section-heading"><span className="eyebrow">01 / Selected transmissions</span><Link href="/visual">全部影像 ↗</Link></div>
      <h2 className="editorial-title">一些正在发生的世界。</h2>
      <div className="selected-works">
        {works.map((work, index) => (
          <Link href={work.href} className="selected-work" key={work.title}>
            <div className="selected-work-image"><Image src={work.image} alt={`${work.title} 作品画面`} fill sizes={index === 0 ? '(max-width: 760px) 100vw, 60vw' : '(max-width: 760px) 100vw, 35vw'} /><span>{work.note}</span></div>
            <div className="selected-work-caption"><h3>{work.title}</h3><span>{work.category}</span></div>
          </Link>
        ))}
      </div>
      <div className="explore-doors">
        <Link href="/eda-project"><span className="eyebrow">02 / Play</span><h2>触碰，让它发生。<span>↗</span></h2><p>粒子、信号、生成系统。进入互动实验，寻找意外。</p></Link>
        <Link href="/sound"><span className="eyebrow">03 / Listen</span><h2>换一种方式进入。<span>↗</span></h2><p>实验电子、Beats 与现场声音。戴上耳机，停留一会儿。</p></Link>
      </div>
      <div className="studio-invitation"><div><span className="eyebrow">Behind the work / IYKYK Studio</span><p>有些探索，也可以一起完成。</p></div><Link href="/studio">走进工作室 ↗</Link></div>
    </section>
  );
}
