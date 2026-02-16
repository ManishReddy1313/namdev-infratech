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
import {
  Wrench,
  Factory,
  Building2,
  Layers,
  Warehouse,
  Scissors,
  MessageSquare,
  PenTool,
  DollarSign,
  Hammer,
  CheckCircle,
  Users,
  Target,
  Eye,
  Heart,
} from 'lucide-react';

const milestones = [
  {
    year: '2003',
    title: 'Founded by Bajrang Lal Didwania',
    description: 'Namadeva Steel Center was established as a material supply business, handling 25 tonnes of steel per month.',
  },
  {
    year: '2008',
    title: 'Expanded to 100+ Tonnes/Month',
    description: 'Grew operations significantly, expanding capacity to over 100 tonnes per month to serve a wider clientele.',
  },
  {
    year: '2013',
    title: 'Launched Fabrication Services',
    description: 'Expanded beyond material supply into custom fabrication services, offering end-to-end solutions for clients.',
  },
  {
    year: '2018',
    title: 'Added Laser Cutting & HR Plate Cutting',
    description: 'Invested in advanced technology including laser cutting and HR plate cutting to deliver precision-engineered products.',
  },
  {
    year: '2023',
    title: 'Rebranded to Namdev Infratech',
    description: 'Rebranded from Namadeva Steel Center to Namdev Infratech, now managing 400+ tonnes per month across all services.',
  },
];

const capabilities = [
  {
    icon: Building2,
    title: 'Structural Fabrication',
    description: 'Heavy structural steelwork for industrial buildings, commercial spaces, and multi-story structures with precision engineering.',
  },
  {
    icon: Wrench,
    title: 'General Fabrication',
    description: 'Custom metal fabrication services including cutting, bending, welding, and finishing for diverse applications.',
  },
  {
    icon: Layers,
    title: 'Elevation / Facade',
    description: 'Modern elevation and facade solutions using steel, glass, and composite materials for striking architectural exteriors.',
  },
  {
    icon: Factory,
    title: 'Metal Partition',
    description: 'Durable and elegant metal partition systems for offices, commercial spaces, and industrial environments.',
  },
  {
    icon: Warehouse,
    title: 'Warehouses',
    description: 'Complete warehouse construction and steel framework solutions for logistics, storage, and industrial facilities.',
  },
  {
    icon: Scissors,
    title: 'Custom Jobs',
    description: 'Bespoke fabrication projects tailored to unique requirements — from artistic metalwork to specialized industrial components.',
  },
];

const processSteps = [
  {
    icon: MessageSquare,
    step: '01',
    title: 'Free Consultation',
    description: 'We begin with a free consultation to understand your project requirements, goals, and budget.',
  },
  {
    icon: PenTool,
    step: '02',
    title: 'Design Discussion',
    description: 'Our team works with you to finalize designs, materials, and specifications for your project.',
  },
  {
    icon: DollarSign,
    step: '03',
    title: 'Project Budgeting',
    description: 'We provide a detailed budget breakdown with transparent pricing and no hidden costs.',
  },
  {
    icon: Hammer,
    step: '04',
    title: 'Execution Phase',
    description: 'Our skilled team executes the project with precision, adhering to timelines and quality standards.',
  },
  {
    icon: CheckCircle,
    step: '05',
    title: 'Final Handover',
    description: 'We deliver the completed project with thorough quality checks and ensure your complete satisfaction.',
  },
];

