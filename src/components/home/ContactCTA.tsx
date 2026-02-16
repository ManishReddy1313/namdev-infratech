'use client';

import Link from 'next/link';
import { Phone, MessageCircle } from 'lucide-react';
import { FadeIn } from '@/components/ui/AnimationWrappers';

export default function ContactCTA() {
  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-br from-accent-500 via-accent-600 to-accent-700 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-accent-400/30 via-transparent to-transparent" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Ready to Build Something Great?
          </h2>
          <p className="mt-6 text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            Whether it's a large-scale industrial project or a custom creative installation, our team is ready to bring your vision to life. Let's start building together.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-primary-50 text-accent-600 font-semibold rounded-lg transition-colors duration-300"
            >
              Start Your Project
            </Link>
            <a
              href="tel:+919999999999"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/40 hover:border-white text-white font-semibold rounded-lg transition-colors duration-300"
            >
              <Phone className="w-5 h-5" />
              Call Us Now
            </a>
          </div>
        </FadeIn>
      </div>

      <a
        href="https://wa.me/919999999999"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg transition-colors duration-300"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </a>
    </section>
  );
}
