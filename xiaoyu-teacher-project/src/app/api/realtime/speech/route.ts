import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

// The standard API key stays on the server. The browser sends only its SDP offer.
export async function POST(request: NextRequest) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "自然语音尚未配置。请在 Vercel 环境变量中添加新的 OPENAI_API_KEY 并重新部署。" },
      { status: 503 },
    );
  }

  try {
    const sdp = await request.text();
    if (!sdp || sdp.length > 200_000) {
      return NextResponse.json({ error: "语音连接信息无效，请重试。" }, { status: 400 });
    }

    const form = new FormData();
    form.set("sdp", new Blob([sdp], { type: "application/sdp" }), "offer.sdp");
    form.set(
      "session",
      new Blob(
        [JSON.stringify({
          type: "realtime",
          model: process.env.OPENAI_REALTIME_MODEL || "gpt-realtime-2.1-mini",
          output_modalities: ["audio"],
          instructions: "You are Xiaoyu, a warm, lively and encouraging female Mandarin teacher. Speak natural standard Mandarin (Putonghua) with friendly energy, gentle emotional variation, clear tones, natural pauses and a medium-slow teaching pace. Sound like a real patient teacher talking to one student, not like a news announcer or a robotic reading voice. Read the provided Chinese text faithfully. Do not add extra words.",
          audio: { output: { voice: "marin", speed: 0.96 } },
          max_output_tokens: 1200,
        })],
        { type: "application/json" },
      ),
      "session.json",
    );

    const upstream = await fetch("https://api.openai.com/v1/realtime/calls", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}` },
      body: form,
    });
    const answer = await upstream.text();
    if (!upstream.ok) {
      let message = `语音服务暂时不可用（${upstream.status}）。`;
      try {
        const parsed = JSON.parse(answer);
        message = parsed?.error?.message || message;
      } catch { /* keep the safe fallback */ }
      return NextResponse.json({ error: message }, { status: 502 });
    }
    return new NextResponse(answer, { headers: { "Content-Type": "application/sdp", "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "暂时无法建立自然语音连接，请稍后重试。" }, { status: 500 });
  }
}
