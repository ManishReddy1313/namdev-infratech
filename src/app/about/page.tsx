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
  Users,
  Target,
  Eye,
  Heart,
} from 'lucide-react';

const milestones = [
  {
    year: '2003',
    title: 'The Foundation',
    description: 'Bajrang Lal Didwania launched Namadeva Steel Center as a focused steel supply operation, initially handling 25 tonnes of material per month for local construction projects.',
  },
  {
    year: '2008',
    title: 'Scaling Operations',
    description: 'Monthly throughput surpassed 100 tonnes as the company expanded its client base across construction, architecture, and interior design sectors.',
  },
  {
    year: '2013',
    title: 'Fabrication Capabilities Added',
    description: 'Recognizing client demand for turnkey solutions, we established in-house fabrication facilities for structural work, gates, railings, and custom metalwork.',
  },
  {
    year: '2018',
    title: 'Technology Investment',
    description: 'Commissioned CNC laser cutting, HR plate processing, and precision bending equipment — enabling us to serve industrial and architectural clients with exacting tolerances.',
  },
  {
    year: '2023',
    title: 'Namdev Infratech Is Born',
    description: 'The rebrand reflects our evolution from a steel supplier into a comprehensive infrastructure partner — now processing 400+ tonnes monthly across 19 product categories and 6 service verticals.',
  },
];

const teamMembers = [
  {
    name: 'Bajrang Lal Didwania',
    role: 'Founder & Chairman',
    initials: 'BD',
    description: 'The architect of Namdev Infratech\'s journey. With deep industry knowledge built over two decades, he continues to guide the company\'s strategic direction and commitment to quality.',
  },
  {
    name: 'Anirudh Didwania',
    role: 'Head of Purchase & Sales',
    initials: 'AD',
    description: 'Manages end-to-end procurement and client relationships. His supplier network and material expertise ensure clients receive the right products at competitive pricing.',
  },
  {
    name: 'Nakul Didwania',
    role: 'Director of Marketing & Sales',
    initials: 'ND',
    description: 'Drives brand growth and market expansion through data-informed strategies. His focus on digital presence and client engagement has widened the company\'s reach significantly.',
  },
  {
    name: 'Rahul Didwania',
    role: 'Business Development',
    initials: 'RD',
    description: 'Identifies emerging market opportunities and builds strategic partnerships. His forward-thinking approach ensures Namdev Infratech stays ahead of industry trends.',
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
              About Us
            </span>
          </FadeIn>
          <SlideUp>
            <h1 className="heading-1 text-white mb-4 font-display">Two Decades of Steel. One Trusted Name.</h1>
          </SlideUp>
          <SlideUp delay={0.2}>
            <p className="text-lg md:text-xl text-accent-200/80 max-w-2xl mx-auto">
              From a 25-tonne steel supply operation in 2003 to a 400+ tonne infrastructure solutions company today — our growth is built on trust, quality, and relationships.
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
                <h2 className="heading-2 text-primary-900 mb-6 font-display">Built on Relationships, Scaled Through Excellence</h2>
                <div className="space-y-4">
                  <p className="text-body">
                    When Bajrang Lal Didwania founded Namadeva Steel Center in 2003, the goal was straightforward: supply reliable structural steel to local builders and contractors. What set us apart from day one was not just the quality of our materials, but our willingness to understand each client&apos;s project and recommend the right solutions.
                  </p>
                  <p className="text-body">
                    That approach earned trust. And trust brought growth. Over two decades, we expanded from basic material supply into a full-service infrastructure company offering fabrication, laser cutting, facade engineering, and warehouse construction. Today, as Namdev Infratech, we process over 400 tonnes of steel every month and serve clients across construction, architecture, and industrial sectors.
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <SlideUp>
              <div className="text-center p-8 rounded-xl bg-steel-900 text-white">
                <Target className="w-10 h-10 text-accent-200 mx-auto mb-4" />
                <h3 className="text-lg font-semibold font-display mb-3">Our Mission</h3>
                <p className="text-sm text-accent-200/80 leading-relaxed">
                  To deliver the right material, right service, and right execution for every project — eliminating the gap between what clients need and what the market offers.
                </p>
              </div>
            </SlideUp>
            <SlideUp delay={0.1}>
              <div className="text-center p-8 rounded-xl bg-primary-900 text-white">
                <Eye className="w-10 h-10 text-accent-200 mx-auto mb-4" />
                <h3 className="text-lg font-semibold font-display mb-3">Our Vision</h3>
                <p className="text-sm text-accent-200/80 leading-relaxed">
                  To become India&apos;s most trusted single-source partner for structural steel products and infrastructure fabrication services.
                </p>
              </div>
            </SlideUp>
            <SlideUp delay={0.2}>
              <div className="text-center p-8 rounded-xl bg-steel-900 text-white">
                <Heart className="w-10 h-10 text-accent-200 mx-auto mb-4" />
                <h3 className="text-lg font-semibold font-display mb-3">Our Values</h3>
                <p className="text-sm text-accent-200/80 leading-relaxed">
                  Transparency in pricing. Precision in execution. Reliability in delivery. Every client interaction is guided by these three principles.
                </p>
              </div>
            </SlideUp>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            label="Our Journey"
            title="Key Milestones"
            subtitle="The moments that defined our path from a steel supplier to a complete infrastructure solutions company."
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

      <section className="section-padding bg-accent-50">
        <div className="container-custom">
          <SectionHeader
            label="Our People"
            title="The Team Behind Namdev Infratech"
            subtitle="A family-driven leadership team with deep industry knowledge and a shared commitment to client success."
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
                    <span className="text-lg font-bold text-accent-200 font-display">{member.initials}</span>
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
            <h2 className="heading-2 text-white mb-6 font-display">Let&apos;s Build Something Together</h2>
          </FadeIn>
          <SlideUp delay={0.1}>
            <p className="text-lg text-accent-200/80 max-w-2xl mx-auto mb-10">
              Whether you need structural steel for a new warehouse, custom fabrication for an architectural project, or a reliable long-term supply partner — we&apos;re ready.
            </p>
          </SlideUp>
          <SlideUp delay={0.2}>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-primary text-lg px-8 py-4">
                Get in Touch
              </Link>
              <Link
                href="/products"
                className="btn-secondary border-white text-white hover:bg-white hover:text-steel-900 text-lg px-8 py-4"
              >
                Browse Products
              </Link>
            </div>
          </SlideUp>
        </div>
      </section>
    </>
  );
}
