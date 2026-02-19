'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import type { Product } from '@/types';
import ProductCard from '@/components/ui/ProductCard';
import { FadeIn, SlideUp, SlideIn } from '@/components/ui/AnimationWrappers';
import { cn } from '@/lib/utils';
import { ArrowLeft, CheckCircle2, Wrench, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';

const categoryLabels: Record<string, string> = {
  'structural-steel': 'Structural Steel',
  'roofing-solutions': 'Roofing Solutions',
  'jali-products': 'Jali Products',
  'exterior-solutions': 'Exterior Solutions',
};

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/by-slug/${slug}`);
        if (!res.ok) { setLoading(false); return; }
        const productData = await res.json();
        setProduct(productData);
        const relRes = await fetch(`/api/products?category=${productData.category}`);
        const allProducts = await relRes.json();
        setRelatedProducts(allProducts.filter((p: Product) => p.id !== productData.id).slice(0, 3));
      } catch {}
      setLoading(false);
    }
    loadData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-steel-900 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="heading-2 text-primary-900 mb-4 font-display">Product Not Found</h1>
          <p className="text-body mb-8">The product you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/products" className="btn-primary">Back to Products</Link>
        </div>
      </div>
    );
  }

  const faqs = Array.isArray(product.faqs) ? product.faqs : [];
  const variants = Array.isArray(product.variants) ? product.variants : [];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    url: `https://namdevinfratech.com/products/${product.slug}`,
    brand: { '@type': 'Brand', name: 'Namdev Infratech' },
    category: categoryLabels[product.category] || product.category,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative bg-steel-900 py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-steel-900 via-primary-900 to-steel-950" />
        <div className="container-custom relative z-10">
          <FadeIn>
            <Link href="/products" className="inline-flex items-center gap-2 text-primary-300 hover:text-white transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" /> Back to Products
            </Link>
          </FadeIn>
          <SlideUp>
            <span className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full bg-accent-200 text-steel-900 mb-4">
              {categoryLabels[product.category] || product.category}
            </span>
          </SlideUp>
          <SlideUp delay={0.1}>
            <h1 className="heading-1 text-white mb-4 font-display">{product.title}</h1>
          </SlideUp>
          <SlideUp delay={0.2}>
            <p className="text-lg text-primary-300 max-w-3xl">{product.description}</p>
          </SlideUp>
          <SlideUp delay={0.3}>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/contact" className="btn-primary">Get a Quote</Link>
              <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white font-semibold rounded-full hover:bg-[#20BD5A] transition-all">
                <MessageCircle className="w-4 h-4" /> WhatsApp Us
              </a>
            </div>
          </SlideUp>
        </div>
      </section>

      {product.features && product.features.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <FadeIn>
              <h2 className="heading-3 text-primary-900 font-display mb-8">Key Features</h2>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.features.map((feature, idx) => (
                <SlideUp key={idx} delay={idx * 0.05}>
                  <div className="flex items-start gap-4 p-5 bg-primary-50 rounded-xl">
                    <CheckCircle2 className="w-6 h-6 text-steel-900 flex-shrink-0 mt-0.5" />
                    <p className="text-primary-700 font-medium">{feature}</p>
                  </div>
                </SlideUp>
              ))}
            </div>
          </div>
        </section>
      )}

      {product.use_cases && product.use_cases.length > 0 && (
        <section className="section-padding bg-primary-50">
          <div className="container-custom">
            <FadeIn>
              <h2 className="heading-3 text-primary-900 font-display mb-8">Applications & Use Cases</h2>
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {product.use_cases.map((useCase, idx) => (
                <SlideUp key={idx} delay={idx * 0.05}>
                  <div className="flex items-start gap-3 p-5 bg-white rounded-xl shadow-sm">
                    <Wrench className="w-5 h-5 text-steel-900 flex-shrink-0 mt-0.5" />
                    <p className="text-primary-700 font-medium text-sm">{useCase}</p>
                  </div>
                </SlideUp>
              ))}
            </div>
          </div>
        </section>
      )}

      {faqs.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-custom max-w-3xl">
            <FadeIn>
              <h2 className="heading-3 text-primary-900 font-display mb-8 text-center">Frequently Asked Questions</h2>
            </FadeIn>
            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <SlideUp key={idx} delay={idx * 0.05}>
                  <div className="border border-primary-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full flex items-center justify-between p-5 text-left hover:bg-primary-50 transition-colors"
                    >
                      <span className="font-semibold text-primary-900 pr-4">{faq.question}</span>
                      {openFaq === idx ? <ChevronUp className="w-5 h-5 text-steel-900 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-steel-900 flex-shrink-0" />}
                    </button>
                    {openFaq === idx && (
                      <div className="px-5 pb-5 text-primary-600 leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                </SlideUp>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 md:py-20 bg-steel-900">
        <div className="container-custom text-center">
          <FadeIn>
            <h2 className="heading-2 text-white font-display mb-4">Interested in {product.title}?</h2>
            <p className="text-primary-300 max-w-2xl mx-auto mb-8">
              Get in touch with our team for pricing, specifications, and bulk order details.
            </p>
            <Link href={`/contact?product=${encodeURIComponent(product.title)}`} className="btn-primary inline-flex">
              Request a Quote
            </Link>
          </FadeIn>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="section-padding bg-primary-50">
          <div className="container-custom">
            <FadeIn className="text-center mb-12">
              <h2 className="heading-2 text-primary-900 font-display">Related Products</h2>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((p) => (
                <SlideUp key={p.id}>
                  <ProductCard product={p} />
                </SlideUp>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
