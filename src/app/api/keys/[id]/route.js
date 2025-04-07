import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';

export async function DELETE(request, { params }) {
  try {
    const id = params.id;
    
    // Use the service role client instead of the regular client
    const supabase = createServiceClient();
    
    const { error } = await supabase
      .from('api_keys')
      .delete()
      .eq('id', id);
      
    if (error) {
      console.error('Error deleting API key:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in DELETE /api/keys/[id]:', error);
    return NextResponse.json({ error: 'Failed to delete API key' }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    const id = params.id;
    const body = await request.json();
    const { name } = body;
    
    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    
    // Use the service role client instead of the regular client
    const supabase = createServiceClient();
    
    const { data, error } = await supabase
      .from('api_keys')
      .update({ name })
      .eq('id', id)
      .select()
      .single();
      
    if (error) {
      console.error('Error updating API key:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in PATCH /api/keys/[id]:', error);
    return NextResponse.json({ error: 'Failed to update API key' }, { status: 500 });
  }
} 