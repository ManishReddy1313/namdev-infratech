'use client';

import { MessageSquare, PenTool, Calculator, Hammer, CheckCircle } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { StaggerContainer, SlideUp } from '@/components/ui/AnimationWrappers';

const defaultSteps = [
  {
    number: '01',
    title: 'Free Consultation',
    description: 'Share your project requirements and our team will assess feasibility, suggest the right materials, and outline the scope.',
    icon: MessageSquare,
  },
  {
    number: '02',
    title: 'Design & Planning',
    description: 'We collaborate on design details — structural layouts, material specifications, and finishes that align with your vision.',
    icon: PenTool,
  },
  {
    number: '03',
    title: 'Transparent Budgeting',
    description: 'Receive a detailed, itemized quotation with no hidden costs. We optimize material usage to maximize value for your budget.',
    icon: Calculator,
  },
  {
    number: '04',
    title: 'Precision Execution',
    description: 'Our skilled fabrication team brings your project to life with quality-controlled processes and regular progress updates.',
    icon: Hammer,
  },
  {
    number: '05',
    title: 'Quality Handover',
    description: 'Every deliverable undergoes a thorough quality inspection before handover, backed by our 6-month service warranty.',
    icon: CheckCircle,
  },
];

interface ProcessSectionProps {
  content?: { label: string; heading: string; subtitle: string; steps: Array<{ title: string; description: string }> };
}

export default function ProcessSection({ content }: ProcessSectionProps) {
  const steps = defaultSteps.map((s, i) => ({
    ...s,
    title: content?.steps?.[i]?.title || s.title,
    description: content?.steps?.[i]?.description || s.description,
  }));

  return (
    <section className="py-20 md:py-28 bg-accent-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label={content?.label || "OUR PROCESS"}
          title={content?.heading || "Five Steps to Your Finished Project"}
          subtitle={content?.subtitle || "A structured, transparent workflow that keeps you informed and your project on track from day one."}
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
