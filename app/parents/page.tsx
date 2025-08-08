
export const metadata = { title: "Parents · kidschatgpt.org" };

export default function Parents() {
  return (
    <div className="card" style={{display:'grid', gap:12}}>
      <h1>For Parents</h1>
      <p><b>Goal:</b> Safe curiosity. Kids get structured learning via Khan Academy plus a supervised AI chat.</p>
      <ul>
        <li><b>Parental Consent:</b> Required to enable chat for children under 13.</li>
        <li><b>Data:</b> We avoid collecting personal info. Chat messages may contain personal info; you can delete them on request.</li>
        <li><b>Boundaries:</b> The chat avoids adult/unsafe topics and will nudge kids back to age-appropriate learning.</li>
        <li><b>Tips:</b> Sit with your child, set a timer, and decide together what they’ll learn or ask.</li>
      </ul>
      <p className="small">See our <a href="/privacy">Privacy</a> page for details.</p>
    </div>
  )
}
