# 小语老师 AI 中文学习网站 v2

## 本版本功能
- `/chat`：通过服务端 `/api/chat` 调用 OpenAI Responses API，支持多轮文字教学对话。
- 聊天页面：浏览器语音识别（SpeechRecognition）输入、浏览器中文语音朗读（speechSynthesis）。
- `/pronunciation`：四声示范、录音跟读、浏览器语音识别文字对照。

## 部署
1. 将 `xiaoyu-teacher-project` 目录中的全部内容更新到 GitHub 仓库对应项目目录。
2. Vercel 项目设置中添加环境变量 `OPENAI_API_KEY`，值为你自己新创建且未泄露的密钥。
3. `OPENAI_MODEL` 可选；不设置时默认使用 `gpt-4o-mini`。若模型不可用，可在 Vercel 中改成你 API 账户有权限的模型。
4. 保存后在 Vercel 重新部署。

## 安全
- 绝不要把 API Key 放进前端代码或 GitHub。
- 之前在聊天中发出的密钥应立即撤销，不可继续使用。

## 语音限制
- 浏览器语音识别是否可用取决于浏览器、设备、网络和麦克风权限。建议使用最新版 Chrome 或 Edge，并通过 HTTPS 访问。
- 当前发音页面只做语音转文字对照，不会测量声调或给出专业发音分数。
- AI 回复朗读使用浏览器系统语音，不是实时双向语音通话。


## 小语老师视觉升级 v3
- 首页、聊天页和发音练习页共用 `public/xiaoyu-teacher.png` 插画形象。
- 语音朗读优先选择浏览器可用的中文语音；不同设备、浏览器提供的声音不同，因此自然度无法保证。
- 当前仍使用浏览器内置语音合成与语音识别，不是专业云端配音，也不具备真正的发音评分。


## Xiaoyu v4 voice and character update

- The same standalone Xiaoyu character portrait (`public/xiaoyu-character.png`) is used on the home, chat, and pronunciation pages.
- The chat character has visual idle, listening, thinking, and speaking states. These are interface animations; they are not frame-accurate lip-sync.
- Natural spoken output uses the OpenAI Realtime WebRTC API through the server route `/api/realtime/speech`. The standard API key remains server-side.
- The existing browser speech-recognition input remains in place; this update does not claim to provide professional tone scoring or full-duplex voice conversation.

### Required Vercel environment variable

Set `OPENAI_API_KEY` to a newly created API key in Vercel Project Settings → Environment Variables, then redeploy. Do not put the key in source code or send it in chat. The Realtime voice feature requires API account access and billing for the selected Realtime model. `OPENAI_REALTIME_MODEL` is optional; it defaults to `gpt-realtime-2.1-mini`.

The site tells learners that the voice is AI-generated. If the Realtime service is unavailable or the key is missing, the site displays an error rather than silently switching to the old robotic browser voice.
