'use client';

import { useRef, useState, useEffect } from 'react';
import { useInView } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import { SlideIn, FadeIn } from '@/components/ui/AnimationWrappers';

const stats = [
  { value: 150, suffix: '+', label: 'Projects Completed' },
  { value: 50, suffix: '+', label: 'Industrial Clients' },
  { value: 10, suffix: '+', label: 'Years Experience' },
  { value: 100, suffix: '%', label: 'Client Satisfaction' },
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
      <span className="text-3xl md:text-4xl font-bold text-accent-500">
        {count}{suffix}
      </span>
      <p className="mt-2 text-sm text-primary-500">{label}</p>
    </div>
  );
}

export default function CompanyPositioning() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="WHO WE ARE"
          title="Engineering Excellence Since Inception"
          align="left"
        />

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <SlideIn direction="left">
            <div className="space-y-5">
              <p className="text-primary-600 leading-relaxed">
                Namdev Infratech is a leading infrastructure development and fabrication company specializing in delivering robust, scalable solutions for industrial and commercial projects. With a foundation built on precision engineering, we transform complex blueprints into enduring structures.
              </p>
              <p className="text-primary-600 leading-relaxed">
                Our expertise spans structural steel fabrication, industrial plant construction, and custom metalwork. Every project we undertake reflects our commitment to quality materials, meticulous craftsmanship, and adherence to the highest safety standards.
              </p>
              <p className="text-primary-600 leading-relaxed">
                From large-scale industrial facilities to bespoke creative installations, we bring the same level of dedication and technical excellence to every endeavor, ensuring our clients receive solutions that exceed expectations.
              </p>
            </div>
          </SlideIn>

          <SlideIn direction="right">
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-steel-200 via-steel-300 to-primary-300 flex items-center justify-center">
              <span className="text-6xl font-bold text-white/60">NI</span>
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
