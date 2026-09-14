'use client';

import { useState } from 'react';

export default function StudioContact() {
  const [message, setMessage] = useState('');
  async function copyWechat() {
    try { await navigator.clipboard.writeText('18665816072'); setMessage('已复制微信号'); }
    catch { setMessage('请长按或选中微信号复制：18665816072'); }
  }
  return <section id="contact" className="studio-contact">
    <span className="eyebrow">04 / Start a conversation</span>
    <h2>一起完成<br />下一部作品。</h2>
    <p>影像项目、课程合作，或一个还在形成中的想法。可以从用途、参考作品与预计时间聊起。</p>
    <div className="contact-options"><a href="mailto:1721443003@qq.com">1721443003@qq.com ↗</a><button type="button" onClick={copyWechat}>微信 18665816072 <span>复制 ↗</span></button></div>
    <p role="status" className="copy-status">{message}</p>
    <div className="studio-footer"><span>IYKYK STUDIO / 深圳艺富诺优艺术有限公司</span><span>London / Shenzhen</span></div>
  </section>;
}
