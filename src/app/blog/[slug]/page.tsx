'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import type { Blog } from '@/types';
import BlogCard from '@/components/ui/BlogCard';
import { FadeIn, SlideUp, SlideIn } from '@/components/ui/AnimationWrappers';
import { formatDate } from '@/lib/utils';
import { ArrowLeft, Calendar, Clock, Tag, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [blog, setBlog] = useState<Blog | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const res = await fetch(`/api/blogs/by-slug/${slug}`);
        if (!res.ok) { setLoading(false); return; }
        const blogData = await res.json();
        setBlog(blogData);
        const latestRes = await fetch('/api/blogs?published=true');
        const latest = await latestRes.json();
        setRelatedPosts(latest.filter((b: Blog) => b.id !== blogData.id).slice(0, 3));
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

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="heading-2 text-primary-900 mb-4 font-display">Post Not Found</h1>
          <p className="text-body mb-8">The blog post you're looking for doesn't exist.</p>
          <Link href="/blog" className="btn-primary">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const readingTime = Math.ceil(blog.content.split(/\s+/).length / 200);
  const paragraphs = blog.content.split('\n').filter(Boolean);

  return (
    <>
      <section className="relative bg-steel-900 py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-steel-900 via-primary-900 to-steel-950" />
        <div className="container-custom relative z-10">
          <FadeIn>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-primary-300 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </FadeIn>
          <SlideUp>
            <span className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full bg-steel-900 text-white border border-steel-700 mb-4">
              {blog.category}
            </span>
          </SlideUp>
          <SlideUp delay={0.1}>
            <h1 className="heading-1 text-white mb-6 max-w-4xl font-display">{blog.title}</h1>
          </SlideUp>
          <SlideUp delay={0.2}>
            <div className="flex flex-wrap items-center gap-6 text-primary-300">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatDate(blog.created_at)}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {readingTime} min read
              </span>
              <span className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                {blog.category}
              </span>
            </div>
          </SlideUp>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <FadeIn>
              <div className="w-full aspect-[16/9] rounded-xl bg-gradient-to-br from-steel-600 to-primary-800 mb-12" />
            </FadeIn>

            <article className="prose prose-lg max-w-none">
              {paragraphs.map((paragraph, index) => (
                <SlideUp key={index} delay={index * 0.05}>
                  <p className="text-body mb-6 leading-relaxed">{paragraph}</p>
                </SlideUp>
              ))}
            </article>

            <FadeIn>
              <div className="mt-12 pt-8 border-t border-primary-200">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-primary-500">
                    <Share2 className="w-4 h-4" />
                    <span className="text-sm font-medium">Share this article</span>
                  </div>
                  <div className="flex gap-3">
                    <button className="w-10 h-10 rounded-full bg-steel-900 hover:bg-steel-800 flex items-center justify-center transition-colors">
                      <Facebook className="w-4 h-4 text-white" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-steel-900 hover:bg-steel-800 flex items-center justify-center transition-colors">
                      <Twitter className="w-4 h-4 text-white" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-steel-900 hover:bg-steel-800 flex items-center justify-center transition-colors">
                      <Linkedin className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="mt-12 p-6 bg-accent-200/50 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-steel-900 to-steel-700 flex items-center justify-center text-white text-xl font-bold">
                    NI
                  </div>
                  <div>
                    <h4 className="font-semibold font-display text-primary-900">Namdev Infratech Team</h4>
                    <p className="text-sm text-primary-500">
                      Experts in structural steel fabrication, industrial construction, and creative metalwork with over a decade of experience.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {relatedPosts.length > 0 && (
        <section className="section-padding bg-primary-50">
          <div className="container-custom">
            <FadeIn className="text-center mb-12">
              <h2 className="heading-2 text-primary-900 font-display">Related Posts</h2>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {relatedPosts.map((post) => (
                <SlideUp key={post.id}>
                  <BlogCard blog={post} />
                </SlideUp>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
