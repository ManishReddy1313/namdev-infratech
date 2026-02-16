import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const publishedOnly = searchParams.get('published') === 'true';

    let sql = 'SELECT * FROM blogs';
    const conditions: string[] = [];
    const params: any[] = [];
    let paramIdx = 1;

    if (publishedOnly) {
      conditions.push(`published = true`);
    }
    if (category && category !== 'all') {
      conditions.push(`category = $${paramIdx}`);
      params.push(category);
      paramIdx++;
    }

    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }
    sql += ' ORDER BY created_at DESC';

    const blogs = await query(sql, params);
    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getSession();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const blog = await queryOne(
      `INSERT INTO blogs (title, slug, content, category, featured_image, published, seo_title, seo_description)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [body.title, body.slug, body.content, body.category, body.featured_image, body.published || false, body.seo_title, body.seo_description]
    );

    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
  }
}
