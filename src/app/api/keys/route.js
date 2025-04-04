import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { store } from '../store';

export async function GET() {
  return NextResponse.json(store.apiKeys);
}

export async function POST(request) {
  const body = await request.json();
  
  if (!body.name) {
    return NextResponse.json(
      { error: 'Name is required' },
      { status: 400 }
    );
  }

  const newKey = {
    id: crypto.randomUUID(),
    name: body.name,
    key: `mk_${crypto.randomBytes(24).toString('hex')}`,
    created: new Date().toISOString(),
  };

  store.apiKeys.push(newKey);

  return NextResponse.json(newKey, { status: 201 });
} 