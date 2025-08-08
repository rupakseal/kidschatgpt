
"use client";
import { useEffect, useState } from "react";

export default function ConsentGate({ children }: { children: React.ReactNode }) {
  const [consented, setConsented] = useState(false);
  const [pin, setPin] = useState("");

  useEffect(() => {
    const v = localStorage.getItem("parentConsent");
    if (v === "yes") setConsented(true);
  }, []);

  function approve() {
    if (pin.trim().length >= 4) {
      localStorage.setItem("parentConsent", "yes");
      setConsented(true);
    } else {
      alert("Please enter a 4+ digit parent PIN to enable chat.");
    }
  }

  if (consented) return <>{children}</>;

  return (
    <div className="card" style={{display:'grid', gap:12}}>
      <h2>Parent Consent Required</h2>
      <p>To enable chat, a parent/guardian must approve.</p>
      <label className="label">Set a Parent PIN (4+ digits)</label>
      <input className="input" type="password" value={pin} onChange={e=>setPin(e.target.value)} placeholder="Enter PIN"/>
      <button className="button" onClick={approve}>I am a parent — Enable Chat</button>
      <p className="small">We do not store this PIN on our servers; it's saved in your browser as a local preference.</p>
    </div>
  )
}
