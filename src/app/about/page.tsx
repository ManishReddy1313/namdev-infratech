'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FadeIn,
  SlideUp,
  SlideIn,
  StaggerContainer,
  ParallaxSection,
} from '@/components/ui/AnimationWrappers';
import SectionHeader from '@/components/ui/SectionHeader';
import { cn } from '@/lib/utils';
import { Wrench, Factory, Building2, Palette, RefreshCw, MessageSquare } from 'lucide-react';

const milestones = [
  {
    year: '2014',
    title: 'Founded',
    description: 'Namdev Infratech was established with a vision to deliver world-class steel fabrication and infrastructure solutions. Starting with a small workshop and a dedicated team of 5.',
  },
  {
    year: '2016',
    title: 'First Major Project',
    description: 'Secured and successfully delivered our first large-scale industrial plant project — a 20,000 sq. ft. manufacturing facility that set the benchmark for quality in our portfolio.',
  },
  {
    year: '2019',
    title: 'Expanded Operations',
    description: 'Expanded our fabrication facility to 15,000 sq. ft. with advanced CNC cutting and welding capabilities. Team grew to 50+ skilled professionals across engineering and fabrication.',
  },
  {
    year: '2021',
    title: 'Creative Division Launch',
    description: 'Launched our Creative Custom Projects division, bringing artistic metal fabrication — sculptures, custom furniture, and architectural elements — to discerning clients and designers.',
  },
  {
    year: '2024',
    title: '150+ Projects Milestone',
    description: 'Crossed 150 successfully completed projects across industrial and creative segments, serving clients in manufacturing, logistics, energy, and luxury residential sectors.',
  },
];

