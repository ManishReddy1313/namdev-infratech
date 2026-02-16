'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Plus, X, Upload, Loader2, Image as ImageIcon } from 'lucide-react';
import { cn, generateSlug } from '@/lib/utils';

const projectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  category: z.enum(['industrial', 'creative'], { required_error: 'Category is required' }),
  description: z.string().min(1, 'Description is required'),
  client_type: z.string().min(1, 'Client type is required'),
  featured: z.boolean(),
  seo_title: z.string().optional(),
  seo_description: z.string().optional(),
});

type ProjectFormData = z.infer<typeof projectSchema>;

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [materials, setMaterials] = useState<string[]>([]);
  const [materialInput, setMaterialInput] = useState('');
  const [gallery, setGallery] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: '',
      slug: '',
      category: 'industrial',
      description: '',
      client_type: '',
      featured: false,
      seo_title: '',
      seo_description: '',
    },
  });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/${id}`);
        if (res.ok) {
          const data = await res.json();
          reset({
            title: data.title,
            slug: data.slug,
            category: data.category,
            description: data.description,
            client_type: data.client_type,
            featured: data.featured,
            seo_title: data.seo_title || '',
            seo_description: data.seo_description || '',
          });
          setMaterials(data.materials || []);
          setGallery(data.gallery || []);
        }
      } catch (err) {
      }
      setLoading(false);
    };

    fetchProject();
  }, [id, reset]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setValue('title', title);
    setValue('slug', generateSlug(title));
  };

  const addMaterial = () => {
    const trimmed = materialInput.trim();
    if (trimmed && !materials.includes(trimmed)) {
      setMaterials([...materials, trimmed]);
      setMaterialInput('');
    }
  };

  const removeMaterial = (index: number) => {
    setMaterials(materials.filter((_, i) => i !== index));
  };

  const handleMaterialKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addMaterial();
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const newImages: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'projects');
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      if (res.ok) {
        const { url } = await res.json();
        newImages.push(url);
      }
    }

    setGallery([...gallery, ...newImages]);
    setUploading(false);
    e.target.value = '';
  };

  const removeImage = (index: number) => {
    setGallery(gallery.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: ProjectFormData) => {
    setSubmitting(true);
    setSubmitError(null);

    const res = await fetch(`/api/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: data.title,
        slug: data.slug,
        category: data.category,
        description: data.description,
        materials,
        client_type: data.client_type,
        featured: data.featured,
        gallery,
        seo_title: data.seo_title || null,
        seo_description: data.seo_description || null,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Failed to update project' }));
      setSubmitError(err.error || 'Failed to update project');
      setSubmitting(false);
      return;
    }

    router.push('/admin/projects');
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="h-5 w-36 bg-steel-200 rounded animate-pulse" />
        <div className="h-8 w-64 bg-steel-200 rounded animate-pulse" />
        <div className="bg-white rounded-xl border border-steel-200 p-6 space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-12 bg-steel-100 rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/projects"
          className="inline-flex items-center gap-1.5 text-sm text-primary-500 hover:text-steel-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>
      </div>

      <div>
        <h1 className="text-2xl font-bold font-display text-primary-900">Edit Project</h1>
        <p className="text-primary-500 mt-1">Update your project details</p>
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
              placeholder="Enter project title"
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
              placeholder="project-url-slug"
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
              <option value="industrial">Industrial</option>
              <option value="creative">Creative</option>
            </select>
            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-primary-700 mb-1.5">Description</label>
            <textarea
              {...register('description')}
              rows={6}
              className={cn(
                'w-full px-4 py-2.5 rounded-lg border text-primary-900 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-steel-900 focus:border-steel-900 resize-y',
                errors.description ? 'border-red-300' : 'border-steel-300'
              )}
              placeholder="Describe the project in detail"
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-primary-700 mb-1.5">Client Type</label>
            <input
              type="text"
              {...register('client_type')}
              className={cn(
                'w-full px-4 py-2.5 rounded-lg border text-primary-900 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-steel-900 focus:border-steel-900',
                errors.client_type ? 'border-red-300' : 'border-steel-300'
              )}
              placeholder="e.g., Residential, Commercial"
            />
            {errors.client_type && <p className="text-red-500 text-xs mt-1">{errors.client_type.message}</p>}
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              {...register('featured')}
              id="featured"
              className="w-4 h-4 rounded border-steel-300 text-steel-900 focus:ring-steel-900"
            />
            <label htmlFor="featured" className="text-sm font-medium text-primary-700">
              Featured Project
            </label>
          </div>
        </fieldset>

        <fieldset className="bg-white rounded-xl border border-steel-200 p-6 space-y-5">
          <legend className="text-sm font-semibold text-primary-700 uppercase tracking-wider px-1">
            Materials
          </legend>

          <div className="flex gap-2">
            <input
              type="text"
              value={materialInput}
              onChange={(e) => setMaterialInput(e.target.value)}
              onKeyDown={handleMaterialKeyDown}
              className="flex-1 px-4 py-2.5 rounded-lg border border-steel-300 text-primary-900 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-steel-900 focus:border-steel-900"
              placeholder="Add a material"
            />
            <button
              type="button"
              onClick={addMaterial}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-steel-700 hover:bg-steel-800 text-white rounded-lg text-sm font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>

          {materials.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {materials.map((material, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-steel-100 text-steel-700 rounded-full text-sm"
                >
                  {material}
                  <button
                    type="button"
                    onClick={() => removeMaterial(index)}
                    className="text-steel-400 hover:text-red-500 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </fieldset>

        <fieldset className="bg-white rounded-xl border border-steel-200 p-6 space-y-5">
          <legend className="text-sm font-semibold text-primary-700 uppercase tracking-wider px-1">
            Gallery Images
          </legend>

          <div>
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
                    <p className="text-sm text-primary-500">Click to upload images</p>
                    <p className="text-xs text-primary-400 mt-1">PNG, JPG, WEBP</p>
                  </>
                )}
              </div>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={uploading}
              />
            </label>
          </div>

          {gallery.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {gallery.map((url, index) => (
                <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border border-steel-200">
                  <img src={url} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1.5 right-1.5 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {gallery.length === 0 && !uploading && (
            <div className="text-center py-4">
              <ImageIcon className="w-10 h-10 text-primary-200 mx-auto mb-2" />
              <p className="text-sm text-primary-400">No images uploaded yet</p>
            </div>
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
            href="/admin/projects"
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
            {submitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
