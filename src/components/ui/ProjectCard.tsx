'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Project } from '@/types/database';
import { cn, truncateText } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export default function ProjectCard({ project, className }: ProjectCardProps) {
  const hasImage = project.gallery && project.gallery.length > 0;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={cn('group rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow duration-300', className)}
    >
      <Link href={`/projects/${project.slug}`}>
        <div className="relative aspect-[4/3] overflow-hidden">
          {hasImage ? (
            <Image
              src={project.gallery[0]}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-primary-100 flex items-center justify-center">
              <span className="text-5xl font-bold text-primary-300">N</span>
            </div>
          )}
          <div className="absolute top-3 left-3">
            <span
              className={cn(
                'inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full',
                project.category === 'creative'
                  ? 'bg-accent-200 text-steel-900'
                  : 'bg-steel-900 text-white'
              )}
            >
              {project.category}
            </span>
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-lg font-semibold font-display text-primary-900 group-hover:text-steel-900 transition-colors duration-300">
            {project.title}
          </h3>
          <p className="mt-2 text-sm text-primary-500 leading-relaxed">
            {truncateText(project.description, 100)}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
