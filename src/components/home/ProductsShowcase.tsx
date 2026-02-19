'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Product } from '@/types';
import SectionHeader from '@/components/ui/SectionHeader';
import ProductCard from '@/components/ui/ProductCard';
import { StaggerContainer, SlideUp } from '@/components/ui/AnimationWrappers';

const categoryLabels: Record<string, string> = {
  'structural-steel': 'Structural Steel',
  'roofing-solutions': 'Roofing Solutions',
  'jali-products': 'Jali Products',
  'exterior-solutions': 'Exterior Solutions',
};

export default function ProductsShowcase() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products?featured=true')
      .then(res => res.json())
      .then((data: Product[]) => setProducts(data.slice(0, 6)))
      .catch(() => {});
  }, []);

  if (products.length === 0) return null;

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Our Products"
          title="Built for Strength, Engineered for Quality"
          subtitle="From structural steel to architectural finishes — explore our complete range of construction and infrastructure materials."
        />

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {Object.entries(categoryLabels).map(([value, label]) => (
            <Link
              key={value}
              href={`/products?category=${value}`}
              className="px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider border border-steel-200 text-steel-900 hover:bg-steel-900 hover:text-white transition-all duration-300"
            >
              {label}
            </Link>
          ))}
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <SlideUp key={product.id}>
              <ProductCard product={product} />
            </SlideUp>
          ))}
        </StaggerContainer>

        <div className="text-center mt-12">
          <Link
            href="/products"
            className="btn-primary inline-flex items-center gap-2"
          >
            View All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