const teamMembers = [
  {
    name: 'Bajrang Lal Didwania',
    role: 'Founder & Chairman',
    description: 'Decades of industry experience and unwavering dedication. His leadership has been the cornerstone of our company\'s success.',
  },
  {
    name: 'Anirudh Didwania',
    role: 'Head of Purchase and Sales',
    description: 'Expertly manages purchase and sales operations, ensuring top-quality materials for every client.',
  },
  {
    name: 'Nakul Didwania',
    role: 'Director of Marketing & Sales',
    description: 'Leads marketing and sales initiatives, focusing on expanding reach and enhancing our brand.',
  },
  {
    name: 'Rahul Didwania',
    role: 'Business Development',
    description: 'Drives business development, identifying new opportunities and fostering partnerships.',
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative bg-steel-900 py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-steel-900 via-primary-900 to-steel-950" />
        <div className="container-custom relative z-10 text-center">
          <FadeIn>
            <span className="inline-block text-sm font-semibold uppercase tracking-wider text-accent-200 mb-4">
              Who We Are
            </span>
          </FadeIn>
          <SlideUp>
            <h1 className="heading-1 text-white mb-4 font-display">Building a Stronger Tomorrow</h1>
          </SlideUp>
          <SlideUp delay={0.2}>
            <p className="text-lg md:text-xl text-accent-200/80 max-w-2xl mx-auto">
              Precision Engineering for a Better Future
            </p>
          </SlideUp>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <SlideIn direction="left">
              <div>
                <span className="inline-block text-sm font-semibold uppercase tracking-wider text-steel-900 mb-3">
                  Our Story
                </span>
                <h2 className="heading-2 text-primary-900 mb-6 font-display">A New Name, A Stronger Commitment</h2>
                <div className="space-y-4">
                  <p className="text-body">
                    Namadeva Steel Center is now Namdev Infratech to better represent what we do today. What started in 2003 as a simple material supply business has grown into a complete solution provider for interior design, architecture, and construction. From handling 25 tonnes back then to managing 400 tonnes per month now, we've come a long way.
                  </p>
                </div>
              </div>
            </SlideIn>
            <SlideIn direction="right">
              <ParallaxSection offset={20}>
                <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-steel-600 via-steel-800 to-steel-900 shadow-2xl" />
              </ParallaxSection>
            </SlideIn>
          </div>
        </div>
      </section>

      <section className="section-padding bg-accent-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <SlideIn direction="left">
              <ParallaxSection offset={20}>
                <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 shadow-2xl" />
              </ParallaxSection>
            </SlideIn>
            <SlideIn direction="right">
              <div>
                <span className="inline-block text-sm font-semibold uppercase tracking-wider text-steel-900 mb-3">
                  About Us
                </span>
                <h2 className="heading-2 text-primary-900 mb-6 font-display">About Namdev Infratech</h2>
                <div className="space-y-4">
                  <p className="text-body">
                    Founded by Bajrang Lal Didwania in 2003, Namdev Infratech (formerly Namadeva Steel Center) has evolved from a small material supply business into a leading infrastructure and fabrication company. Starting with just 25 tonnes of steel per month, we now manage over 400 tonnes monthly.
                  </p>
                  <p className="text-body">
                    We specialize in custom fabrication, laser cutting, HR plate cutting, structural steel, elevation and facade work, metal partitions, and warehouse construction. Our comprehensive capabilities allow us to serve as a one-stop solution for all steel and infrastructure needs.
                  </p>
                </div>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <SlideUp>
              <div className="text-center p-8 rounded-xl bg-steel-900 text-white">
                <Target className="w-10 h-10 text-accent-200 mx-auto mb-4" />
                <h3 className="text-lg font-semibold font-display mb-3">Our Mission</h3>
                <p className="text-sm text-accent-200/80 leading-relaxed">
                  Delivering high-quality steel products with integrity and innovation.
                </p>
              </div>
            </SlideUp>
            <SlideUp delay={0.1}>
              <div className="text-center p-8 rounded-xl bg-primary-900 text-white">
                <Eye className="w-10 h-10 text-accent-200 mx-auto mb-4" />
                <h3 className="text-lg font-semibold font-display mb-3">Our Vision</h3>
                <p className="text-sm text-accent-200/80 leading-relaxed">
                  To be the world leader in sustainable steel solutions.
                </p>
              </div>
            </SlideUp>
            <SlideUp delay={0.2}>
              <div className="text-center p-8 rounded-xl bg-steel-900 text-white">
                <Heart className="w-10 h-10 text-accent-200 mx-auto mb-4" />
                <h3 className="text-lg font-semibold font-display mb-3">Our Values</h3>
                <p className="text-sm text-accent-200/80 leading-relaxed">
                  Commitment, Excellence, and Innovation.
                </p>
              </div>
            </SlideUp>
          </div>
        </div>
      </section>

      <section className="section-padding bg-accent-50">
        <div className="container-custom">
          <SectionHeader
            label="Our Journey"
            title="Company Milestones"
            subtitle="Key moments that have shaped Namdev Infratech over the years."
          />

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-1/2 transform -translate-x-px top-0 bottom-0 w-0.5 bg-steel-200 hidden md:block" />

            {milestones.map((milestone, index) => (
              <div key={milestone.year} className={cn('relative mb-12 last:mb-0')}>
                <div
                  className={cn(
                    'md:grid md:grid-cols-2 md:gap-8 items-center',
                    index % 2 === 0 ? '' : 'md:[direction:rtl] md:[&>*]:![direction:ltr]'
                  )}
                >
                  <SlideIn direction={index % 2 === 0 ? 'left' : 'right'}>
                    <div className={cn('bg-white rounded-xl p-6 shadow-md border border-accent-200', index % 2 === 0 ? 'md:text-right' : '')}>
                      <span className="inline-block text-2xl font-bold text-steel-900 mb-2 font-display">
                        {milestone.year}
                      </span>
                      <h3 className="text-lg font-semibold text-primary-900 mb-2 font-display">
                        {milestone.title}
                      </h3>
                      <p className="text-sm text-steel-700 leading-relaxed">
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
                    className="w-4 h-4 rounded-full bg-steel-900 border-4 border-white shadow"
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
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border border-accent-200"
                >
                  <div className="w-12 h-12 rounded-lg bg-accent-100 flex items-center justify-center mb-4">
                    <capability.icon className="w-6 h-6 text-steel-900" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary-900 mb-2 font-display">
                    {capability.title}
                  </h3>
                  <p className="text-sm text-steel-700 leading-relaxed">
                    {capability.description}
                  </p>
                </motion.div>
              </SlideUp>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="section-padding bg-accent-50">
        <div className="container-custom">
          <SectionHeader
            label="How We Work"
            title="Our Process"
            subtitle="A streamlined approach to deliver quality results on time and within budget."
          />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {processSteps.map((step, index) => (
              <SlideUp key={step.title} delay={index * 0.1}>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-steel-900 flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-7 h-7 text-accent-200" />
                  </div>
                  <span className="text-xs font-bold text-steel-900 uppercase tracking-wider">Step {step.step}</span>
                  <h3 className="text-base font-semibold text-primary-900 mt-2 mb-2 font-display">
                    {step.title}
                  </h3>
                  <p className="text-sm text-steel-700 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </SlideUp>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            label="Our People"
            title="Leadership Team"
            subtitle="The driving force behind Namdev Infratech's success."
          />

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <SlideUp key={member.name}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border border-accent-200 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-steel-600 to-steel-900 mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-8 h-8 text-accent-200" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary-900 mb-1 font-display">
                    {member.name}
                  </h3>
                  <p className="text-sm font-medium text-steel-900 mb-3">
                    {member.role}
                  </p>
                  <p className="text-sm text-steel-700 leading-relaxed">
                    {member.description}
                  </p>
                </motion.div>
              </SlideUp>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-steel-900 to-primary-900" />
        <div className="container-custom relative z-10 text-center">
          <FadeIn>
            <h2 className="heading-2 text-white mb-6 font-display">Ready to Build Something Great?</h2>
          </FadeIn>
          <SlideUp delay={0.1}>
            <p className="text-lg text-accent-200/80 max-w-2xl mx-auto mb-10">
              Whether you need structural fabrication, custom metalwork, or a complete infrastructure solution, our team is ready to bring your vision to life.
            </p>
          </SlideUp>
          <SlideUp delay={0.2}>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-primary text-lg px-8 py-4">
                Get in Touch
              </Link>
              <Link
                href="/projects"
                className="btn-secondary border-white text-white hover:bg-white hover:text-steel-900 text-lg px-8 py-4"
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
