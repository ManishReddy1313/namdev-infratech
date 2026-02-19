import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { setupKey } = await request.json();
    
    if (setupKey !== process.env.SESSION_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const existing = await pool.query('SELECT id FROM admin_users WHERE username = $1', ['admin']);
    if (existing.rows.length > 0) {
      return NextResponse.json({ message: 'Admin user already exists' });
    }

    const passwordHash = await bcrypt.hash('admin123', 10);
    await pool.query(
      `INSERT INTO admin_users (id, username, email, password_hash, role, created_at)
       VALUES (gen_random_uuid(), $1, $2, $3, $4, NOW())`,
      ['admin', 'admin@namdevinfratech.com', passwordHash, 'super_admin']
    );

    return NextResponse.json({ message: 'Admin user created successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
