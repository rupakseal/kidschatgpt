
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const SYSTEM_PROMPT = `You are a kid-friendly tutor. Speak warmly and simply.
Stay age-appropriate. Avoid adult themes, hateful or violent content.
If a question is unsafe or too advanced, explain why and suggest a safer topic.
Prefer step-by-step explanations, examples, and small quizzes.
Never ask for full names, addresses, or contact info.`;

const MAX_TOKENS = 500;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.OPENAI_API_KEY;
    const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

    if (!apiKey) {
      return NextResponse.json({ error: "Server not configured: missing OPENAI_API_KEY" }, { status: 500 });
    }

    if (!Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid body: messages[]" }, { status: 400 });
    }

    const openai = new OpenAI({ apiKey });

    // Basic content guard: blunt keywords (server-side). You can expand this list.
    const banned = [/suicide|self-harm|sex|porn|drugs|address|phone|contact/gi];
    const userJoined = messages.map((m:any) => (m.role === "user" ? m.content : "")).join(" ");
    for (const r of banned) {
      if (r.test(userJoined)) {
        return NextResponse.json({
          choices: [{ message: { role: "assistant", content: "Let’s switch to a safe topic. How about math puzzles or a science fact?" } }]
        }, { status: 200 });
      }
    }

    const resp = await openai.chat.completions.create({
      model,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.slice(-12) // last 12 turns
      ],
      max_tokens: MAX_TOKENS,
      temperature: 0.6
    });

    const choice = resp.choices?.[0]?.message;
    return NextResponse.json({ choices: [{ message: choice }] }, { status: 200 });
  } catch (err:any) {
    console.error(err);
    return NextResponse.json({ error: "Chat failed" }, { status: 500 });
  }
}
