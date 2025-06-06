import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('session_token');

    if (!sessionToken) {
      return NextResponse.json({ isLoggedIn: false });
    }

    // TODO: Validate session token with your session management system
    // For now, we'll just check if the token exists
    return NextResponse.json({ isLoggedIn: true });
  } catch (error) {
    console.error('Error checking auth status:', error);
    return NextResponse.json(
      { error: 'Failed to check authentication status' },
      { status: 500 }
    );
  }
} 