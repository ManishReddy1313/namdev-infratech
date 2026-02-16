'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Project } from '@/types/database';
import SectionHeader from '@/components/ui/SectionHeader';
import ProjectCard from '@/components/ui/ProjectCard';
import { StaggerContainer, SlideUp } from '@/components/ui/AnimationWrappers';
import { getFeaturedProjects } from '@/lib/data';

export default function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    getFeaturedProjects().then(setProjects);
  }, []);

  return (
    <section className="py-20 md:py-28 bg-accent-100/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="OUR PRODUCTS"
          title="Durable Structural Solutions"
          subtitle="Reliable and quality materials for every project"
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
