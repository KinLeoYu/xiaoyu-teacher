import Link from "next/link";

export default function Home() {
  return <main className="home">
    <nav className="nav"><Link className="brand" href="/">☯ 小语老师</Link><div><Link href="/chat">语音聊天</Link><Link href="/pronunciation">发音练习</Link></div></nav>
    <section className="hero">
      <div className="hero-copy">
        <div className="eyebrow">你好，欢迎来到中文小课堂</div>
        <h1>让中文学习<br/><span>像聊天一样自然。</span></h1>
        <p>和温柔的小语老师一起练习日常对话、听说表达与普通话发音。慢慢来，每一次开口都值得鼓励。</p>
        <div className="actions"><Link className="primary" href="/chat">开始语音聊天 <span>→</span></Link><Link className="secondary" href="/pronunciation">练习中文发音</Link></div>
        <div className="note">✦ 无需注册 · 先体验再决定</div>
      </div>
      <div className="teacher-scene"><div className="mist mist-a"></div><div className="mist mist-b"></div><div className="moon"></div><div className="teacher"><div className="hair"></div><div className="face"><i className="eye left"></i><i className="eye right"></i><i className="blush l"></i><i className="blush r"></i><i className="smile"></i></div><div className="neck"></div><div className="body"><div className="collar"></div></div></div><div className="speech">你好呀！今天想学点什么？</div><div className="leaf leaf1">❧</div><div className="leaf leaf2">❧</div></div>
    </section>
    <section className="features"><div><b>01</b><h3>自然对话</h3><p>从生活场景开始，练习真正用得上的中文。</p></div><div><b>02</b><h3>开口练习</h3><p>听一听、说一说，逐步建立表达自信。</p></div><div><b>03</b><h3>温柔反馈</h3><p>用简单清楚的提示，帮助你持续进步。</p></div></section>
    <footer>小语老师 · 陪你把中文说得越来越好</footer>
  </main>;
}
