'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FadeIn,
  SlideUp,
  SlideIn,
  StaggerContainer,
  ScaleOnHover,
} from '@/components/ui/AnimationWrappers';
import { cn } from '@/lib/utils';

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  gallery: string[];
  materials: string;
  client_type: string;
  created_at: string;
}

const showcases = [
  {
    title: 'Metal Art & Sculptures',
    description:
      'Our master artisans transform raw metal into breathtaking works of art. From monumental outdoor installations to intimate gallery pieces, we craft sculptures that captivate and inspire. Every curve, texture, and finish is meticulously executed to bring artistic visions to life in steel, brass, copper, and stainless steel.',
    features: ['Custom Commissions', 'Public Art Installations', 'Corporate Lobby Pieces', 'Garden Sculptures'],
    slugs: ['dr-rashmi-villa-main-gate', 'basapura-villa-railing', 'custom-metal-stands-frames'],
  },
  {
    title: 'Custom Furniture & Fixtures',
    description:
      'Where industrial strength meets refined design. Our custom furniture pieces blend the raw beauty of metal with functional elegance. From statement dining tables with hand-forged bases to floating steel shelving systems, each creation is engineered for both beauty and durability.',
    features: ['Dining Tables & Consoles', 'Shelving Systems', 'Light Fixtures', 'Commercial Fit-outs'],
    slugs: ['computer-table', 'karans-dj-setup-table', 'boutique-display-stand'],
  },
  {
    title: 'Architectural Elements',
    description:
      'Elevate your spaces with custom-fabricated architectural metalwork. Our team specializes in creating stunning staircases, railings, canopies, façade elements, and decorative screens that define the character of a building. Every project reflects our commitment to precision engineering and aesthetic excellence.',
    features: ['Grand Staircases', 'Decorative Screens', 'Canopies & Pergolas', 'Façade Cladding'],
    slugs: ['hebbal-pergola-glass-roof', 'peenya-pergola-villa-terrace', 'cnc-pergola-indiranagar'],
  },
];

