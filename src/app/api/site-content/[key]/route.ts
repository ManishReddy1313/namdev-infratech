import { NextResponse } from 'next/server';
import { query, queryOne, execute } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET(
  request: Request,
  { params }: { params: { key: string } }
) {
  try {
    const row = await queryOne(
      'SELECT section_key, content FROM site_content WHERE section_key = $1',
      [params.key]
    );
    if (!row) {
      return NextResponse.json({ error: 'Section not found' }, { status: 404 });
    }
    return NextResponse.json(row.content);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { key: string } }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const content = await request.json();
    await execute(
      'UPDATE site_content SET content = $1, updated_at = NOW() WHERE section_key = $2',
      [JSON.stringify(content), params.key]
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
