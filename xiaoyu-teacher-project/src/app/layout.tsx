import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "小语老师｜轻松开口说中文",
  description: "和温柔的小语老师一起练习中文口语与发音。"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
