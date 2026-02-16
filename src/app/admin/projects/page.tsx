'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, Star, Eye } from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import { supabase } from '@/lib/supabase';
import type { Project } from '@/types/database';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) setProjects(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) return;

    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (!error) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
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
          <h1 className="text-2xl font-bold font-display text-primary-900">Projects</h1>
          <p className="text-primary-500 mt-1">Manage your project portfolio</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-steel-900 hover:bg-steel-800 text-white rounded-pill text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add New Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="bg-white rounded-xl border border-steel-200 p-12 text-center">
          <Eye className="w-12 h-12 text-primary-200 mx-auto mb-3" />
          <p className="text-primary-500 text-lg font-medium">No projects yet</p>
          <p className="text-primary-400 text-sm mt-1">
            Get started by adding your first project.
          </p>
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-steel-900 hover:bg-steel-800 text-white rounded-pill text-sm font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add New Project
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-steel-200 overflow-hidden">
          <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-3 bg-steel-50 border-b border-steel-200 text-xs font-semibold text-primary-500 uppercase tracking-wider">
            <div className="col-span-4">Title</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-2">Featured</div>
            <div className="col-span-2">Created</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>
          <div className="divide-y divide-steel-100">
            {projects.map((project) => (
              <div
                key={project.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-6 py-4 items-center hover:bg-steel-50 transition-colors"
              >
                <div className="md:col-span-4">
                  <p className="font-medium text-primary-900 truncate">{project.title}</p>
                  <p className="text-xs text-primary-400 md:hidden mt-0.5">
                    {formatDate(project.created_at)}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <span
                    className={cn(
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize',
                      project.category === 'industrial'
                        ? 'bg-steel-100 text-steel-700'
                        : 'bg-accent-200 text-steel-900'
                    )}
                  >
                    {project.category}
                  </span>
                </div>
                <div className="md:col-span-2">
                  <Star
                    className={cn(
                      'w-5 h-5',
                      project.featured
                        ? 'text-steel-900 fill-steel-900'
                        : 'text-primary-300'
                    )}
                  />
                </div>
                <div className="hidden md:block md:col-span-2 text-sm text-primary-500">
                  {formatDate(project.created_at)}
                </div>
                <div className="md:col-span-2 flex items-center gap-2 md:justify-end">
                  <Link
                    href={`/admin/projects/edit/${project.id}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-steel-700 hover:text-steel-900 hover:bg-steel-50 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    <span className="md:hidden lg:inline">Edit</span>
                  </Link>
                  <button
                    onClick={() => handleDelete(project.id)}
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
