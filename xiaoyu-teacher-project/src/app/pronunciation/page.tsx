"use client";
import Link from "next/link";
import { useState } from "react";
const items = [{t:"妈",p:"mā",d:"第一声 · 高而平"},{t:"麻",p:"má",d:"第二声 · 向上扬"},{t:"马",p:"mǎ",d:"第三声 · 先降后升"},{t:"骂",p:"mà",d:"第四声 · 快速下降"}];
export default function Pronunciation() {
 const [idx,setIdx]=useState(0);
 function speak(){if(!("speechSynthesis" in window))return; const u=new SpeechSynthesisUtterance(items[idx].t);u.lang="zh-CN";u.rate=.75;window.speechSynthesis.cancel();window.speechSynthesis.speak(u);}
 return <main className="app-shell"><nav className="nav"><Link className="brand" href="/">☯ 小语老师</Link><Link href="/">返回首页</Link></nav><section className="practice"><div className="eyebrow">普通话发音小课堂</div><h1>认识中文四个声调</h1><p>同一个音节，声调不同，意思可能完全不同。先听示范，再跟着练习。</p><div className="tone-card"><div className="tone-count">{idx+1} / 4</div><div className="hanzi">{items[idx].t}</div><div className="pinyin">{items[idx].p}</div><h2>{items[idx].d}</h2><button className="primary play" onClick={speak}>▶ 听老师示范</button><div className="tone-tabs">{items.map((x,i)=><button key={x.t} className={idx===i?"selected":""} onClick={()=>setIdx(i)}>{x.t}<small>{x.p}</small></button>)}</div></div><div className="tip">小提示：请留意声音的高低变化。此页面提供发音示范，尚未启用自动声调评分。</div></section></main>;
}
