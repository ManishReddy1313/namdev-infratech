import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    let sql = 'SELECT * FROM projects ORDER BY created_at DESC';
    const params: any[] = [];

    if (category && category !== 'all') {
      sql = 'SELECT * FROM projects WHERE category = $1 ORDER BY created_at DESC';
      params.push(category);
    }

    const projects = await query(sql, params);
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getSession();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const project = await queryOne(
      `INSERT INTO projects (title, slug, description, category, gallery, materials, client_type, featured, seo_title, seo_description)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [body.title, body.slug, body.description, body.category, body.gallery || [], body.materials || [], body.client_type || '', body.featured || false, body.seo_title, body.seo_description]
    );

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
