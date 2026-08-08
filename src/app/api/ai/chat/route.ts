import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message, userContext } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const reply = `I'm your Quest AI Mentor! Regarding "${message}", remember that in computer science and security, understanding the fundamental state transitions is key. Keep pushing forward on your roadmap!`;

    return NextResponse.json({
      reply,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'AI Mentor error' }, { status: 500 });
  }
}
