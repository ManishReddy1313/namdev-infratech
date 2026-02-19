'use client';

import Link from 'next/link';
import { ArrowRight, Hammer, Ruler, Building2, LayoutGrid, Warehouse, Wrench } from 'lucide-react';
import { FadeIn, SlideUp, StaggerContainer } from '@/components/ui/AnimationWrappers';

const services = [
  { icon: Building2, title: 'Structural Fabrication', description: 'Heavy steel structures, trusses, and frameworks for industrial and commercial construction.' },
  { icon: Hammer, title: 'General Fabrication', description: 'Custom metalwork including gates, grills, railings, staircases, and furniture.' },
  { icon: Ruler, title: 'Elevation & Facade Work', description: 'Modern building facades using HPL, ACP, laser-cut panels, and cladding systems.' },
  { icon: LayoutGrid, title: 'Metal Partitions', description: 'Decorative and functional metal partitions for offices, retail, and residential spaces.' },
  { icon: Warehouse, title: 'Warehouse Construction', description: 'Complete industrial shed and warehouse solutions from foundation to roofing.' },
  { icon: Wrench, title: 'Custom Jobs', description: 'Laser cutting, HR plate processing, CNC bending, and specialized engineering work.' },
];

export default function CreativeHighlight() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-primary-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-steel-900/30 via-transparent to-transparent" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-14">
          <span className="inline-block text-sm font-semibold uppercase tracking-wider text-accent-200 mb-3 font-sans">
            OUR SERVICES
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight font-display">
            Complete Fabrication & Engineering Solutions
          </h2>
          <p className="mt-4 text-lg text-accent-200/80 max-w-2xl mx-auto font-sans">
            Beyond materials — we design, fabricate, and install. Our in-house team handles projects from initial consultation to final handover.
          </p>
        </FadeIn>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, idx) => (
            <SlideUp key={service.title} delay={idx * 0.05}>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 h-full">
                <div className="w-12 h-12 rounded-lg bg-accent-200/20 flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-accent-200" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 font-display">{service.title}</h3>
                <p className="text-sm text-accent-200/70 leading-relaxed font-sans">{service.description}</p>
              </div>
            </SlideUp>
          ))}
        </StaggerContainer>

        <FadeIn className="text-center mt-12">
          <Link href="/contact" className="btn-primary inline-flex items-center gap-2 px-8 py-4">
            Discuss Your Project <ArrowRight className="w-5 h-5" />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
