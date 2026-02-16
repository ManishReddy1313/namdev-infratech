'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FadeIn,
  SlideUp,
  SlideIn,
  ParallaxSection,
  ScaleOnHover,
  StaggerContainer,
} from '@/components/ui/AnimationWrappers';
import { cn } from '@/lib/utils';

const showcases = [
  {
    title: 'Metal Art & Sculptures',
    description:
      'Our master artisans transform raw metal into breathtaking works of art. From monumental outdoor installations to intimate gallery pieces, we craft sculptures that captivate and inspire. Every curve, texture, and finish is meticulously executed to bring artistic visions to life in steel, brass, copper, and stainless steel.',
    features: ['Custom Commissions', 'Public Art Installations', 'Corporate Lobby Pieces', 'Garden Sculptures'],
    gradient: 'from-accent-600 via-accent-700 to-primary-900',
  },
  {
    title: 'Custom Furniture & Fixtures',
    description:
      'Where industrial strength meets refined design. Our custom furniture pieces blend the raw beauty of metal with functional elegance. From statement dining tables with hand-forged bases to floating steel shelving systems, each creation is engineered for both beauty and durability.',
    features: ['Dining Tables & Consoles', 'Shelving Systems', 'Light Fixtures', 'Commercial Fit-outs'],
    gradient: 'from-steel-700 via-steel-800 to-primary-950',
  },
  {
    title: 'Architectural Elements',
    description:
      'Elevate your spaces with custom-fabricated architectural metalwork. Our team specializes in creating stunning staircases, railings, canopies, façade elements, and decorative screens that define the character of a building. Every project reflects our commitment to precision engineering and aesthetic excellence.',
    features: ['Grand Staircases', 'Decorative Screens', 'Canopies & Pergolas', 'Façade Cladding'],
    gradient: 'from-primary-800 via-steel-900 to-primary-950',
  },
];

const galleryItems = [
  { gradient: 'from-accent-500 to-accent-700', label: 'Steel Sculpture' },
  { gradient: 'from-steel-600 to-steel-800', label: 'Iron Staircase' },
  { gradient: 'from-primary-700 to-primary-900', label: 'Metal Table' },
  { gradient: 'from-accent-600 to-primary-800', label: 'Copper Wall Art' },
  { gradient: 'from-steel-700 to-accent-600', label: 'Brass Fixture' },
  { gradient: 'from-primary-800 to-steel-700', label: 'Gate Design' },
];

export default function CreativeProjectsPage() {
  return (
    <>
      <section className="relative min-h-[80vh] flex items-center bg-primary-950 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-950 via-steel-950 to-primary-900" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-accent-500 blur-[128px]" />
          <div className="absolute bottom-20 left-20 w-64 h-64 rounded-full bg-steel-500 blur-[96px]" />
        </div>
        <div className="container-custom relative z-10 py-20 md:py-32">
          <FadeIn>
            <span className="inline-block text-sm font-semibold uppercase tracking-[0.2em] text-accent-400 mb-6">
              Creative Division
            </span>
          </FadeIn>
          <SlideUp>
            <h1 className="heading-1 text-white mb-6 max-w-4xl">
              Creative Custom{' '}
              <span className="text-gradient bg-gradient-to-r from-accent-400 to-accent-600 bg-clip-text text-transparent">
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
              <Link href="/projects" className="btn-secondary border-white text-white hover:bg-white hover:text-primary-950 text-lg px-8 py-4">
                View Portfolio
              </Link>
            </div>
          </SlideUp>
        </div>
      </section>

      {showcases.map((showcase, index) => (
        <section key={showcase.title} className={cn('section-padding', index % 2 === 0 ? 'bg-white' : 'bg-primary-50')}>
          <div className="container-custom">
            <div className={cn(
              'grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center',
              index % 2 !== 0 && 'lg:[direction:rtl] lg:[&>*]:![direction:ltr]'
            )}>
              <ParallaxSection offset={30}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  className={cn(
                    'aspect-[4/3] rounded-2xl bg-gradient-to-br shadow-2xl',
                    showcase.gradient
                  )}
                />
              </ParallaxSection>

              <div>
                <SlideIn direction={index % 2 === 0 ? 'right' : 'left'}>
                  <span className="inline-block text-sm font-semibold uppercase tracking-wider text-accent-500 mb-3">
                    0{index + 1}
                  </span>
                  <h2 className="heading-2 text-primary-950 mb-6">{showcase.title}</h2>
                  <p className="text-body mb-8">{showcase.description}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {showcase.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-2 text-sm text-primary-700"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-accent-500" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </SlideIn>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="section-padding bg-primary-950">
        <div className="container-custom text-center">
          <FadeIn>
            <span className="inline-block text-sm font-semibold uppercase tracking-wider text-accent-400 mb-4">
              Our Work
            </span>
          </FadeIn>
          <SlideUp>
            <h2 className="heading-2 text-white mb-4">Creative Gallery</h2>
          </SlideUp>
          <SlideUp delay={0.1}>
            <p className="text-lg text-primary-300 max-w-2xl mx-auto mb-12">
              A glimpse into our world of custom metal fabrication and artistic craftsmanship.
            </p>
          </SlideUp>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {galleryItems.map((item, index) => (
              <SlideUp key={item.label}>
                <ScaleOnHover>
                  <div className="group relative overflow-hidden rounded-xl">
                    <div
                      className={cn(
                        'aspect-square bg-gradient-to-br transition-all duration-500',
                        item.gradient
                      )}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-end justify-center pb-6">
                      <span className="text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                        {item.label}
                      </span>
                    </div>
                  </div>
                </ScaleOnHover>
              </SlideUp>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-500 to-accent-700" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-white blur-[128px]" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <FadeIn>
            <h2 className="heading-2 text-white mb-6">Have a Creative Vision?</h2>
          </FadeIn>
          <SlideUp delay={0.1}>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10">
              Let's bring your ideas to life. From concept sketches to finished installations, our creative team is ready to collaborate on your next masterpiece.
            </p>
          </SlideUp>
          <SlideUp delay={0.2}>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-accent-600 font-semibold rounded-lg hover:bg-primary-50 transition-all duration-300 shadow-xl hover:shadow-2xl text-lg"
            >
              Start Your Creative Project
            </Link>
          </SlideUp>
        </div>
      </section>
    </>
  );
}
