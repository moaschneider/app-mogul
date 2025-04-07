import crypto from 'crypto';
import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';

export async function GET() {
  try {
    // Use the service role client instead of the regular client
    const supabase = createServiceClient();
    
    const { data, error } = await supabase
      .from('api_keys')
      .select('*');
      
    if (error) {
      console.error('Error fetching API keys:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Error in GET /api/keys:', error);
    return NextResponse.json({ error: 'Failed to fetch API keys' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name } = body;
    
    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    
    // Generate a new API key with "mog-" prefix
    const randomKey = crypto.randomBytes(32).toString('hex');
    const apiKey = `mog-${randomKey}`;
    
    // Use the service role client instead of the regular client
    const supabase = createServiceClient();
    
    const { data, error } = await supabase
      .from('api_keys')
      .insert({ name, key: apiKey })
      .select()
      .single();
      
    if (error) {
      console.error('Error creating API key:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    if (!data) {
      throw new Error('No data returned from insert operation');
    }
    
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/keys:', error);
    return NextResponse.json({ error: 'Failed to create API key' }, { status: 500 });
  }
} 