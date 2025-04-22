import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');
    const showToast = searchParams.get('showToast') !== 'false'; // Default to true if not specified
    
    console.log('API validate-key called:', { key: key?.substring(0, 4) + '***', showToast });
    
    if (!key) {
      return NextResponse.json({ 
        valid: false, 
        error: 'API Key não fornecida',
        showToast
      }, { status: 400 });
    }
    
    // Use the service role client to bypass RLS
    const supabase = createServiceClient();
    
    // Check if the key exists in the database
    const { data, error } = await supabase
      .from('api_keys')
      .select('*')
      .eq('key', key)
      .single();
      
    if (error) {
      console.error('Error validating API key:', error);
      
      // Specific handling for "not found" error
      if (error.code === 'PGRST116') {
        return NextResponse.json({ 
          valid: false, 
          error: 'API Key inválida ou não encontrada',
          showToast
        });
      }
      
      return NextResponse.json({ 
        valid: false, 
        error: error.message,
        showToast
      }, { status: 500 });
    }
    
    if (!data) {
      return NextResponse.json({ 
        valid: false, 
        error: 'API Key inválida ou não encontrada',
        showToast
      });
    }
    
    // Update usage count
    await supabase
      .from('api_keys')
      .update({ usage: (data.usage || 0) + 1 })
      .eq('id', data.id);

    console.log('API validate-key success response:', { valid: true, showToast });
    
    return NextResponse.json({ 
      valid: true,
      name: data.name,
      type: data.type,
      usage: (data.usage || 0) + 1, // Incrementing the usage count for the response
      lastUsed: new Date().toISOString(),
      showToast
    });
  } catch (error) {
    console.error('Error in validate-key API:', error);
    return NextResponse.json({ 
      valid: false, 
      error: 'Erro ao validar API Key',
      showToast: searchParams.get('showToast') !== 'false'
    }, { status: 500 });
  }
} 