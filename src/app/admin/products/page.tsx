'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Pencil, Trash2, Loader2, Star, GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Product } from '@/types';

const categories = ['All', 'Structural Steel', 'Roofing Solutions', 'Jali Products', 'Exterior Solutions'];

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    setDeleting(id);
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      setProducts(products.filter(p => p.id !== id));
    } catch {
    } finally {
      setDeleting(null);
    }
  };

  const filtered = filter === 'All' ? products : products.filter(p => p.category === filter);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-steel-500" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary-900 font-display">Products</h1>
          <p className="text-sm text-steel-600">{products.length} products in catalog</p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 bg-steel-900 text-white px-4 py-2.5 rounded-pill text-sm font-medium hover:bg-steel-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Link>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={cn(
              'px-3 py-1.5 rounded-pill text-sm font-medium transition-colors',
              filter === cat
                ? 'bg-steel-900 text-white'
                : 'bg-white text-steel-700 border border-steel-200 hover:bg-steel-50'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-steel-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-steel-50 border-b border-steel-200">
                <th className="text-left px-4 py-3 text-xs font-semibold text-steel-600 uppercase tracking-wider">Product</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-steel-600 uppercase tracking-wider">Category</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-steel-600 uppercase tracking-wider">Featured</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-steel-600 uppercase tracking-wider">Order</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-steel-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(product => (
                <tr key={product.id} className="border-b border-steel-100 hover:bg-steel-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-primary-900">{product.title}</p>
                      <p className="text-xs text-steel-500 mt-0.5 line-clamp-1">{product.description}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-block px-2 py-1 bg-accent-100 text-steel-700 rounded text-xs font-medium">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {product.featured && <Star className="w-4 h-4 text-yellow-500 mx-auto fill-yellow-500" />}
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-steel-600">{product.sort_order}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/products/edit/${product.id}`}
                        className="p-2 text-steel-600 hover:text-steel-900 hover:bg-steel-100 rounded-lg transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id)}
                        disabled={deleting === product.id}
                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                      >
                        {deleting === product.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-steel-500 text-sm">
                    No products found in this category.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
