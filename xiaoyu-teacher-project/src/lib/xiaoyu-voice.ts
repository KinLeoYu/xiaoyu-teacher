export type VoiceState = "idle" | "speaking";

/** Plays text through Xiaoyu's server-connected Realtime voice. The API key never reaches the browser. */
export async function speakWithXiaoyu(text: string, onState?: (state: VoiceState) => void): Promise<void> {
  const cleanText = text.trim().slice(0, 3500);
  if (!cleanText) return;

  const pc = new RTCPeerConnection();
  const channel = pc.createDataChannel("xiaoyu-events");
  const audio = new Audio();
  audio.autoplay = true;
  audio.playsInline = true;
  let finished = false;
  let resolveDone: (() => void) | undefined;
  let rejectDone: ((reason?: unknown) => void) | undefined;
  const done = new Promise<void>((resolve, reject) => { resolveDone = resolve; rejectDone = reject; });
  const finish = () => {
    if (finished) return;
    finished = true;
    onState?.("idle");
    audio.pause();
    audio.srcObject = null;
    pc.close();
  };

  pc.ontrack = async (event) => {
    audio.srcObject = event.streams[0];
    try { await audio.play(); } catch { rejectDone?.(new Error("浏览器阻止了语音播放，请再次点击朗读按钮。")); }
  };
  pc.onconnectionstatechange = () => {
    if (pc.connectionState === "failed") rejectDone?.(new Error("语音连接失败，请检查网络后重试。"));
  };
  pc.addTransceiver("audio", { direction: "recvonly" });

  channel.onopen = () => {
    onState?.("speaking");
    channel.send(JSON.stringify({
      type: "conversation.item.create",
      item: { type: "message", role: "user", content: [{ type: "input_text", text: cleanText }] },
    }));
    channel.send(JSON.stringify({ type: "response.create", response: { output_modalities: ["audio"] } }));
  };
  channel.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      if (data.type === "response.done") resolveDone?.();
      if (data.type === "error") rejectDone?.(new Error(data.error?.message || "语音生成失败。"));
    } catch { /* ignore non-JSON events */ }
  };

  try {
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    if (pc.iceGatheringState !== "complete") {
      await new Promise<void>((resolve) => {
        const check = () => { if (pc.iceGatheringState === "complete") { pc.removeEventListener("icegatheringstatechange", check); resolve(); } };
        pc.addEventListener("icegatheringstatechange", check);
        check();
      });
    }
    const response = await fetch("/api/realtime/speech", {
      method: "POST",
      headers: { "Content-Type": "application/sdp" },
      body: offer.sdp || "",
    });
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.error || "自然语音服务暂时不可用。");
    }
    await pc.setRemoteDescription({ type: "answer", sdp: await response.text() });
    await done;
    // Let the final audio frames finish before tearing down the peer connection.
    await new Promise((resolve) => setTimeout(resolve, 350));
  } finally {
    finish();
  }
}
