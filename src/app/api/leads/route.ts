import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne, execute } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getSession();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const leads = await query('SELECT * FROM leads ORDER BY created_at DESC');
    return NextResponse.json(leads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.name || !body.phone || !body.email || !body.message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const lead = await queryOne(
      `INSERT INTO leads (name, phone, email, message, status) VALUES ($1, $2, $3, $4, 'new') RETURNING *`,
      [body.name, body.phone, body.email, body.message]
    );

    return NextResponse.json(lead, { status: 201 });
  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 });
  }
}
