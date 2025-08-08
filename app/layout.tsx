
import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Kids ChatGPT",
  description: "Khan Academy time for learning. ChatGPT time for fun & curiosity.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="container" style={{paddingBottom:0}}>
          <div className="stack" style={{alignItems:'center', justifyContent:'space-between'}}>
            <Link href="/" style={{fontWeight:800, fontSize:22}}>kidschatgpt.org</Link>
            <nav className="stack">
              <Link href="/learn">Learn</Link>
              <Link href="/chat">Chat</Link>
              <Link href="/parents">Parents</Link>
              <Link href="/privacy">Privacy</Link>
            </nav>
          </div>
          <hr/>
        </header>
        <main className="container">{children}</main>
        <footer className="container small">
          © {new Date().getFullYear()} kidschatgpt.org · Built with Next.js · Stay curious, stay kind.
        </footer>
      </body>
    </html>
  );
}
