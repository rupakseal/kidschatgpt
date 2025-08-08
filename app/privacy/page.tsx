
export const metadata = { title: "Privacy · kidschatgpt.org" };

export default function Privacy() {
  return (
    <div className="card" style={{display:'grid', gap:12}}>
      <h1>Privacy</h1>
      <p>
        We link to Khan Academy (a separate site). For our AI chat:
      </p>
      <ul>
        <li>We require <b>parental consent</b> to enable chat for children under 13 (COPPA guidance).</li>
        <li>We minimize data collection. Chat messages are processed by our AI provider to generate responses.</li>
        <li>Parents may request review or deletion of chat logs.</li>
        <li>We do not sell personal info.</li>
      </ul>
      <p className="small">
        Resources: COPPA overview (FTC), OpenAI policy, Khan Academy policies. This page is informational and not legal advice.
      </p>
    </div>
  )
}
