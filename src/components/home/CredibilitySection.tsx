'use client';

import { Award, Layers, Target, Settings, Clock, ShieldCheck } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { StaggerContainer, SlideUp, ScaleOnHover } from '@/components/ui/AnimationWrappers';

const features = [
  {
    icon: Award,
    title: 'Expertise You Trust',
    description: '20+ years of experience in steel, metal, and industrial fabrication.',
  },
  {
    icon: Layers,
    title: 'End-to-End Service',
    description: 'From layouts to assembly – full-service design & fabrication.',
  },
  {
    icon: Target,
    title: 'Precision Guaranteed',
    description: 'Smooth fabrication and accurate industrial metalworks.',
  },
  {
    icon: Settings,
    title: 'Tailored Solutions',
    description: 'Solutions crafted to your project\'s unique requirements.',
  },
  {
    icon: Clock,
    title: 'On-Time Delivery',
    description: 'Efficient handovers with no compromise on quality.',
  },
  {
    icon: ShieldCheck,
    title: 'Service Warranty',
    description: '6-month warranty on all fabrication services.',
  },
];

export default function CredibilitySection() {
  return (
    <section className="py-20 md:py-28 bg-accent-100/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="WHY US"
          title="Six Reasons Clients Trust Us"
        />

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature) => (
            <SlideUp key={feature.title}>
              <ScaleOnHover>
                <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm hover:shadow-lg hover:border-steel-900 border border-transparent transition-all duration-300">
                  <div className="w-14 h-14 rounded-xl bg-accent-100 flex items-center justify-center mb-5">
                    <feature.icon className="w-7 h-7 text-steel-900" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary-900 mb-3 font-display">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-steel-700 leading-relaxed font-sans">
                    {feature.description}
                  </p>
                </div>
              </ScaleOnHover>
            </SlideUp>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
