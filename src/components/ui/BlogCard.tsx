'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Blog } from '@/types';
import { formatDate, truncateText } from '@/lib/utils';

interface BlogCardProps {
  blog: Blog;
  className?: string;
}

export default function BlogCard({ blog, className }: BlogCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`group rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow duration-300 ${className || ''}`}
    >
      <Link href={`/blog/${blog.slug}`}>
        <div className="relative aspect-[16/9] overflow-hidden">
          {blog.featured_image ? (
            <Image
              src={blog.featured_image}
              alt={blog.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              unoptimized
            />
          ) : (
            <div className="w-full h-full bg-primary-100 flex items-center justify-center">
              <span className="text-5xl font-bold text-primary-300">N</span>
            </div>
          )}
          <div className="absolute top-3 left-3">
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-steel-900 text-white">
              {blog.category}
            </span>
          </div>
        </div>
        <div className="p-5">
          <p className="text-xs text-primary-400 mb-2">
            {formatDate(blog.created_at)}
          </p>
          <h3 className="text-lg font-semibold font-display text-primary-900 group-hover:text-steel-900 transition-colors duration-300">
            {blog.title}
          </h3>
          <p className="mt-2 text-sm text-primary-500 leading-relaxed">
            {truncateText(blog.content, 120)}
          </p>
          <span className="inline-block mt-3 text-sm font-medium text-steel-900 group-hover:text-steel-700 transition-colors">
            Read More →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
