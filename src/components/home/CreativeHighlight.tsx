'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FadeIn, ParallaxSection } from '@/components/ui/AnimationWrappers';

export default function CreativeHighlight() {
  return (
    <ParallaxSection className="relative py-28 md:py-36">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-950 via-steel-950 to-primary-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent-500/10 via-transparent to-transparent" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-accent-500/20 via-steel-700/30 to-primary-800/40 flex items-center justify-center border border-white/10">
              <div className="text-center">
                <span className="text-7xl font-bold text-white/20">NI</span>
                <p className="text-white/30 text-sm mt-2">Creative Works</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <span className="inline-block text-sm font-semibold uppercase tracking-wider text-accent-400 mb-3">
              BEYOND INDUSTRIAL
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Creative Custom Projects
            </h2>
            <p className="mt-6 text-lg text-primary-300 leading-relaxed">
              We go beyond conventional fabrication to create stunning custom metalwork that merges artistry with engineering. From sculptural installations to architectural features, our creative division transforms bold ideas into extraordinary metal creations that captivate and inspire.
            </p>
            <p className="mt-4 text-primary-400 leading-relaxed">
              Every creative project is a collaboration between our skilled fabricators and visionary designers, resulting in one-of-a-kind pieces that push the boundaries of what metal can become.
            </p>
            <div className="mt-10">
              <Link
                href="/creative-projects"
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent-500 hover:bg-accent-600 text-white font-semibold rounded-lg transition-colors duration-300"
              >
                Explore Creative Projects
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </ParallaxSection>
  );
}
