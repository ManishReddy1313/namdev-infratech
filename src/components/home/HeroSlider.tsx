'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const defaultSlides = [
  {
    title: 'Engineering Strength Into Every Structure Since 2003',
    subtitle: 'Two decades of delivering premium structural steel, precision fabrication, and end-to-end infrastructure solutions across India.',
    gradient: 'from-primary-900 via-steel-900 to-primary-900',
  },
  {
    title: 'Steel Products & Fabrication Under One Roof',
    subtitle: 'Structural pipes, roofing sheets, MS plates, laser cutting, and more — everything your project demands, delivered on time.',
    gradient: 'from-steel-900 via-primary-900 to-steel-900',
  },
  {
    title: 'From 25 Tonnes to 400 Tonnes a Month',
    subtitle: 'Our growth mirrors the trust of thousands of architects, builders, and contractors who rely on us for quality and consistency.',
    gradient: 'from-primary-900 via-steel-900 to-primary-900',
  },
];

const gradients = [
  'from-primary-900 via-steel-900 to-primary-900',
  'from-steel-900 via-primary-900 to-steel-900',
  'from-primary-900 via-steel-900 to-primary-900',
];

interface HeroSliderProps {
  content?: { slides: Array<{ title: string; subtitle: string }> };
}

export default function HeroSlider({ content }: HeroSliderProps) {
  const slides = content?.slides
    ? content.slides.map((s, i) => ({
        title: s.title,
        subtitle: s.subtitle,
        gradient: gradients[i % gradients.length],
      }))
    : defaultSlides;

  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className={cn(
            'absolute inset-0 bg-gradient-to-br',
            slides[current].gradient
          )}
        >
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 flex h-full items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="max-w-3xl"
            >
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight font-display"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {slides[current].title}
              </motion.h1>
              <motion.p
                className="mt-6 text-lg sm:text-xl text-accent-200 max-w-2xl leading-relaxed font-sans"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {slides[current].subtitle}
              </motion.p>
              <motion.div
                className="mt-10 flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Link
                  href="/contact"
                  className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4"
                >
                  Request a Quote
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/60 hover:border-white text-white font-semibold rounded-pill transition-colors duration-300"
                >
                  Browse Projects
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={cn(
              'w-3 h-3 rounded-full transition-all duration-300',
              index === current
                ? 'bg-accent-200 w-8'
                : 'bg-white/40 hover:bg-white/60'
            )}
          />
        ))}
      </div>
    </section>
  );
}
