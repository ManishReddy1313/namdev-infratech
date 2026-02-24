'use client';

import Link from 'next/link';
import { Phone, MessageCircle } from 'lucide-react';
import { FadeIn } from '@/components/ui/AnimationWrappers';

interface ContactCTAProps {
  content?: { heading: string; description: string; phone: string; whatsapp: string };
}

export default function ContactCTA({ content }: ContactCTAProps) {
  const phone = content?.phone || '+919999999999';
  const whatsapp = content?.whatsapp || '919999999999';

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-br from-steel-900 via-steel-900 to-primary-900 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-steel-800/30 via-transparent to-transparent" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight font-display">
            {content?.heading || 'Ready to Build Something Great?'}
          </h2>
          <p className="mt-6 text-lg text-accent-200/80 max-w-2xl mx-auto leading-relaxed font-sans">
            {content?.description || 'Get in touch with our team to discuss your project requirements.'}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent-200 hover:bg-accent-300 text-steel-900 font-semibold rounded-pill transition-colors duration-300"
            >
              Get in Touch
            </Link>
            <a
              href={`tel:${phone}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-accent-200/60 hover:border-accent-200 text-accent-200 font-semibold rounded-pill transition-colors duration-300"
            >
              <Phone className="w-5 h-5" />
              Call Us Now
            </a>
          </div>
        </FadeIn>
      </div>

      <a
        href={`https://wa.me/${whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg transition-colors duration-300"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </a>
    </section>
  );
}
