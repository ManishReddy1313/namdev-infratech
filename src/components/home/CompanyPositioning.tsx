'use client';

import { useRef, useState, useEffect } from 'react';
import { useInView } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import { SlideIn, FadeIn } from '@/components/ui/AnimationWrappers';

const stats = [
  { value: 20, suffix: '+', label: 'Years of Industry Experience' },
  { value: 400, suffix: '+', label: 'Tonnes Delivered Monthly' },
  { value: 1, suffix: 'K+', label: 'Projects Completed' },
  { value: 6, suffix: '', label: 'Core Services Offered' },
];

function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let current = 0;
    const duration = 2000;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center">
      <span className="text-3xl md:text-4xl font-bold text-steel-900 font-display">
        {count}{suffix}
      </span>
      <p className="mt-2 text-sm text-steel-700 font-sans">{label}</p>
    </div>
  );
}

export default function CompanyPositioning() {
  return (
    <section className="py-20 md:py-28 bg-accent-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="WHO WE ARE"
          title="Your Complete Steel & Infrastructure Partner"
          align="left"
        />

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <SlideIn direction="left">
            <div className="space-y-5">
              <p className="text-steel-700 leading-relaxed font-sans">
                Founded in 2003 by Bajrang Lal Didwania, Namdev Infratech has evolved from a regional steel supplier into a comprehensive infrastructure solutions company. We serve architects, interior designers, contractors, and builders with everything from raw structural materials to precision-engineered fabrication services.
              </p>
              <p className="text-steel-700 leading-relaxed font-sans">
                Our product catalog spans structural steel sections, roofing systems, jali and mesh products, and exterior cladding solutions. Paired with in-house capabilities for laser cutting, HR plate processing, and custom fabrication, we eliminate the need for multiple vendors — saving our clients time, cost, and coordination effort.
              </p>
            </div>
          </SlideIn>

          <SlideIn direction="right">
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-steel-200 via-steel-300 to-accent-200 flex items-center justify-center">
              <span className="text-6xl font-bold text-white/60 font-display">NI</span>
            </div>
          </SlideIn>
        </div>

        <FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-primary-100">
            {stats.map((stat) => (
              <StatItem
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