const capabilities = [
  {
    icon: Building2,
    title: 'Structural Steel',
    description: 'Heavy structural steelwork for industrial buildings, warehouses, and multi-story structures with precision engineering.',
  },
  {
    icon: Wrench,
    title: 'Metal Fabrication',
    description: 'Custom metal fabrication services including cutting, bending, welding, and finishing for diverse applications.',
  },
  {
    icon: Factory,
    title: 'Industrial Plants',
    description: 'Complete steel framework solutions for manufacturing plants, processing units, and industrial facilities.',
  },
  {
    icon: Palette,
    title: 'Custom Design',
    description: 'Bespoke creative metalwork — sculptures, furniture, gates, railings, and architectural decorative elements.',
  },
  {
    icon: RefreshCw,
    title: 'Renovation',
    description: 'Structural assessment, strengthening, and renovation of existing steel structures for extended service life.',
  },
  {
    icon: MessageSquare,
    title: 'Consulting',
    description: 'Expert engineering consultation on material selection, structural design, and project planning for steel construction.',
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative bg-primary-950 py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-950 via-primary-900 to-steel-950" />
        <div className="container-custom relative z-10 text-center">
          <FadeIn>
            <span className="inline-block text-sm font-semibold uppercase tracking-wider text-accent-400 mb-4">
              Who We Are
            </span>
          </FadeIn>
          <SlideUp>
            <h1 className="heading-1 text-white mb-4">About Namdev Infratech</h1>
          </SlideUp>
          <SlideUp delay={0.2}>
            <p className="text-lg md:text-xl text-primary-300 max-w-2xl mx-auto">
              A decade of engineering excellence in structural steel fabrication, industrial infrastructure, and creative metalwork.
            </p>
          </SlideUp>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <SlideIn direction="left">
              <div>
                <span className="inline-block text-sm font-semibold uppercase tracking-wider text-accent-500 mb-3">
                  Our Story
                </span>
                <h2 className="heading-2 text-primary-950 mb-6">Built on Strength, Driven by Craft</h2>
                <div className="space-y-4">
                  <p className="text-body">
                    Founded in 2014, Namdev Infratech began with a simple mission: to bring world-class steel fabrication capabilities to the Indian infrastructure sector. What started as a small workshop with five passionate engineers has grown into a full-service infrastructure and creative fabrication company.
                  </p>
                  <p className="text-body">
                    Over the past decade, we have delivered 150+ projects across industrial manufacturing, logistics, energy, chemical processing, and luxury residential sectors. Our work spans from massive industrial plant frameworks to delicate hand-forged artistic metalwork.
                  </p>
                  <p className="text-body">
                    Today, with a state-of-the-art 15,000 sq. ft. fabrication facility and a team of 50+ skilled professionals, we continue to push the boundaries of what's possible with steel — combining engineering precision with creative vision.
                  </p>
                </div>
              </div>
            </SlideIn>
            <SlideIn direction="right">
              <ParallaxSection offset={20}>
                <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-steel-600 via-primary-700 to-primary-900 shadow-2xl" />
              </ParallaxSection>
            </SlideIn>
          </div>
        </div>
      </section>

      <section className="section-padding bg-primary-50">
        <div className="container-custom">
          <SectionHeader
            label="Our Journey"
            title="Company Milestones"
            subtitle="Key moments that have shaped Namdev Infratech over the years."
          />

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-1/2 transform -translate-x-px top-0 bottom-0 w-0.5 bg-primary-200 hidden md:block" />

            {milestones.map((milestone, index) => (
              <div key={milestone.year} className={cn('relative mb-12 last:mb-0')}>
                <div
                  className={cn(
                    'md:grid md:grid-cols-2 md:gap-8 items-center',
                    index % 2 === 0 ? '' : 'md:[direction:rtl] md:[&>*]:![direction:ltr]'
                  )}
                >
                  <SlideIn direction={index % 2 === 0 ? 'left' : 'right'}>
                    <div className={cn('bg-white rounded-xl p-6 shadow-md border border-primary-100', index % 2 === 0 ? 'md:text-right' : '')}>
                      <span className="inline-block text-2xl font-bold text-accent-500 mb-2">
                        {milestone.year}
                      </span>
                      <h3 className="text-lg font-semibold text-primary-950 mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-sm text-primary-600 leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </SlideIn>
                  <div className="hidden md:block" />
                </div>

                <div className="absolute left-1/2 transform -translate-x-1/2 top-6 hidden md:flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="w-4 h-4 rounded-full bg-accent-500 border-4 border-white shadow"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            label="What We Do"
            title="Our Capabilities"
            subtitle="Comprehensive steel fabrication and infrastructure services under one roof."
          />

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((capability) => (
              <SlideUp key={capability.title}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border border-primary-100"
                >
                  <div className="w-12 h-12 rounded-lg bg-accent-50 flex items-center justify-center mb-4">
                    <capability.icon className="w-6 h-6 text-accent-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary-950 mb-2">
                    {capability.title}
                  </h3>
                  <p className="text-sm text-primary-600 leading-relaxed">
                    {capability.description}
                  </p>
                </motion.div>
              </SlideUp>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="section-padding bg-primary-50">
        <div className="container-custom">
          <SectionHeader
            label="Our People"
            title="The Team Behind the Steel"
            subtitle="A dedicated team of engineers, fabricators, and creative professionals."
          />

          <FadeIn>
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-body mb-8">
                Our strength lies in our people. From experienced structural engineers to master craftsmen, every member of the Namdev Infratech team brings passion, precision, and decades of collective expertise to every project we undertake.
              </p>
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <p className="text-3xl md:text-4xl font-bold text-accent-500">50+</p>
                  <p className="text-sm text-primary-600 mt-1">Team Members</p>
                </div>
                <div>
                  <p className="text-3xl md:text-4xl font-bold text-accent-500">10+</p>
                  <p className="text-sm text-primary-600 mt-1">Years Experience</p>
                </div>
                <div>
                  <p className="text-3xl md:text-4xl font-bold text-accent-500">150+</p>
                  <p className="text-sm text-primary-600 mt-1">Projects Delivered</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-950 to-steel-950" />
        <div className="container-custom relative z-10 text-center">
          <FadeIn>
            <h2 className="heading-2 text-white mb-6">Ready to Build Something Great?</h2>
          </FadeIn>
          <SlideUp delay={0.1}>
            <p className="text-lg text-primary-300 max-w-2xl mx-auto mb-10">
              Whether you need a massive industrial structure or a bespoke creative piece, our team is ready to bring your vision to life.
            </p>
          </SlideUp>
          <SlideUp delay={0.2}>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-primary text-lg px-8 py-4">
                Get in Touch
              </Link>
              <Link
                href="/projects"
                className="btn-secondary border-white text-white hover:bg-white hover:text-primary-950 text-lg px-8 py-4"
              >
                View Our Work
              </Link>
            </div>
          </SlideUp>
        </div>
      </section>
    </>
  );
}
