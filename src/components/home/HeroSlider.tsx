'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const slides = [
  {
    title: 'Building a Stronger Tomorrow with Generations of Expertise',
    subtitle: 'Precision engineering and robust construction solutions for a rapidly evolving world.',
    gradient: 'from-primary-900 via-steel-900 to-primary-900',
  },
  {
    title: 'Your Trusted Source for High-Quality Structural Materials',
    subtitle: 'From structural steel to custom fabrication, we deliver materials that stand the test of time.',
    gradient: 'from-steel-900 via-primary-900 to-steel-900',
  },
  {
    title: 'Precision and Excellence in Every Crafted Piece',
    subtitle: 'Custom fabrication, laser cutting, and engineering solutions for construction, architecture, and interior design.',
    gradient: 'from-primary-900 via-steel-900 to-primary-900',
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

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
                  Get in Touch
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/60 hover:border-white text-white font-semibold rounded-pill transition-colors duration-300"
                >
                  Our Services
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
