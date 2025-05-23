import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { current_price } = await request.json();
    const investmentId = parseInt(params.id);

    // First get the investment to calculate new values
    const investmentResult = await pool.query(
      'SELECT * FROM investments WHERE id = $1',
      [investmentId]
    );

    if (investmentResult.rows.length === 0) {
      return NextResponse.json(
        { error: 'Investment not found' },
        { status: 404 }
      );
    }

    const investment = investmentResult.rows[0];
    const total_value = investment.shares * current_price;
    const profit_loss = total_value - (investment.shares * investment.purchase_price);
    const profit_loss_percentage = ((current_price - investment.purchase_price) / investment.purchase_price) * 100;

    // Update the investment with new values
    const result = await pool.query(
      `UPDATE investments 
       SET current_price = $1,
           total_value = $2,
           profit_loss = $3,
           profit_loss_percentage = $4,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $5
       RETURNING *`,
      [
        current_price,
        total_value,
        profit_loss,
        profit_loss_percentage,
        investmentId
      ]
    );

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating investment:', error);
    return NextResponse.json(
      { error: 'Failed to update investment' },
      { status: 500 }
    );
  }
} 