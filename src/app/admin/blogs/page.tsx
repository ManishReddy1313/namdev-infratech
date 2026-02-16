'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import { supabase } from '@/lib/supabase';
import type { Blog } from '@/types/database';

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) setBlogs(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) return;

    const { error } = await supabase.from('blogs').delete().eq('id', id);
    if (!error) {
      setBlogs((prev) => prev.filter((b) => b.id !== id));
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-8 w-48 bg-steel-200 rounded animate-pulse" />
          <div className="h-10 w-40 bg-steel-200 rounded animate-pulse" />
        </div>
        <div className="bg-white rounded-xl border border-steel-200 p-6 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-steel-100 rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-primary-900">Blog Posts</h1>
          <p className="text-primary-500 mt-1">Manage your blog content</p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-steel-900 hover:bg-steel-800 text-white rounded-pill text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add New Post
        </Link>
      </div>

      {blogs.length === 0 ? (
        <div className="bg-white rounded-xl border border-steel-200 p-12 text-center">
          <Eye className="w-12 h-12 text-primary-200 mx-auto mb-3" />
          <p className="text-primary-500 text-lg font-medium">No blog posts yet</p>
          <p className="text-primary-400 text-sm mt-1">
            Get started by creating your first blog post.
          </p>
          <Link
            href="/admin/blogs/new"
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-steel-900 hover:bg-steel-800 text-white rounded-pill text-sm font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add New Post
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-steel-200 overflow-hidden">
          <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-3 bg-steel-50 border-b border-steel-200 text-xs font-semibold text-primary-500 uppercase tracking-wider">
            <div className="col-span-4">Title</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Created</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>
          <div className="divide-y divide-steel-100">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-6 py-4 items-center hover:bg-steel-50 transition-colors"
              >
                <div className="md:col-span-4">
                  <p className="font-medium text-primary-900 truncate">{blog.title}</p>
                  <p className="text-xs text-primary-400 md:hidden mt-0.5">
                    {formatDate(blog.created_at)}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-steel-100 text-steel-700">
                    {blog.category}
                  </span>
                </div>
                <div className="md:col-span-2">
                  <span
                    className={cn(
                      'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium',
                      blog.published
                        ? 'bg-green-100 text-green-700'
                        : 'bg-steel-100 text-steel-600'
                    )}
                  >
                    {blog.published ? (
                      <Eye className="w-3 h-3" />
                    ) : (
                      <EyeOff className="w-3 h-3" />
                    )}
                    {blog.published ? 'Published' : 'Draft'}
                  </span>
                </div>
                <div className="hidden md:block md:col-span-2 text-sm text-primary-500">
                  {formatDate(blog.created_at)}
                </div>
                <div className="md:col-span-2 flex items-center gap-2 md:justify-end">
                  <Link
                    href={`/admin/blogs/edit/${blog.id}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-steel-700 hover:text-steel-900 hover:bg-steel-50 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    <span className="md:hidden lg:inline">Edit</span>
                  </Link>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="md:hidden lg:inline">Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
