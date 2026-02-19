'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Plus, X, ArrowLeft, Upload, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { Product } from '@/types';

const productSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().min(1, 'Description is required'),
  category: z.string().min(1, 'Category is required'),
  image: z.string().optional(),
  featured: z.boolean().optional(),
  sort_order: z.number().min(0).optional(),
  seo_title: z.string().optional(),
  seo_description: z.string().optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

const categories = ['Structural Steel', 'Roofing Solutions', 'Jali Products', 'Exterior Solutions'];

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export default function ProductForm({ product }: { product?: Product }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [features, setFeatures] = useState<string[]>(product?.features || []);
  const [useCases, setUseCases] = useState<string[]>(product?.use_cases || []);
  const [variants, setVariants] = useState<{ name: string; description: string; sizes?: string; types?: string }[]>(
    product?.variants || []
  );
  const [faqs, setFaqs] = useState<{ question: string; answer: string }[]>(product?.faqs || []);
  const [uploading, setUploading] = useState(false);

  const [newFeature, setNewFeature] = useState('');
  const [newUseCase, setNewUseCase] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: product?.title || '',
      slug: product?.slug || '',
      description: product?.description || '',
      category: product?.category || categories[0],
      image: product?.image || '',
      featured: product?.featured || false,
      sort_order: product?.sort_order || 0,
      seo_title: product?.seo_title || '',
      seo_description: product?.seo_description || '',
    },
  });

  const titleValue = watch('title');
  const imageValue = watch('image');

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', files[0]);
      formData.append('folder', 'products');

      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.url) {
        setValue('image', data.url);
      } else {
        setError('Image upload failed');
      }
    } catch {
      setError('Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setValue('image', '');
  };

  const onSubmit = async (data: ProductFormData) => {
    setSaving(true);
    setError(null);
    try {
      const url = product ? `/api/products/${product.id}` : '/api/products';
      const method = product ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          features,
          use_cases: useCases,
          variants,
          faqs,
        }),
      });
      if (!res.ok) {
        const result = await res.json();
        setError(result.error || 'Failed to save product');
        return;
      }
      router.push('/admin/products');
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setSaving(false);
    }
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature('');
    }
  };

  const addUseCase = () => {
    if (newUseCase.trim()) {
      setUseCases([...useCases, newUseCase.trim()]);
      setNewUseCase('');
    }
  };

  const addVariant = () => {
    setVariants([...variants, { name: '', description: '' }]);
  };

  const addFaq = () => {
    setFaqs([...faqs, { question: '', answer: '' }]);
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <Link href="/admin/products" className="inline-flex items-center gap-2 text-sm text-steel-600 hover:text-steel-900 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">{error}</div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="bg-white rounded-xl border border-steel-200 p-6 space-y-5">
          <h3 className="text-lg font-semibold text-primary-900 font-display">Basic Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-primary-700 mb-1.5">Title</label>
              <input
                {...register('title')}
                onBlur={() => {
                  if (!product && titleValue) setValue('slug', generateSlug(titleValue));
                }}
                className={cn(
                  'w-full px-4 py-2.5 border rounded-lg text-primary-900 focus:outline-none focus:ring-2 focus:ring-steel-900 focus:border-transparent',
                  errors.title ? 'border-red-300' : 'border-steel-200'
                )}
                placeholder="e.g. MS Angle"
              />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-700 mb-1.5">Slug</label>
              <input
                {...register('slug')}
                className={cn(
                  'w-full px-4 py-2.5 border rounded-lg text-primary-900 focus:outline-none focus:ring-2 focus:ring-steel-900 focus:border-transparent',
                  errors.slug ? 'border-red-300' : 'border-steel-200'
                )}
                placeholder="ms-angle"
              />
              {errors.slug && <p className="text-red-500 text-xs mt-1">{errors.slug.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary-700 mb-1.5">Description</label>
            <textarea
              {...register('description')}
              rows={4}
              className={cn(
                'w-full px-4 py-2.5 border rounded-lg text-primary-900 focus:outline-none focus:ring-2 focus:ring-steel-900 focus:border-transparent resize-y',
                errors.description ? 'border-red-300' : 'border-steel-200'
              )}
              placeholder="Product description..."
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-sm font-medium text-primary-700 mb-1.5">Category</label>
              <select
                {...register('category')}
                className="w-full px-4 py-2.5 border border-steel-200 rounded-lg text-primary-900 focus:outline-none focus:ring-2 focus:ring-steel-900 focus:border-transparent"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-700 mb-1.5">Sort Order</label>
              <input
                type="number"
                {...register('sort_order', { valueAsNumber: true })}
                className="w-full px-4 py-2.5 border border-steel-200 rounded-lg text-primary-900 focus:outline-none focus:ring-2 focus:ring-steel-900 focus:border-transparent"
              />
            </div>

            <div className="flex items-end pb-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" {...register('featured')} className="w-4 h-4 rounded border-steel-300" />
                <span className="text-sm font-medium text-primary-700">Featured Product</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary-700 mb-1.5">Product Image</label>
            <div className="space-y-3">
              {imageValue ? (
                <div className="relative inline-block">
                  <div className="relative w-48 h-36 rounded-lg overflow-hidden border border-steel-200">
                    <Image
                      src={imageValue}
                      alt="Product image"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-48 h-36 border-2 border-dashed border-steel-300 rounded-lg cursor-pointer hover:border-steel-500 transition-colors">
                  {uploading ? (
                    <>
                      <Loader2 className="w-8 h-8 text-steel-400 animate-spin mb-2" />
                      <p className="text-sm text-steel-500">Uploading...</p>
                    </>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-steel-400 mb-2" />
                      <p className="text-sm text-steel-500">Click to upload</p>
                    </>
                  )}
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                  />
                </label>
              )}
              <div>
                <p className="text-xs text-steel-400 mb-1">Or enter image URL directly:</p>
                <input
                  {...register('image')}
                  className="w-full px-4 py-2.5 border border-steel-200 rounded-lg text-primary-900 focus:outline-none focus:ring-2 focus:ring-steel-900 focus:border-transparent text-sm"
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-steel-200 p-6 space-y-4">
          <h3 className="text-lg font-semibold text-primary-900 font-display">Features</h3>
          <div className="flex gap-2">
            <input
              value={newFeature}
              onChange={e => setNewFeature(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addFeature(); } }}
              className="flex-1 px-4 py-2 border border-steel-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-steel-900 focus:border-transparent"
              placeholder="Add a feature..."
            />
            <button type="button" onClick={addFeature} className="px-3 py-2 bg-steel-900 text-white rounded-lg text-sm hover:bg-steel-800 transition-colors">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {features.map((f, i) => (
              <span key={i} className="inline-flex items-center gap-1 px-3 py-1 bg-accent-100 text-steel-700 rounded-full text-sm">
                {f}
                <button type="button" onClick={() => setFeatures(features.filter((_, idx) => idx !== i))} className="text-steel-400 hover:text-red-500">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-steel-200 p-6 space-y-4">
          <h3 className="text-lg font-semibold text-primary-900 font-display">Use Cases</h3>
          <div className="flex gap-2">
            <input
              value={newUseCase}
              onChange={e => setNewUseCase(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addUseCase(); } }}
              className="flex-1 px-4 py-2 border border-steel-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-steel-900 focus:border-transparent"
              placeholder="Add a use case..."
            />
            <button type="button" onClick={addUseCase} className="px-3 py-2 bg-steel-900 text-white rounded-lg text-sm hover:bg-steel-800 transition-colors">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {useCases.map((u, i) => (
              <span key={i} className="inline-flex items-center gap-1 px-3 py-1 bg-accent-100 text-steel-700 rounded-full text-sm">
                {u}
                <button type="button" onClick={() => setUseCases(useCases.filter((_, idx) => idx !== i))} className="text-steel-400 hover:text-red-500">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-steel-200 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-primary-900 font-display">Variants</h3>
            <button type="button" onClick={addVariant} className="inline-flex items-center gap-1 px-3 py-1.5 bg-steel-100 text-steel-700 rounded-lg text-sm hover:bg-steel-200 transition-colors">
              <Plus className="w-4 h-4" /> Add Variant
            </button>
          </div>
          {variants.map((v, i) => (
            <div key={i} className="border border-steel-100 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-start">
                <span className="text-xs font-semibold text-steel-500 uppercase">Variant {i + 1}</span>
                <button type="button" onClick={() => setVariants(variants.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  value={v.name}
                  onChange={e => { const nv = [...variants]; nv[i] = { ...nv[i], name: e.target.value }; setVariants(nv); }}
                  className="px-3 py-2 border border-steel-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-steel-900"
                  placeholder="Variant name"
                />
                <input
                  value={v.description}
                  onChange={e => { const nv = [...variants]; nv[i] = { ...nv[i], description: e.target.value }; setVariants(nv); }}
                  className="px-3 py-2 border border-steel-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-steel-900"
                  placeholder="Description"
                />
                <input
                  value={v.sizes || ''}
                  onChange={e => { const nv = [...variants]; nv[i] = { ...nv[i], sizes: e.target.value }; setVariants(nv); }}
                  className="px-3 py-2 border border-steel-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-steel-900"
                  placeholder="Sizes (optional)"
                />
                <input
                  value={v.types || ''}
                  onChange={e => { const nv = [...variants]; nv[i] = { ...nv[i], types: e.target.value }; setVariants(nv); }}
                  className="px-3 py-2 border border-steel-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-steel-900"
                  placeholder="Types (optional)"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-steel-200 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-primary-900 font-display">FAQs</h3>
            <button type="button" onClick={addFaq} className="inline-flex items-center gap-1 px-3 py-1.5 bg-steel-100 text-steel-700 rounded-lg text-sm hover:bg-steel-200 transition-colors">
              <Plus className="w-4 h-4" /> Add FAQ
            </button>
          </div>
          {faqs.map((faq, i) => (
            <div key={i} className="border border-steel-100 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-start">
                <span className="text-xs font-semibold text-steel-500 uppercase">FAQ {i + 1}</span>
                <button type="button" onClick={() => setFaqs(faqs.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <input
                value={faq.question}
                onChange={e => { const nf = [...faqs]; nf[i] = { ...nf[i], question: e.target.value }; setFaqs(nf); }}
                className="w-full px-3 py-2 border border-steel-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-steel-900"
                placeholder="Question"
              />
              <textarea
                value={faq.answer}
                onChange={e => { const nf = [...faqs]; nf[i] = { ...nf[i], answer: e.target.value }; setFaqs(nf); }}
                rows={2}
                className="w-full px-3 py-2 border border-steel-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-steel-900 resize-y"
                placeholder="Answer"
              />
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-steel-200 p-6 space-y-5">
          <h3 className="text-lg font-semibold text-primary-900 font-display">SEO Settings</h3>
          <div>
            <label className="block text-sm font-medium text-primary-700 mb-1.5">SEO Title</label>
            <input
              {...register('seo_title')}
              className="w-full px-4 py-2.5 border border-steel-200 rounded-lg text-primary-900 focus:outline-none focus:ring-2 focus:ring-steel-900 focus:border-transparent"
              placeholder="Custom SEO title (optional)"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-700 mb-1.5">SEO Description</label>
            <textarea
              {...register('seo_description')}
              rows={2}
              className="w-full px-4 py-2.5 border border-steel-200 rounded-lg text-primary-900 focus:outline-none focus:ring-2 focus:ring-steel-900 focus:border-transparent resize-y"
              placeholder="Custom meta description (optional)"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className={cn(
              'px-6 py-2.5 rounded-pill text-white font-medium transition-all',
              saving ? 'bg-steel-700 cursor-not-allowed' : 'bg-steel-900 hover:bg-steel-800'
            )}
          >
            {saving ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </span>
            ) : product ? 'Update Product' : 'Create Product'}
          </button>
          <Link href="/admin/products" className="px-6 py-2.5 text-steel-600 hover:text-steel-900 text-sm font-medium transition-colors">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
