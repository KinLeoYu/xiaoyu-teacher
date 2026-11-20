"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
type Msg = { role: "teacher" | "student"; text: string };
export default function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([{role:"teacher",text:"你好！我是小语老师。我们今天聊聊你的生活吧。你可以点击麦克风说中文，也可以在下面输入文字。"}]);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(true);
  const rec = useRef<any>(null);
  useEffect(() => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) { setSupported(false); return; }
    const r = new SR(); r.lang = "zh-CN"; r.interimResults = false; r.continuous = false;
    r.onresult = (e: any) => { const t = e.results?.[0]?.[0]?.transcript || ""; setInput(t); setListening(false); };
    r.onerror = () => setListening(false); r.onend = () => setListening(false); rec.current = r;
  }, []);
  function speak(text: string) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text); u.lang = "zh-CN"; u.rate = 0.9; window.speechSynthesis.speak(u);
  }
  function send() {
    const text = input.trim(); if (!text) return;
    setMessages(m => [...m, {role:"student",text}]); setInput("");
    const reply = text.includes("你好") ? "你好呀！很高兴认识你。你今天过得怎么样？" : text.includes("谢谢") ? "不客气！你说得很好。我们继续练习吧。" : `说得不错！我听到了：“${text}”。我们可以试着把句子说得更自然一些。你愿意再说一遍吗？`;
    setTimeout(() => { setMessages(m => [...m,{role:"teacher",text:reply}]); speak(reply); }, 450);
  }
  return <main className="app-shell"><nav className="nav"><Link className="brand" href="/">☯ 小语老师</Link><Link href="/">返回首页</Link></nav>
    <section className="chat-wrap"><div className="chat-head"><div className="avatar-small">语</div><div><h1>和小语老师聊天</h1><p><span className="online"></span> 中文口语练习 · 演示模式</p></div></div>
      <div className="chat-area">{messages.map((m,i)=><div key={i} className={`bubble-row ${m.role}`}><div className="bubble-avatar">{m.role==="teacher"?"语":"我"}</div><div className="bubble">{m.text}</div></div>)}</div>
      <div className="composer"><button className={`mic ${listening?"active":""}`} onClick={()=>{if(!rec.current)return; if(listening){rec.current.stop();setListening(false)}else{setListening(true);rec.current.start()}}} title="语音输入">🎙</button><input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder={supported?"输入中文，或点击麦克风说话…":"当前浏览器不支持语音识别，请输入文字"}/><button className="send" onClick={send}>发送</button></div>
      <p className="privacy">语音识别由浏览器提供；此演示版不会将录音上传至服务器。{listening?" 正在聆听…":""}</p>
    </section>
  </main>;
}
