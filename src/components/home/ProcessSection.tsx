'use client';

import { MessageSquare, PenTool, Calculator, Hammer, CheckCircle } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { StaggerContainer, SlideUp } from '@/components/ui/AnimationWrappers';
import { cn } from '@/lib/utils';

const steps = [
  {
    number: '01',
    title: 'Free Consultation',
    description: 'We understand your requirements, offering expert guidance to help you make informed decisions.',
    icon: MessageSquare,
  },
  {
    number: '02',
    title: 'Design Discussion',
    description: 'Collaborative sessions to transform ideas into functional, aesthetic, and feasible designs.',
    icon: PenTool,
  },
  {
    number: '03',
    title: 'Project Budgeting',
    description: 'We prepare a transparent budget without compromising on quality and timelines.',
    icon: Calculator,
  },
  {
    number: '04',
    title: 'Execution Phase',
    description: 'We bring designs to reality with precision fabrication and installation services.',
    icon: Hammer,
  },
  {
    number: '05',
    title: 'Final Handover',
    description: 'A detailed final review and quality assurance before we deliver the finished product.',
    icon: CheckCircle,
  },
];

export default function ProcessSection() {
  return (
    <section className="py-20 md:py-28 bg-accent-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="OUR PROCESS"
          title="How We Work"
          subtitle="We focus on offering our customers what's truly best for them."
        />

        <StaggerContainer className="relative grid md:grid-cols-5 gap-8 md:gap-6">
          <div className="hidden md:block absolute top-16 left-[calc(10%+24px)] right-[calc(10%+24px)] h-0.5 bg-gradient-to-r from-steel-300 via-steel-900 to-steel-300" />

          {steps.map((step, index) => (
            <SlideUp key={step.number} delay={index * 0.1}>
              <div className="relative flex flex-col items-center text-center">
                <div className="relative z-10 w-12 h-12 rounded-full bg-steel-900 text-white flex items-center justify-center text-sm font-bold mb-6">
                  {step.number}
                </div>

                <div className="w-14 h-14 rounded-xl bg-accent-50 flex items-center justify-center mb-4">
                  <step.icon className="w-7 h-7 text-steel-900" />
                </div>

                <h3 className="text-lg font-semibold text-primary-900 mb-3 font-display">
                  {step.title}
                </h3>
                <p className="text-sm text-steel-700 leading-relaxed font-sans">
                  {step.description}
                </p>

                {index < steps.length - 1 && (
                  <div className="md:hidden w-0.5 h-8 bg-steel-300 mt-6" />
                )}
              </div>
            </SlideUp>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
