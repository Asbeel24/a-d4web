import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import StudioContact from '@/components/StudioContact';

export const metadata: Metadata = {
  title: 'IYKYK Studio — 影像与创意技术',
  description: '由 D4nn9 主理的 AIGC 影像制作与创意技术工作室。音乐影像、品牌影片、实验短片、AI 创作课程与工作流共建。',
};

export default function Studio() {
  return <div className="studio-page">
    <header className="studio-hero">
      <div className="studio-hero-copy"><p className="eyebrow">An independent creative practice / By D4nn9</p><h1>IYKYK<span>STUDIO</span></h1><p className="studio-lead">从一个想法，<br />到一个可以进入的世界。</p><p className="studio-intro">AIGC 影像制作与创意技术工作室。以影像为第一交付，在真实创作中发展方法，也把这些方法带进课堂与团队。</p><a className="text-link" href="#contact">聊聊你的项目 ↗</a></div>
      <div className="studio-hero-image"><Image src="/media/images/recent/attachment/i2.webp" alt="ATTACHMENT：生成影像中的身体与依赖关系" fill priority sizes="(max-width: 760px) 100vw, 50vw" /><Link href="/visual#attachment">ATTACHMENT / Experimental film ↗</Link></div>
    </header>
    <section className="studio-practice">
      <div className="section-heading"><span className="eyebrow">01 / Practice</span><span>影像 · 教育 · 创意技术</span></div>
      <article className="practice-row"><span className="practice-number">01</span><h2>影像制作<small>Film production</small></h2><div><p>从创意、脚本和分镜，到生成、剪辑与声音。围绕作品需要，选择合适的表达方式。</p><p className="practice-detail">Music video / Commercials / Experimental / Short film</p><Link href="/visual">进入影像作品集 ↗</Link></div></article>
      <article className="practice-row"><span className="practice-number">02</span><h2>教育与课程<small>Learning through making</small></h2><div><p>面向学校与教育机构，通过公开课、四周线上创作营和定制工作坊，帮助学习者完成自己的短片。</p><p className="practice-detail">创意包 → 视觉资产包 → 镜头素材包 → 最终短片</p><a href="#learning">看看四周创作路径 ↓</a></div></article>
      <article className="practice-row"><span className="practice-number">03</span><h2>咨询与工作流<small>Creative systems</small></h2><div><p>为内容团队判断 AIGC 的适用环节，将项目经验整理成可复用、可交接的 Skills 与 Workflow。</p><p className="practice-detail">流程诊断 / 方案设计 / 工作流原型 / 团队培训</p><a href="#contact">讨论共建方向 ↗</a></div></article>
    </section>
    <section id="learning" className="studio-learning"><div><span className="eyebrow">02 / Learning</span><h2 className="editorial-title">四周，<br />完成自己的短片。</h2><p>每周都有明确的创作成果。教师保留课程目标与最终判断，Skills 提供持续的过程支持。</p></div><ol>{[
      ['W1', '想法 → 文字', '主题、剧本、文字分镜与 Moodboard'],
      ['W2', '文字 → 图像', '角色、场景、关键帧与视觉分镜'],
      ['W3', '图像 → 视频', '镜头生成、一致性测试与粗剪'],
      ['W4', '素材 → 成片', '剪辑、声音、字幕与项目复盘'],
    ].map(([week, title, detail]) => <li key={week}><span>{week}</span><div><h3>{title}</h3><p>{detail}</p></div></li>)}</ol></section>
    <section className="studio-founder"><span className="eyebrow">03 / The person behind it</span><div><h2>D4nn9</h2><p>跨媒介数字艺术家 / IYKYK Studio 主理人</p><p>创作横跨声音、生成影像与创意编程。工作室的制作方法，来自这些持续进行的个人探索与项目实践。</p><Link href="/about">关于主理人 ↗</Link></div></section>
    <StudioContact />
  </div>;
}
