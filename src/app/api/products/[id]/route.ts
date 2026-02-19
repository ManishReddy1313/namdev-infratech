import { NextRequest, NextResponse } from 'next/server';
import { queryOne, execute } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const product = await queryOne('SELECT * FROM products WHERE id = $1', [id]);
    if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getSession();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const body = await request.json();
    const product = await queryOne(
      `UPDATE products SET title=$1, slug=$2, description=$3, category=$4, image=$5, features=$6, use_cases=$7, variants=$8, faqs=$9, featured=$10, sort_order=$11, seo_title=$12, seo_description=$13, updated_at=NOW()
       WHERE id=$14 RETURNING *`,
      [body.title, body.slug, body.description, body.category, body.image || null,
       body.features || [], body.use_cases || [], JSON.stringify(body.variants || []),
       JSON.stringify(body.faqs || []), body.featured || false, body.sort_order || 0,
       body.seo_title || null, body.seo_description || null, id]
    );

    if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getSession();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const count = await execute('DELETE FROM products WHERE id = $1', [id]);
    if (count === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