export default function CreativeProjectsClient({ projects }: { projects: Project[] }) {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const projectsBySlug = Object.fromEntries(projects.map(p => [p.slug, p]));

  const galleryImages = projects
    .filter(p => p.gallery && p.gallery.length > 0)
    .flatMap(p => p.gallery.map(img => ({ src: img, project: p.title, slug: p.slug })))
    .slice(0, 12);

  return (
    <>
      <section className="relative min-h-[80vh] flex items-center bg-steel-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-steel-900 via-steel-950 to-primary-900" />
        {projects[0]?.gallery?.[0] && (
          <div className="absolute inset-0">
            <Image
              src={projects[0].gallery[0]}
              alt="Creative projects showcase"
              fill
              className="object-cover opacity-30"
              unoptimized
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-steel-900/70 via-steel-900/50 to-steel-900/90" />
          </div>
        )}
        <div className="container-custom relative z-10 py-20 md:py-32">
          <FadeIn>
            <span className="inline-block text-sm font-semibold uppercase tracking-[0.2em] text-accent-200 mb-6">
              Creative Division
            </span>
          </FadeIn>
          <SlideUp>
            <h1 className="heading-1 text-white mb-6 max-w-4xl font-display">
              Creative Custom{' '}
              <span className="text-gradient bg-gradient-to-r from-accent-200 to-accent-300 bg-clip-text text-transparent">
                Projects
              </span>
            </h1>
          </SlideUp>
          <SlideUp delay={0.2}>
            <p className="text-xl md:text-2xl text-primary-300 max-w-2xl leading-relaxed">
              Where industrial craftsmanship meets artistic vision. We transform metal into extraordinary works of art, bespoke furniture, and architectural masterpieces that tell your story.
            </p>
          </SlideUp>
          <SlideUp delay={0.4}>
            <div className="flex flex-wrap gap-4 mt-10">
              <Link href="/contact" className="btn-primary text-lg px-8 py-4">
                Start Your Creative Project
              </Link>
              <Link href="/projects" className="btn-secondary border-white text-white hover:bg-white hover:text-primary-900 text-lg px-8 py-4">
                View All Projects
              </Link>
            </div>
          </SlideUp>
        </div>
      </section>

      {showcases.map((showcase, index) => {
        const showcaseProjects = showcase.slugs.map(s => projectsBySlug[s]).filter(Boolean);
        const showcaseImage = showcaseProjects.find(p => p.gallery?.length > 0)?.gallery[0];

        return (
          <section key={showcase.title} className={cn('section-padding', index % 2 === 0 ? 'bg-white' : 'bg-primary-50')}>
            <div className="container-custom">
              <div className={cn(
                'grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center',
                index % 2 !== 0 && 'lg:[direction:rtl] lg:[&>*]:![direction:ltr]'
              )}>
                <FadeIn>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group">
                    {showcaseImage ? (
                      <Image
                        src={showcaseImage}
                        alt={showcase.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-steel-900 to-primary-900" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-steel-900/40 to-transparent" />
                  </div>
                  <div className="grid grid-cols-3 gap-3 mt-3">
                    {showcaseProjects.slice(0, 3).map((proj) => (
                      <Link key={proj.slug} href={`/projects/${proj.slug}`} className="block">
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden group">
                          {proj.gallery?.[1] || proj.gallery?.[0] ? (
                            <Image
                              src={proj.gallery[1] || proj.gallery[0]}
                              alt={proj.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                              unoptimized
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-steel-700 to-steel-900" />
                          )}
                          <div className="absolute inset-0 bg-steel-900/0 group-hover:bg-steel-900/50 transition-all duration-300 flex items-center justify-center">
                            <span className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity text-center px-2">
                              {proj.title}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </FadeIn>

                <div>
                  <SlideIn direction={index % 2 === 0 ? 'right' : 'left'}>
                    <span className="inline-block text-sm font-semibold uppercase tracking-wider text-steel-900 mb-3">
                      0{index + 1}
                    </span>
                    <h2 className="heading-2 text-primary-900 mb-6 font-display">{showcase.title}</h2>
                    <p className="text-body mb-8">{showcase.description}</p>
                    <div className="grid grid-cols-2 gap-3 mb-8">
                      {showcase.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center gap-2 text-sm text-primary-700"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-steel-900" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {showcaseProjects.map(proj => (
                        <Link
                          key={proj.slug}
                          href={`/projects/${proj.slug}`}
                          className="text-sm font-medium text-steel-900 hover:text-accent-700 underline underline-offset-4 transition-colors"
                        >
                          {proj.title} &rarr;
                        </Link>
                      ))}
                    </div>
                  </SlideIn>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <section className="section-padding bg-primary-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <FadeIn>
              <span className="inline-block text-sm font-semibold uppercase tracking-wider text-steel-900 mb-4">
                Portfolio
              </span>
            </FadeIn>
            <SlideUp>
              <h2 className="heading-2 text-primary-900 mb-4 font-display">All Creative Projects</h2>
            </SlideUp>
            <SlideUp delay={0.1}>
              <p className="text-lg text-primary-600 max-w-2xl mx-auto">
                Browse our complete collection of custom metalwork, bespoke furniture, and architectural fabrication projects.
              </p>
            </SlideUp>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.filter(p => p.gallery && p.gallery.length > 0).map((project) => (
              <SlideUp key={project.id}>
                <Link href={`/projects/${project.slug}`} className="block group">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={project.gallery[0]}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-steel-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-3 left-3">
                        <span className="bg-accent-200 text-steel-900 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
                          Creative
                        </span>
                      </div>
                      {project.gallery.length > 1 && (
                        <div className="absolute bottom-3 right-3 bg-steel-900/70 text-white text-xs font-medium px-2 py-1 rounded-md backdrop-blur-sm">
                          {project.gallery.length} photos
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-lg font-semibold text-primary-900 mb-2 group-hover:text-steel-900 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-primary-600 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex items-center gap-4 mt-4 text-xs text-primary-500">
                        {project.materials && (
                          <span className="flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                            {project.materials}
                          </span>
                        )}
                        {project.client_type && (
                          <span className="flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                            {project.client_type}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </SlideUp>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="section-padding bg-steel-900">
        <div className="container-custom text-center">
          <FadeIn>
            <span className="inline-block text-sm font-semibold uppercase tracking-wider text-accent-200 mb-4">
              Our Work
            </span>
          </FadeIn>
          <SlideUp>
            <h2 className="heading-2 text-white mb-4 font-display">Creative Gallery</h2>
          </SlideUp>
          <SlideUp delay={0.1}>
            <p className="text-lg text-primary-300 max-w-2xl mx-auto mb-12">
              A glimpse into our world of custom metal fabrication and artistic craftsmanship.
            </p>
          </SlideUp>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {galleryImages.map((item, index) => (
              <SlideUp key={`${item.slug}-${index}`}>
                <ScaleOnHover>
                  <button
                    onClick={() => setLightboxImage(item.src)}
                    className="group relative overflow-hidden rounded-xl w-full"
                  >
                    <div className="relative aspect-square">
                      <Image
                        src={item.src}
                        alt={item.project}
                        fill
                        className="object-cover transition-all duration-500 group-hover:scale-110"
                        unoptimized
                      />
                    </div>
                    <div className="absolute inset-0 bg-steel-900/0 group-hover:bg-steel-900/60 transition-all duration-500 flex items-end justify-center pb-4">
                      <span className="text-accent-200 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0 text-center px-2">
                        {item.project}
                      </span>
                    </div>
                  </button>
                </ScaleOnHover>
              </SlideUp>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-steel-900 to-primary-900" />
        {projects[2]?.gallery?.[0] && (
          <div className="absolute inset-0">
            <Image
              src={projects[2].gallery[0]}
              alt="Creative project"
              fill
              className="object-cover opacity-20"
              unoptimized
            />
          </div>
        )}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-white blur-[128px]" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <FadeIn>
            <h2 className="heading-2 text-white mb-6 font-display">Have a Creative Vision?</h2>
          </FadeIn>
          <SlideUp delay={0.1}>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10">
              Let's bring your ideas to life. From concept sketches to finished installations, our creative team is ready to collaborate on your next masterpiece.
            </p>
          </SlideUp>
          <SlideUp delay={0.2}>
            <Link
              href="/contact"
              className="btn-primary text-lg px-8 py-4"
            >
              Start Your Creative Project
            </Link>
          </SlideUp>
        </div>
      </section>

      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightboxImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-5xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightboxImage}
                alt="Gallery image"
                width={1200}
                height={900}
                className="object-contain w-full h-full rounded-lg"
                unoptimized
              />
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute -top-12 right-0 text-white text-lg font-medium hover:text-accent-200 transition-colors"
              >
                Close &times;
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
