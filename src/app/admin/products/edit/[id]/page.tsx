'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import ProductForm from '@/components/admin/ProductForm';
import type { Product } from '@/types';

export default function EditProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${params.id}`);
        if (!res.ok) {
          setError('Product not found');
          return;
        }
        const data = await res.json();
        setProduct(data);
      } catch {
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-steel-500" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500 text-lg">{error || 'Product not found'}</p>
      </div>
    );
  }

  return <ProductForm product={product} />;
}
