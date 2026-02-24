import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const rows = await query('SELECT section_key, content FROM site_content ORDER BY section_key');
    const result: Record<string, any> = {};
    for (const row of rows) {
      result[row.section_key] = row.content;
    }
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
