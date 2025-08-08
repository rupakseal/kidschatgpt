
import Link from "next/link";

export default function Home() {
  return (
    <div className="card" style={{display:'grid', gap:16}}>
      <h1>Welcome to kidschatgpt.org</h1>
      <p>Two modes for curious minds:</p>
      <ul>
        <li><b>Learn</b>: Curated Khan Academy units (math, reading, science).</li>
        <li><b>Chat</b>: Kid-friendly AI chat for explanations, creativity, and practice (parent consent required).</li>
      </ul>
      <div className="stack">
        <Link className="button" href="/learn">Start Learning</Link>
        <Link className="button" href="/chat">Start Chatting</Link>
      </div>
      <p className="small">
        Note: Khan Academy is a separate, free resource. We link to their content. See{" "}
        <a href="https://www.khanacademy.org" target="_blank">khanacademy.org</a>.
      </p>
    </div>
  )
}
