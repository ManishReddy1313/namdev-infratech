'use client';

import { MessageSquare, PenTool, Hammer, Truck } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { StaggerContainer, SlideUp } from '@/components/ui/AnimationWrappers';
import { cn } from '@/lib/utils';

const steps = [
  {
    number: '01',
    title: 'Consultation',
    description: 'We begin by understanding your requirements, site conditions, and project goals through detailed discussions and site assessments.',
    icon: MessageSquare,
  },
  {
    number: '02',
    title: 'Design & Planning',
    description: 'Our engineering team creates detailed designs, structural calculations, and project plans to ensure precision from the start.',
    icon: PenTool,
  },
  {
    number: '03',
    title: 'Fabrication',
    description: 'Using state-of-the-art equipment and premium materials, we manufacture each component with meticulous attention to quality.',
    icon: Hammer,
  },
  {
    number: '04',
    title: 'Delivery & Installation',
    description: 'Our experienced crew handles transportation and on-site installation, ensuring seamless assembly and structural integrity.',
    icon: Truck,
  },
];

export default function ProcessSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="HOW WE WORK"
          title="Our Process"
          subtitle="A streamlined approach from concept to completion, ensuring quality at every stage."
        />

        <StaggerContainer className="relative grid md:grid-cols-4 gap-8 md:gap-6">
          <div className="hidden md:block absolute top-16 left-[calc(12.5%+24px)] right-[calc(12.5%+24px)] h-0.5 bg-gradient-to-r from-accent-300 via-accent-500 to-accent-300" />

          {steps.map((step, index) => (
            <SlideUp key={step.number} delay={index * 0.1}>
              <div className="relative flex flex-col items-center text-center">
                <div className="relative z-10 w-12 h-12 rounded-full bg-accent-500 text-white flex items-center justify-center text-sm font-bold mb-6">
                  {step.number}
                </div>

                <div className="w-14 h-14 rounded-xl bg-primary-50 flex items-center justify-center mb-4">
                  <step.icon className="w-7 h-7 text-accent-500" />
                </div>

                <h3 className="text-lg font-semibold text-primary-950 mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-primary-500 leading-relaxed">
                  {step.description}
                </p>

                {index < steps.length - 1 && (
                  <div className="md:hidden w-0.5 h-8 bg-accent-300 mt-6" />
                )}
              </div>
            </SlideUp>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
