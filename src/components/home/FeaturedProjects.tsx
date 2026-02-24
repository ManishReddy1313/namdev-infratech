'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Project } from '@/types';
import SectionHeader from '@/components/ui/SectionHeader';
import ProjectCard from '@/components/ui/ProjectCard';
import { StaggerContainer, SlideUp } from '@/components/ui/AnimationWrappers';

interface FeaturedProjectsProps {
  content?: { label: string; heading: string; subtitle: string };
}

export default function FeaturedProjects({ content }: FeaturedProjectsProps) {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch('/api/projects?featured=true')
      .then(res => res.json())
      .then((data: Project[]) => setProjects(data.filter(p => p.featured).slice(0, 3)))
      .catch(() => {});
  }, []);

  return (
    <section className="py-20 md:py-28 bg-accent-100/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label={content?.label || "OUR PRODUCTS"}
          title={content?.heading || "Durable Structural Solutions"}
          subtitle={content?.subtitle || "Reliable and quality materials for every project"}
        />

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <SlideUp key={project.id}>
              <ProjectCard project={project} />
            </SlideUp>
          ))}
        </StaggerContainer>

        <div className="mt-12 text-center">
          <Link
            href="/projects"
            className="btn-secondary inline-flex items-center gap-2 px-8 py-4"
          >
            View All Projects
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
