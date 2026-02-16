'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Project } from '@/types';
import ProjectCard from '@/components/ui/ProjectCard';
import { FadeIn, SlideUp, StaggerContainer } from '@/components/ui/AnimationWrappers';
import { cn } from '@/lib/utils';

const categories = [
  { label: 'All', value: 'all' },
  { label: 'Industrial Projects', value: 'industrial' },
  { label: 'Creative Custom Projects', value: 'creative' },
];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const url = activeCategory === 'all' ? '/api/projects' : `/api/projects?category=${activeCategory}`;
    fetch(url)
      .then(res => res.json())
      .then((data) => { setProjects(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [activeCategory]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Our Projects | Namdev Infratech',
    description: 'Explore our portfolio of industrial and creative fabrication projects.',
    url: 'https://namdevinfratech.com/projects',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: projects.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'CreativeWork',
          name: project.title,
          description: project.description,
          url: `https://namdevinfratech.com/projects/${project.slug}`,
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative bg-steel-900 py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-steel-900 via-primary-900 to-steel-950" />
        <div className="container-custom relative z-10 text-center">
          <FadeIn>
            <span className="inline-block text-sm font-semibold uppercase tracking-wider text-accent-200 mb-4">
              Portfolio
            </span>
          </FadeIn>
          <SlideUp>
            <h1 className="heading-1 text-white mb-4 font-display">Our Projects</h1>
          </SlideUp>
          <SlideUp delay={0.2}>
            <p className="text-lg md:text-xl text-primary-300 max-w-2xl mx-auto">
              From heavy industrial structures to bespoke creative fabrication — explore the breadth of our engineering excellence.
            </p>
          </SlideUp>
        </div>
      </section>

      <section className="section-padding bg-primary-50">
        <div className="container-custom">
          <FadeIn className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={cn(
                  'px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300',
                  activeCategory === cat.value
                    ? 'bg-steel-900 text-white shadow-lg'
                    : 'bg-white text-primary-700 hover:bg-primary-100 border border-steel-900'
                )}
              >
                {cat.label}
              </button>
            ))}
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <SlideUp key={project.id}>
                <ProjectCard project={project} />
              </SlideUp>
            ))}
          </StaggerContainer>

          {!loading && projects.length === 0 && (
            <FadeIn className="text-center py-16">
              <p className="text-primary-500 text-lg">No projects found in this category.</p>
            </FadeIn>
          )}
        </div>
      </section>
    </>
  );
}
