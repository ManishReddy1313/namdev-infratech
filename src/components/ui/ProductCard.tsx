'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Product } from '@/types';
import { cn } from '@/lib/utils';

const categoryLabels: Record<string, string> = {
  'structural-steel': 'Structural Steel',
  'roofing-solutions': 'Roofing Solutions',
  'jali-products': 'Jali Products',
  'exterior-solutions': 'Exterior Solutions',
};

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={cn('group rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow duration-300', className)}
    >
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-[4/3] overflow-hidden bg-primary-50">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-steel-100 to-primary-100 flex items-center justify-center">
              <span className="text-5xl font-bold text-steel-300 font-display">N</span>
            </div>
          )}
          <div className="absolute top-3 left-3">
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-steel-900 text-white">
              {categoryLabels[product.category] || product.category}
            </span>
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-lg font-semibold font-display text-primary-900 group-hover:text-steel-900 transition-colors duration-300">
            {product.title}
          </h3>
          <p className="mt-2 text-sm text-primary-500 leading-relaxed line-clamp-2">
            {product.description}
          </p>
          <div className="mt-4 flex items-center text-steel-900 text-sm font-semibold">
            View Details
            <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
