import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');

    let sql = 'SELECT * FROM products';
    const conditions: string[] = [];
    const params: any[] = [];
    let paramIdx = 1;

    if (category && category !== 'all') {
      conditions.push(`category = $${paramIdx}`);
      params.push(category);
      paramIdx++;
    }
    if (featured === 'true') {
      conditions.push('featured = true');
    }

    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }
    sql += ' ORDER BY sort_order ASC, created_at DESC';

    const products = await query(sql, params);
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getSession();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const product = await queryOne(
      `INSERT INTO products (title, slug, description, category, image, features, use_cases, variants, faqs, featured, sort_order, seo_title, seo_description)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`,
      [body.title, body.slug, body.description, body.category, body.image || null,
       body.features || [], body.use_cases || [], JSON.stringify(body.variants || []),
       JSON.stringify(body.faqs || []), body.featured || false, body.sort_order || 0,
       body.seo_title || null, body.seo_description || null]
    );

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
