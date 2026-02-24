'use client';

import { Award, Layers, Target, Settings, Clock, ShieldCheck } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { StaggerContainer, SlideUp, ScaleOnHover } from '@/components/ui/AnimationWrappers';

const defaultFeatures = [
  {
    icon: Award,
    title: 'Two Decades of Expertise',
    description: 'Over 20 years of hands-on experience across steel supply, fabrication, and infrastructure construction.',
  },
  {
    icon: Layers,
    title: 'Single-Source Convenience',
    description: 'Materials, fabrication, and installation — all from one team. No more coordinating between multiple vendors.',
  },
  {
    icon: Target,
    title: 'Precision at Every Stage',
    description: 'CNC laser cutting, exact specifications, and rigorous quality checks ensure every piece meets your standards.',
  },
  {
    icon: Settings,
    title: 'Solutions, Not Just Products',
    description: 'We analyze your project requirements and recommend the optimal materials, techniques, and designs.',
  },
  {
    icon: Clock,
    title: 'Reliable, On-Schedule Delivery',
    description: 'Disciplined project management and a 400+ tonne monthly capacity ensure your timelines are met consistently.',
  },
  {
    icon: ShieldCheck,
    title: '6-Month Service Warranty',
    description: 'Every fabrication project includes a comprehensive 6-month warranty covering workmanship and materials.',
  },
];

interface CredibilitySectionProps {
  content?: { label: string; heading: string; features: Array<{ title: string; description: string }> };
}

export default function CredibilitySection({ content }: CredibilitySectionProps) {
  const features = defaultFeatures.map((f, i) => ({
    ...f,
    title: content?.features?.[i]?.title || f.title,
    description: content?.features?.[i]?.description || f.description,
  }));

  return (
    <section className="py-20 md:py-28 bg-accent-100/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label={content?.label || "WHY CHOOSE US"}
          title={content?.heading || "The Namdev Infratech Advantage"}
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
