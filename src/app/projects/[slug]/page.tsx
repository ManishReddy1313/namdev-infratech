'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import type { Project } from '@/types/database';
import ProjectCard from '@/components/ui/ProjectCard';
import SectionHeader from '@/components/ui/SectionHeader';
import { FadeIn, SlideUp, SlideIn } from '@/components/ui/AnimationWrappers';
import { cn } from '@/lib/utils';
import { ArrowLeft, Calendar, Layers, Users } from 'lucide-react';
import { getProjectBySlug, getProjects } from '@/lib/data';

const galleryPlaceholders = [
  'from-steel-600 to-steel-800',
  'from-primary-700 to-primary-900',
  'from-accent-600 to-accent-800',
  'from-steel-700 to-primary-800',
];

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [activeImage, setActiveImage] = useState(0);
  const [project, setProject] = useState<Project | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const projectData = await getProjectBySlug(slug);
      setProject(projectData);
      if (projectData) {
        const allProjects = await getProjects(projectData.category);
        setRelatedProjects(allProjects.filter(p => p.id !== projectData.id).slice(0, 3));
      }
      setLoading(false);
    }
    loadData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-accent-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="heading-2 text-primary-950 mb-4">Project Not Found</h1>
          <p className="text-body mb-8">The project you're looking for doesn't exist.</p>
          <Link href="/projects" className="btn-primary">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="relative bg-primary-950 py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-950 via-primary-900 to-steel-950" />
        <div className="container-custom relative z-10">
          <FadeIn>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-primary-300 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Projects
            </Link>
          </FadeIn>
          <SlideUp>
            <span
              className={cn(
                'inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full text-white mb-4',
                project.category === 'creative' ? 'bg-accent-500' : 'bg-steel-600'
              )}
            >
              {project.category}
            </span>
          </SlideUp>
          <SlideUp delay={0.1}>
            <h1 className="heading-1 text-white mb-4">{project.title}</h1>
          </SlideUp>
          <SlideUp delay={0.2}>
            <p className="text-lg text-primary-300 max-w-3xl">
              {project.description.split('\n')[0]}
            </p>
          </SlideUp>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <FadeIn>
                <div
                  className={cn(
                    'w-full aspect-[16/10] rounded-xl bg-gradient-to-br',
                    galleryPlaceholders[activeImage % galleryPlaceholders.length]
                  )}
                />
              </FadeIn>
              <div className="flex gap-3 mt-4">
                {galleryPlaceholders.map((gradient, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={cn(
                      'w-20 h-16 rounded-lg bg-gradient-to-br transition-all duration-300',
                      gradient,
                      activeImage === index
                        ? 'ring-2 ring-accent-500 ring-offset-2'
                        : 'opacity-60 hover:opacity-100'
                    )}
                  />
                ))}
              </div>

              <div className="mt-12">
                <SlideUp>
                  <h2 className="heading-3 text-primary-950 mb-6">Project Details</h2>
                </SlideUp>
                <SlideUp delay={0.1}>
                  <div className="prose prose-lg max-w-none">
                    {project.description.split('\n').filter(Boolean).map((paragraph, index) => (
                      <p key={index} className="text-body mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </SlideUp>

                <SlideUp delay={0.2} className="mt-8">
                  <h3 className="text-lg font-semibold text-primary-950 mb-4">Materials Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.materials.map((material) => (
                      <span
                        key={material}
                        className="px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm font-medium border border-primary-200"
                      >
                        {material}
                      </span>
                    ))}
                  </div>
                </SlideUp>
              </div>
            </div>

            <div className="lg:col-span-1">
              <SlideIn direction="right">
                <div className="bg-primary-50 rounded-xl p-6 sticky top-24">
                  <h3 className="text-lg font-semibold text-primary-950 mb-6">Project Summary</h3>

                  <div className="space-y-5">
                    <div className="flex items-start gap-3">
                      <Layers className="w-5 h-5 text-accent-500 mt-0.5" />
                      <div>
                        <p className="text-sm text-primary-500">Category</p>
                        <p className="font-medium text-primary-950 capitalize">{project.category}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-accent-500 mt-0.5" />
                      <div>
                        <p className="text-sm text-primary-500">Client Type</p>
                        <p className="font-medium text-primary-950">{project.client_type}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-accent-500 mt-0.5" />
                      <div>
                        <p className="text-sm text-primary-500">Completed</p>
                        <p className="font-medium text-primary-950">
                          {new Date(project.created_at).toLocaleDateString('en-IN', {
                            year: 'numeric',
                            month: 'long',
                          })}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 space-y-3">
                    <Link
                      href={`/contact?project=${encodeURIComponent(project.title)}`}
                      className="btn-primary w-full text-center"
                    >
                      Enquire About This Project
                    </Link>
                    <Link
                      href="/projects"
                      className="btn-outline w-full text-center"
                    >
                      View All Projects
                    </Link>
                  </div>
                </div>
              </SlideIn>
            </div>
          </div>
        </div>
      </section>

      {relatedProjects.length > 0 && (
        <section className="section-padding bg-primary-50">
          <div className="container-custom">
            <SectionHeader
              label="Related"
              title="Similar Projects"
              subtitle="Explore more projects in this category."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProjects.map((p) => (
                <SlideUp key={p.id}>
                  <ProjectCard project={p} />
                </SlideUp>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
