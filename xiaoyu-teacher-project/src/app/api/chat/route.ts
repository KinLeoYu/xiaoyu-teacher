import { NextRequest, NextResponse } from "next/server";
export const runtime = "nodejs";
const instructions = `You are Xiaoyu, a patient professional Mandarin tutor for learners worldwide. Adapt to the learner's level. Help beginners primarily in clear simple English while teaching natural Simplified Chinese. For useful phrases include Hanzi, pinyin with tone marks, and concise English meaning. Correct mistakes gently with the learner's version, a natural correction, and a short explanation. Ask one manageable follow-up question. Keep answers concise and practical. Never claim to hear or score pronunciation from text.`;
export async function POST(request: NextRequest) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return NextResponse.json({ error: "AI 服务尚未配置。请在 Vercel 环境变量中添加 OPENAI_API_KEY，然后重新部署。" }, { status: 503 });
  try {
    const body = await request.json();
    if (!Array.isArray(body?.messages) || body.messages.length < 1 || body.messages.length > 24) return NextResponse.json({ error: "对话内容无效，请刷新页面后重试。" }, { status: 400 });
    const input = body.messages.filter((m: any) => ["user", "assistant"].includes(m?.role) && typeof m?.content === "string").slice(-20).map((m: any) => ({ role: m.role, content: m.content.slice(0, 4000) }));
    if (!input.length) return NextResponse.json({ error: "请输入文字后再发送。" }, { status: 400 });
    const upstream = await fetch("https://api.openai.com/v1/responses", { method: "POST", headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" }, body: JSON.stringify({ model: process.env.OPENAI_MODEL || "gpt-4o-mini", instructions, input, max_output_tokens: 700 }) });
    const data = await upstream.json();
    if (!upstream.ok) return NextResponse.json({ error: data?.error?.message || `AI 服务请求失败（${upstream.status}）` }, { status: 502 });
    const reply = data.output_text || (data.output || []).flatMap((x: any) => x.content || []).filter((x: any) => x.type === "output_text").map((x: any) => x.text).join("\n");
    if (!reply) return NextResponse.json({ error: "AI 暂时没有返回文字，请再试一次。" }, { status: 502 });
    return NextResponse.json({ reply });
  } catch { return NextResponse.json({ error: "暂时无法连接 AI 服务，请稍后重试。" }, { status: 500 }); }
}
