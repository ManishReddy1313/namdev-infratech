'use client';

import { useRef, useState, useEffect } from 'react';
import { useInView } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import { SlideIn, FadeIn } from '@/components/ui/AnimationWrappers';

const stats = [
  { value: 20, suffix: '+', label: 'Years in Industry' },
  { value: 400, suffix: '+', label: 'Tonnes/Month' },
  { value: 1, suffix: 'K+', label: 'Happy Clients' },
  { value: 2003, suffix: '', label: 'Founded' },
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
          label="A NEW NAME, A STRONGER COMMITMENT"
          title="From Namadeva Steel Center to Namdev Infratech"
          align="left"
        />

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <SlideIn direction="left">
            <div className="space-y-5">
              <p className="text-steel-700 leading-relaxed font-sans">
                What started in 2003 as a simple material supply business has grown into a complete solution provider for interior design, architecture, and construction. From handling 25 tonnes back then to managing 400 tonnes per month now, we've come a long way.
              </p>
              <p className="text-steel-700 leading-relaxed font-sans">
                Over the years, we've learned about the challenges designers, architects, and contractors face, and we've adapted to meet their needs. With services like custom fabrication, laser cutting, HR plate cutting, and more, our new name reflects our commitment to providing innovative, reliable solutions.
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
