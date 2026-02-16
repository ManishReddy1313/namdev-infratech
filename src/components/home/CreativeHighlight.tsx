'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FadeIn, ParallaxSection } from '@/components/ui/AnimationWrappers';

export default function CreativeHighlight() {
  return (
    <section className="relative py-20 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-primary-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-steel-900/30 via-transparent to-transparent" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-accent-200/20 via-steel-700/30 to-primary-800/40 flex items-center justify-center border border-white/10">
              <div className="text-center">
                <span className="text-7xl font-bold text-white/20 font-display">NI</span>
                <p className="text-white/30 text-sm mt-2 font-sans">Our Services</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <span className="inline-block text-sm font-semibold uppercase tracking-wider text-accent-200 mb-3 font-sans">
              EXPANDING OUR REACH
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight font-display">
              Expanding Our Services for Your Needs
            </h2>
            <p className="mt-6 text-lg text-accent-200/80 leading-relaxed font-sans">
              At Namdev Infratech, after two decades of delivering top-quality steel, we've expanded our offerings to meet the evolving needs of our clients. Our expertise now spans custom fabrication, laser cutting, HR plate cutting, and precision engineering.
            </p>
            <div className="mt-10 mb-4">
              <Link
                href="/projects"
                className="btn-primary inline-flex items-center gap-2 px-8 py-4"
              >
                Explore Our Services
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
