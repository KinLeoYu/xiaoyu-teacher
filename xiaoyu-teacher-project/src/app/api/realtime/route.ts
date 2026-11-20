import { NextResponse } from "next/server";

// 接入 OpenAI Realtime 时，在服务端创建短时 client secret。
// 此占位接口不会暴露 API Key，也不会假装已连接真实 AI。
export async function POST() {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: "尚未配置 OPENAI_API_KEY。当前网站处于演示模式。" }, { status: 503 });
  }
  return NextResponse.json({ error: "Realtime 接口尚需完成会话创建与权限配置。" }, { status: 501 });
}
