import { NextResponse } from 'next/server';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Launch reminder sign-ups. For now they only go to Vercel logs (search "[store] waitlist").
export async function POST(req: Request) {
  let body: { email?: string; product?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'bad_json' }, { status: 400 });
  }
  const email = (body.email ?? '').trim();
  if (!EMAIL.test(email)) return NextResponse.json({ error: 'invalid_email' }, { status: 400 });
  console.log('[store] waitlist', body.product ?? '-', email);
  return NextResponse.json({ ok: true });
}
