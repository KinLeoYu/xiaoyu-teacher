import { NextResponse } from "next/server";

// Azure Speech 临时令牌接口占位。配置密钥后仍需补齐实际令牌交换逻辑。
export async function GET() {
  if (!process.env.AZURE_SPEECH_KEY || !process.env.AZURE_SPEECH_REGION) {
    return NextResponse.json({ error: "尚未配置 Azure Speech 环境变量。" }, { status: 503 });
  }
  return NextResponse.json({ error: "请完成 Azure Speech token 交换逻辑后启用。" }, { status: 501 });
}
