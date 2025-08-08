
import { NextResponse } from "next/server";

export function GET() {
  const body = `User-agent: *\nAllow: /`;
  return new NextResponse(body, { status: 200, headers: { "Content-Type": "text/plain" } });
}
