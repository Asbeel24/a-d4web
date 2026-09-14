'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function FilmPlayer({ src, poster, title }: { src: string; poster: string; title: string }) {
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);
  return <div className="film-player">
    {playing ? <video controls autoPlay playsInline preload="none" poster={poster} aria-label={`${title} 完整影片`} onError={() => setFailed(true)}>
      <source src={src} type="video/mp4" />
      你的浏览器不支持视频播放。
    </video> : <button type="button" className="film-poster" onClick={() => setPlaying(true)} aria-label={`播放 ${title} 完整影片`}><Image src={poster} alt="" fill sizes="(max-width: 760px) 100vw, 90vw" /><span>▶ 播放完整影片</span></button>}
    <div className="film-caption"><span>{failed ? '视频暂时无法加载，可以尝试直接打开。' : `${title} / 完整影片 · 点击播放`}</span><a href={src} target="_blank" rel="noreferrer">直接打开 ↗</a></div>
  </div>;
}
