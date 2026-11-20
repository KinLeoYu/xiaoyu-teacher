# 小语老师 · 中文口语练习网站

## 本地运行
1. 安装 Node.js 20 或更新版本。
2. 在项目目录运行 `npm install`
3. 运行 `npm run dev`
4. 浏览器打开 http://localhost:3000

## 当前功能
- 首页、语音练习页、发音练习页
- 浏览器语音识别（支持情况取决于浏览器；建议 Chrome/Edge）
- 浏览器普通话语音朗读
- 演示对话逻辑，可先体验交互
- AI 实时语音和专业发音评测接口预留

## 上线为公网网址（Vercel）
1. 将整个项目上传到自己的 GitHub 仓库。
2. 登录 https://vercel.com ，选择 Add New → Project，导入该仓库。
3. Framework Preset 选择 Next.js，点击 Deploy。
4. 部署成功后 Vercel 会提供真实的 `https://...vercel.app` 网址。

## 接入真实 AI
目前对话为前端演示模式，不会调用真实 AI，也不会将录音上传。
后续接入时，在 Vercel Project Settings → Environment Variables 中配置：
- `OPENAI_API_KEY`
- `AZURE_SPEECH_KEY`
- `AZURE_SPEECH_REGION`

请勿把密钥写入浏览器端代码或提交到 GitHub。真实语音 AI 与声调评测需要后端接口、权限配置和实际测试后才能启用。
