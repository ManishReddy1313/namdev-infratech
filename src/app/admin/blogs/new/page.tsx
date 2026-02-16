'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Upload, Loader2, Image as ImageIcon, Bold, Italic, Heading, X } from 'lucide-react';
import { cn, generateSlug } from '@/lib/utils';
import { supabase } from '@/lib/supabase';

const blogSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  category: z.string().min(1, 'Category is required'),
  content: z.string().min(1, 'Content is required'),
  published: z.boolean(),
  seo_title: z.string().optional(),
  seo_description: z.string().optional(),
});

type BlogFormData = z.infer<typeof blogSchema>;

const categories = ['Industry Insights', 'Project Updates', 'Tips & Guides', 'Company News'];

export default function NewBlogPage() {
  const router = useRouter();
  const contentRef = useRef<HTMLTextAreaElement | null>(null);
  const [featuredImage, setFeaturedImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: '',
      slug: '',
      category: '',
      content: '',
      published: false,
      seo_title: '',
      seo_description: '',
    },
  });

  const { ref: contentRegisterRef, ...contentRegisterRest } = register('content');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setValue('title', title);
    setValue('slug', generateSlug(title));
  };

  const insertFormatting = (tag: string) => {
    const textarea = contentRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);

    let newText: string;
    let cursorOffset: number;

    if (tag === 'b') {
      newText = `<b>${selectedText}</b>`;
      cursorOffset = selectedText ? newText.length : 3;
    } else if (tag === 'i') {
      newText = `<i>${selectedText}</i>`;
      cursorOffset = selectedText ? newText.length : 3;
    } else if (tag === 'h2') {
      newText = `<h2>${selectedText}</h2>`;
      cursorOffset = selectedText ? newText.length : 4;
    } else {
      return;
    }

    const updatedContent = text.substring(0, start) + newText + text.substring(end);
    setValue('content', updatedContent);
    textarea.value = updatedContent;

    setTimeout(() => {
      textarea.focus();
      const newPos = start + cursorOffset;
      textarea.setSelectionRange(newPos, newPos);
    }, 0);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const file = files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
    const { data, error } = await supabase.storage.from('blog-images').upload(fileName, file);

    if (data) {
      const { data: urlData } = supabase.storage.from('blog-images').getPublicUrl(data.path);
      setFeaturedImage(urlData.publicUrl);
    }

    setUploading(false);
    e.target.value = '';
  };

  const onSubmit = async (data: BlogFormData) => {
    setSubmitting(true);
    setSubmitError(null);

    const { error } = await supabase.from('blogs').insert({
      title: data.title,
      slug: data.slug,
      category: data.category,
      content: data.content,
      featured_image: featuredImage,
      published: data.published,
      seo_title: data.seo_title || null,
      seo_description: data.seo_description || null,
    });

    if (error) {
      setSubmitError(error.message);
      setSubmitting(false);
      return;
    }

    router.push('/admin/blogs');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/blogs"
          className="inline-flex items-center gap-1.5 text-sm text-primary-500 hover:text-steel-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog Posts
        </Link>
      </div>

      <div>
        <h1 className="text-2xl font-bold font-display text-primary-900">New Blog Post</h1>
        <p className="text-primary-500 mt-1">Create a new blog post</p>
      </div>

      {submitError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <fieldset className="bg-white rounded-xl border border-steel-200 p-6 space-y-5">
          <legend className="text-sm font-semibold text-primary-700 uppercase tracking-wider px-1">
            Basic Information
          </legend>

          <div>
            <label className="block text-sm font-medium text-primary-700 mb-1.5">Title</label>
            <input
              type="text"
              {...register('title')}
              onChange={handleTitleChange}
              className={cn(
                'w-full px-4 py-2.5 rounded-lg border text-primary-900 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-steel-900 focus:border-steel-900',
                errors.title ? 'border-red-300' : 'border-steel-300'
              )}
              placeholder="Enter blog post title"
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-primary-700 mb-1.5">Slug</label>
            <input
              type="text"
              {...register('slug')}
              className={cn(
                'w-full px-4 py-2.5 rounded-lg border text-primary-900 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-steel-900 focus:border-steel-900',
                errors.slug ? 'border-red-300' : 'border-steel-300'
              )}
              placeholder="blog-post-url-slug"
            />
            {errors.slug && <p className="text-red-500 text-xs mt-1">{errors.slug.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-primary-700 mb-1.5">Category</label>
            <select
              {...register('category')}
              className={cn(
                'w-full px-4 py-2.5 rounded-lg border text-primary-900 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-steel-900 focus:border-steel-900',
                errors.category ? 'border-red-300' : 'border-steel-300'
              )}
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-primary-700 mb-1.5">Content</label>
            <div className="border border-steel-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-steel-900 focus-within:border-steel-900">
              <div className="flex items-center gap-1 px-3 py-2 bg-steel-50 border-b border-steel-300">
                <button
                  type="button"
                  onClick={() => insertFormatting('b')}
                  className="p-1.5 rounded hover:bg-steel-200 text-primary-600 transition-colors"
                  title="Bold"
                >
                  <Bold className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('i')}
                  className="p-1.5 rounded hover:bg-steel-200 text-primary-600 transition-colors"
                  title="Italic"
                >
                  <Italic className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('h2')}
                  className="p-1.5 rounded hover:bg-steel-200 text-primary-600 transition-colors"
                  title="Heading"
                >
                  <Heading className="w-4 h-4" />
                </button>
              </div>
              <textarea
                {...contentRegisterRest}
                ref={(e) => {
                  contentRegisterRef(e);
                  contentRef.current = e;
                }}
                style={{ minHeight: '300px' }}
                className={cn(
                  'w-full px-4 py-3 text-primary-900 text-sm focus:outline-none resize-y',
                  errors.content ? 'bg-red-50/30' : ''
                )}
                placeholder="Write your blog post content here. You can use the toolbar above to add formatting."
              />
            </div>
            {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content.message}</p>}
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              {...register('published')}
              id="published"
              className="w-4 h-4 rounded border-steel-300 text-steel-900 focus:ring-steel-900"
            />
            <label htmlFor="published" className="text-sm font-medium text-primary-700">
              Publish immediately
            </label>
          </div>
        </fieldset>

        <fieldset className="bg-white rounded-xl border border-steel-200 p-6 space-y-5">
          <legend className="text-sm font-semibold text-primary-700 uppercase tracking-wider px-1">
            Featured Image
          </legend>

          {featuredImage ? (
            <div className="relative">
              <img
                src={featuredImage}
                alt="Featured"
                className="w-full h-48 object-cover rounded-lg border border-steel-200"
              />
              <button
                type="button"
                onClick={() => setFeaturedImage(null)}
                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-steel-300 rounded-lg cursor-pointer hover:border-steel-400 hover:bg-steel-50/30 transition-colors">
              <div className="flex flex-col items-center justify-center">
                {uploading ? (
                  <>
                    <Loader2 className="w-8 h-8 text-steel-900 animate-spin mb-2" />
                    <p className="text-sm text-primary-500">Uploading...</p>
                  </>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-primary-400 mb-2" />
                    <p className="text-sm text-primary-500">Click to upload featured image</p>
                    <p className="text-xs text-primary-400 mt-1">PNG, JPG, WEBP</p>
                  </>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={uploading}
              />
            </label>
          )}
        </fieldset>

        <fieldset className="bg-white rounded-xl border border-steel-200 p-6 space-y-5">
          <legend className="text-sm font-semibold text-primary-700 uppercase tracking-wider px-1">
            SEO Settings
          </legend>

          <div>
            <label className="block text-sm font-medium text-primary-700 mb-1.5">SEO Title</label>
            <input
              type="text"
              {...register('seo_title')}
              className="w-full px-4 py-2.5 rounded-lg border border-steel-300 text-primary-900 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-steel-900 focus:border-steel-900"
              placeholder="SEO optimized title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary-700 mb-1.5">SEO Description</label>
            <textarea
              {...register('seo_description')}
              rows={3}
              className="w-full px-4 py-2.5 rounded-lg border border-steel-300 text-primary-900 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-steel-900 focus:border-steel-900 resize-y"
              placeholder="Brief description for search engines"
            />
          </div>
        </fieldset>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Link
            href="/admin/blogs"
            className="px-5 py-2.5 text-sm font-medium text-primary-600 hover:text-primary-800 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className={cn(
              'inline-flex items-center gap-2 px-6 py-2.5 bg-steel-900 hover:bg-steel-800 text-white rounded-pill text-sm font-medium transition-colors',
              submitting && 'opacity-70 cursor-not-allowed'
            )}
          >
            {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
            {submitting ? 'Creating...' : 'Create Post'}
          </button>
        </div>
      </form>
    </div>
  );
}
