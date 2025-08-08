
# kidschatgpt.org (MVP)

Two modes for curious minds:
- **Learn** — curated links to **Khan Academy** units.
- **Chat** — a kid-friendly AI chat (parental consent gate, minimal guardrails).

Built with **Next.js (App Router, TypeScript)** and the **OpenAI API**.

---

## Quickstart

```bash
npm i
cp .env.local.example .env.local  # put your OPENAI_API_KEY
npm run dev
# open http://localhost:3000
```

> Deploy free on Vercel: https://vercel.com/new

### Required env
- `OPENAI_API_KEY` — from https://platform.openai.com/api-keys
- Optional: `OPENAI_MODEL=gpt-4o-mini`
- Optional: set a client cap with `NEXT_PUBLIC_CHAT_MAX_MESSAGES_PER_DAY=50`

---

## Pages

- `/` — home
- `/learn` — links to Khan Academy topics (non-commercial use, attribution)
- `/chat` — chat UI behind a simple parent consent gate (local-only PIN)
- `/parents` — overview for families
- `/privacy` — privacy summary
- `/api/chat` — server route that calls OpenAI (with a kid-safe system prompt)

---

## Safety (MVP)
- **Parent gate**: a browser-local PIN to enable the chat UI
- **Light server filter**: regex blocks some unsafe topics (expand as needed)
- **Daily cap**: optional client-side message limit
- **Headers**: basic hardening (X-Frame-Options, etc.) in `next.config.ts`

**NOTE:** This is a starting point. For real production with kids:
- Add stronger moderation & incident logging on the server.
- Implement verifiable parental consent if collecting personal info from under-13s.
- Provide parental review/deletion of chat logs.

Resources:
- FTC COPPA 6-step guide: https://www.ftc.gov/business-guidance/resources/childrens-online-privacy-protection-rule-six-step-compliance-plan-your-business
- OpenAI safety best practices: https://platform.openai.com/docs/guides/safety-best-practices
- Khan Academy trademark/usage guidance: https://support.khanacademy.org/hc/en-us/articles/202263034, and general policy: https://support.khanacademy.org/hc/en-us/articles/202262954
- Vercel custom domains: https://vercel.com/docs/domains/working-with-domains/add-a-domain
- GoDaddy DNS edit (CNAME/A): https://www.godaddy.com/help/manage-dns-records-680

---

## DNS (GoDaddy → Vercel)

1. Deploy to Vercel and add domain `kidschatgpt.org` in your project.
2. In GoDaddy DNS, set:
   - `A` (apex `@`) to the Vercel A records **or** ALIAS/ANAME if supported.
   - `CNAME` for `www` → `cname.vercel-dns.com` (or the target Vercel shows).
3. Wait for propagation, then enable HTTPS in Vercel (automatic).

Docs: https://vercel.com/docs/domains/working-with-domains/add-a-domain

---

## Project Structure

```
app/
  api/chat/route.ts       # server -> OpenAI (kid-safe prompt + basic filter)
  learn/page.tsx          # Khan Academy links (attribution)
  chat/page.tsx           # chat UI (ConsentGate + ChatBox)
  parents/page.tsx
  privacy/page.tsx
  robots.txt/route.ts
  layout.tsx, page.tsx, globals.css
components/
  ConsentGate.tsx
  ChatBox.tsx
```

---

## License

This starter is MIT-licensed. **Khan Academy content is separate** and governed by their policies.
We do not claim endorsement or affiliation.
