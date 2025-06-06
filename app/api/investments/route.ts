import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const result = await pool.query(
      'SELECT * FROM investments WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching investments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch investments' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const { name, shares, purchasePrice } = await request.json();

    const result = await pool.query(
      `INSERT INTO investments 
       (user_id, name, shares, purchase_price, current_price, total_value, profit_loss, profit_loss_percentage) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       RETURNING *`,
      [
        userId,
        name,
        shares,
        purchasePrice,
        purchasePrice, // Initially, current price is same as purchase price
        shares * purchasePrice, // Total value
        0, // Initial profit/loss is 0
        0, // Initial profit/loss percentage is 0
      ]
    );

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error adding investment:', error);
    return NextResponse.json(
      { error: 'Failed to add investment' },
      { status: 500 }
    );
  }
} 