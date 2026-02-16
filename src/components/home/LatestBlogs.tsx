'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Blog } from '@/types';
import SectionHeader from '@/components/ui/SectionHeader';
import BlogCard from '@/components/ui/BlogCard';
import { StaggerContainer, SlideUp } from '@/components/ui/AnimationWrappers';

export default function LatestBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    fetch('/api/blogs?published=true')
      .then(res => res.json())
      .then((data: Blog[]) => setBlogs(data.slice(0, 3)))
      .catch(() => {});
  }, []);

  return (
    <section className="py-20 md:py-28 bg-accent-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="INSIGHTS"
          title="Latest from Our Blog"
          subtitle="Stay updated with industry trends, project insights, and technical knowledge from our team."
        />

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <SlideUp key={blog.id}>
              <BlogCard blog={blog} />
            </SlideUp>
          ))}
        </StaggerContainer>

        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="btn-secondary inline-flex items-center gap-2 px-8 py-4"
          >
            View All Articles
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
