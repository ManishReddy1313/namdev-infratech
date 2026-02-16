'use client';

import { Ruler, Shield, Clock, Users, Lightbulb, HardHat } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { StaggerContainer, SlideUp, ScaleOnHover } from '@/components/ui/AnimationWrappers';

const features = [
  {
    icon: Ruler,
    title: 'Precision Engineering',
    description: 'Every measurement, every cut, every weld is executed with exacting precision to ensure structural perfection.',
  },
  {
    icon: Shield,
    title: 'Quality Materials',
    description: 'We source only certified, premium-grade materials that meet international quality and durability standards.',
  },
  {
    icon: Clock,
    title: 'Timely Delivery',
    description: 'Our streamlined processes and dedicated teams ensure every project is delivered on schedule without compromising quality.',
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Our workforce comprises skilled engineers, certified welders, and experienced project managers with decades of expertise.',
  },
  {
    icon: Lightbulb,
    title: 'Custom Solutions',
    description: 'We design and fabricate tailored solutions that perfectly match your unique project requirements and specifications.',
  },
  {
    icon: HardHat,
    title: 'Safety Standards',
    description: 'Rigorous safety protocols and compliance with industry regulations ensure a secure work environment on every project.',
  },
];

export default function CredibilitySection() {
  return (
    <section className="py-20 md:py-28 bg-primary-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="WHY CHOOSE US"
          title="Built on Trust & Precision"
          subtitle="Our commitment to excellence drives every project we undertake."
        />

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature) => (
            <SlideUp key={feature.title}>
              <ScaleOnHover>
                <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <div className="w-14 h-14 rounded-xl bg-accent-50 flex items-center justify-center mb-5">
                    <feature.icon className="w-7 h-7 text-accent-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary-950 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-primary-500 leading-relaxed">
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
