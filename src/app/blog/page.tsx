'use client';

import { useState, useEffect } from 'react';
import type { Blog } from '@/types/database';
import BlogCard from '@/components/ui/BlogCard';
import { FadeIn, SlideUp, StaggerContainer } from '@/components/ui/AnimationWrappers';
import { cn } from '@/lib/utils';
import { getBlogs } from '@/lib/data';

const categories = ['All', 'Industry Insights', 'Project Updates', 'Tips & Guides'];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getBlogs(activeCategory).then((data) => {
      setBlogs(data);
      setLoading(false);
    });
  }, [activeCategory]);

  return (
    <>
      <section className="relative bg-steel-900 py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-steel-900 via-primary-900 to-steel-950" />
        <div className="container-custom relative z-10 text-center">
          <FadeIn>
            <span className="inline-block text-sm font-semibold uppercase tracking-wider text-accent-200 mb-4">
              Knowledge Hub
            </span>
          </FadeIn>
          <SlideUp>
            <h1 className="heading-1 text-white mb-4 font-display">Our Blog</h1>
          </SlideUp>
          <SlideUp delay={0.2}>
            <p className="text-lg md:text-xl text-primary-300 max-w-2xl mx-auto">
              Industry insights, project stories, and expert tips from the world of steel fabrication and infrastructure.
            </p>
          </SlideUp>
        </div>
      </section>

      <section className="section-padding bg-primary-50">
        <div className="container-custom">
          <FadeIn className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  'px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300',
                  activeCategory === cat
                    ? 'bg-steel-900 text-white shadow-lg'
                    : 'bg-white text-primary-700 hover:bg-primary-100 border border-steel-900'
                )}
              >
                {cat}
              </button>
            ))}
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <SlideUp key={blog.id}>
                <BlogCard blog={blog} />
              </SlideUp>
            ))}
          </StaggerContainer>

          {!loading && blogs.length === 0 && (
            <FadeIn className="text-center py-16">
              <p className="text-primary-500 text-lg">No posts found in this category.</p>
            </FadeIn>
          )}
        </div>
      </section>
    </>
  );
}
