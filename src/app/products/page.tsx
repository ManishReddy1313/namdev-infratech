'use client';

import { useState, useEffect } from 'react';
import type { Product } from '@/types';
import ProductCard from '@/components/ui/ProductCard';
import { FadeIn, SlideUp, StaggerContainer } from '@/components/ui/AnimationWrappers';
import { cn } from '@/lib/utils';

const categories = [
  { label: 'All Products', value: 'all' },
  { label: 'Structural Steel', value: 'structural-steel' },
  { label: 'Roofing Solutions', value: 'roofing-solutions' },
  { label: 'Jali Products', value: 'jali-products' },
  { label: 'Exterior Solutions', value: 'exterior-solutions' },
];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const url = activeCategory === 'all' ? '/api/products' : `/api/products?category=${activeCategory}`;
    fetch(url)
      .then(res => res.json())
      .then((data) => { setProducts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [activeCategory]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Steel & Infrastructure Products | Namdev Infratech',
    description: 'Explore our complete range of structural steel, roofing, mesh, and exterior cladding products for construction and industrial projects.',
    url: 'https://namdevinfratech.com/products',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: products.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Product',
          name: product.title,
          description: product.description,
          url: `https://namdevinfratech.com/products/${product.slug}`,
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative bg-steel-900 py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-steel-900 via-primary-900 to-steel-950" />
        <div className="container-custom relative z-10 text-center">
          <FadeIn>
            <span className="inline-block text-sm font-semibold uppercase tracking-wider text-accent-200 mb-4">
              Our Product Range
            </span>
          </FadeIn>
          <SlideUp>
            <h1 className="heading-1 text-white mb-4 font-display">Steel & Infrastructure Products</h1>
          </SlideUp>
          <SlideUp delay={0.2}>
            <p className="text-lg md:text-xl text-primary-300 max-w-2xl mx-auto">
              Durable structural solutions engineered for reliability and precision — from heavy steel sections to architectural finishes.
            </p>
          </SlideUp>
        </div>
      </section>

      <section className="py-6 bg-white border-b border-primary-100 sticky top-0 z-30">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={cn(
                  'px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300',
                  activeCategory === cat.value
                    ? 'bg-steel-900 text-white shadow-lg'
                    : 'bg-white text-primary-700 hover:bg-primary-100 border border-steel-200'
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-primary-50">
        <div className="container-custom">
          {activeCategory !== 'all' && (
            <FadeIn className="mb-8">
              <h2 className="heading-3 text-primary-900 font-display">
                {categories.find(c => c.value === activeCategory)?.label}
              </h2>
              <p className="text-primary-500 mt-2">
                {activeCategory === 'structural-steel' && 'Core steel sections and components for construction frameworks, industrial sheds, and heavy fabrication.'}
                {activeCategory === 'roofing-solutions' && 'Weather-resistant roofing sheets and panels for residential, commercial, and industrial applications.'}
                {activeCategory === 'jali-products' && 'Perforated sheets, mesh products, and laser-cut panels for security, filtration, and decorative applications.'}
                {activeCategory === 'exterior-solutions' && 'Premium cladding and facade materials for modern building exteriors.'}
              </p>
            </FadeIn>
          )}

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <SlideUp key={product.id}>
                <ProductCard product={product} />
              </SlideUp>
            ))}
          </StaggerContainer>

          {loading && (
            <div className="flex justify-center py-16">
              <div className="w-8 h-8 border-4 border-steel-900 border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {!loading && products.length === 0 && (
            <FadeIn className="text-center py-16">
              <p className="text-primary-500 text-lg">No products found in this category.</p>
            </FadeIn>
          )}
        </div>
      </section>

      <section className="py-16 md:py-20 bg-steel-900">
        <div className="container-custom text-center">
          <FadeIn>
            <h2 className="heading-2 text-white font-display mb-4">Need a Custom Quote?</h2>
            <p className="text-primary-300 max-w-2xl mx-auto mb-8">
              Every project is unique. Share your requirements and our team will provide a detailed quotation with the best pricing.
            </p>
            <a href="/contact" className="btn-primary inline-flex">
              Get a Free Quote
            </a>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
