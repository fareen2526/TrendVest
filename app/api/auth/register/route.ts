import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import pool from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { firstName, email, password } = await request.json();

    // Validate input
    if (!firstName || !email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create user
    const result = await pool.query(
      'INSERT INTO users (first_name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, first_name, email',
      [firstName, email, passwordHash]
    );

    const user = result.rows[0];

    return NextResponse.json(
      { 
        message: 'Registration successful',
        user
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 