import { NextResponse } from 'next/server';
import { store } from '../../store';

export async function DELETE(request, { params }) {
  const { id } = params;
  
  const index = store.apiKeys.findIndex(key => key.id === id);
  
  if (index === -1) {
    return NextResponse.json(
      { error: 'API key not found' },
      { status: 404 }
    );
  }

  store.apiKeys.splice(index, 1);
  
  return NextResponse.json({ success: true });
}

export async function PATCH(request, { params }) {
  const { id } = params;
  const body = await request.json();

  if (!body.name) {
    return NextResponse.json(
      { error: 'Name is required' },
      { status: 400 }
    );
  }

  const index = store.apiKeys.findIndex(key => key.id === id);
  
  if (index === -1) {
    return NextResponse.json(
      { error: 'API key not found' },
      { status: 404 }
    );
  }

  store.apiKeys[index] = {
    ...store.apiKeys[index],
    name: body.name
  };

  return NextResponse.json(store.apiKeys[index]);
} 