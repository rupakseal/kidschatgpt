
"use client";
import { useEffect, useMemo, useRef, useState } from "react";

type Msg = { role: "user"|"assistant"; content: string };

export default function ChatBox() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant" as const, content: "Hi! I’m your friendly study buddy. What would you like to learn today?" }
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const dayKey = useMemo(() => {
    const d = new Date();
    return `chatCount-${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
  }, []);

  useEffect(() => {
    listRef.current?.scrollTo(0, listRef.current.scrollHeight);
  }, [messages, busy]);

  async function send() {
    const dailyCap = Number(process.env.NEXT_PUBLIC_CHAT_MAX_MESSAGES_PER_DAY || "0") || 0;
    if (dailyCap > 0) {
      const used = Number(localStorage.getItem(dayKey) || "0");
      if (used >= dailyCap) {
        alert("Daily chat limit reached. Try again tomorrow or ask a parent for help!");
        return;
      }
    }

    if (!input.trim()) return;
    const newMsgs: Msg[] = [...messages, { role: "user" as const, content: input.trim() }];
    setMessages(newMsgs);
    setInput("");
    setBusy(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMsgs })
      });
      const data = await res.json();
      const content = data?.choices?.[0]?.message?.content || "Hmm, I had trouble replying. Can we try again?";
      setMessages((m) => [...m, { role: "assistant" as const, content }]);
      // increment cap
      const used = Number(localStorage.getItem(dayKey) || "0");
      localStorage.setItem(dayKey, String(used + 1));
    } catch (e) {
      setMessages(m => [...m, { role: "assistant", content: "Network hiccup. Please try again." }]);
    } finally {
      setBusy(false);
    }
  }

  function onKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") send();
  }

  return (
    <div className="card" style={{display:'grid', gap:12}}>
      <div ref={listRef} style={{maxHeight: 420, overflowY: "auto", padding: 8, background:"rgba(255,255,255,0.02)", borderRadius:12, border:"1px solid rgba(255,255,255,0.08)"}}>
        {messages.map((m, i) => (
          <div key={i} style={{marginBottom:12}}>
            <div className="small" style={{opacity:.8}}>{m.role === "user" ? "You" : "Tutor"}</div>
            <div>{m.content}</div>
          </div>
        ))}
        {busy && <div className="small">Typing…</div>}
      </div>
      <div className="stack" style={{alignItems:'center'}}>
        <input
          className="input"
          placeholder="Ask about fractions, planets, grammar…"
          value={input}
          onChange={e=>setInput(e.target.value)}
          onKeyDown={onKey}
        />
        <button className="button" onClick={send} disabled={busy}>{busy ? "..." : "Send"}</button>
      </div>
      <p className="small">Tip: Try <kbd>“Explain fractions like I’m 8.”</kbd></p>
    </div>
  )
}
