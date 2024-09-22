import { NextResponse } from 'next/server';

// Export a GET method handler
export async function GET() {
  return NextResponse.json({ message: 'Hello' });
}
