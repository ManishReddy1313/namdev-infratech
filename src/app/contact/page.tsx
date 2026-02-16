'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import {
  FadeIn,
  SlideUp,
  SlideIn,
} from '@/components/ui/AnimationWrappers';
import { cn } from '@/lib/utils';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
} from 'lucide-react';
import { submitLead } from '@/lib/data';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .regex(/^[+]?[\d\s-]+$/, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactInfo = [
  {
    icon: MapPin,
    label: 'Address',
    value: 'Plot No. 45, Industrial Area,\nPune, Maharashtra 411057',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 99999 99999',
    href: 'tel:+919999999999',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'info@namdevinfratech.com',
    href: 'mailto:info@namdevinfratech.com',
  },
  {
    icon: Clock,
    label: 'Working Hours',
    value: 'Mon – Sat: 9:00 AM – 6:00 PM\nSunday: Closed',
  },
];

export default function ContactPage() {
  const searchParams = useSearchParams();
  const projectName = searchParams.get('project');
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      message: projectName ? `I am interested in learning more about: ${projectName}` : '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const result = await submitLead(data);
      if (result.success) {
        setSubmitStatus('success');
        reset();
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    }
  };

  return (
    <>
      <section className="relative bg-steel-900 py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-steel-900 via-primary-900 to-steel-950" />
        <div className="container-custom relative z-10 text-center">
          <FadeIn>
            <span className="inline-block text-sm font-semibold uppercase tracking-wider text-accent-200 mb-4">
              Contact Us
            </span>
          </FadeIn>
          <SlideUp>
            <h1 className="heading-1 text-white mb-4 font-display">Get in Touch</h1>
          </SlideUp>
          <SlideUp delay={0.2}>
            <p className="text-lg md:text-xl text-accent-200/80 max-w-2xl mx-auto">
              Have a project in mind? We'd love to hear from you. Reach out to us and let's build something remarkable together.
            </p>
          </SlideUp>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            <div className="lg:col-span-3">
              <SlideIn direction="left">
                <h2 className="heading-3 text-primary-900 mb-8 font-display">Send Us a Message</h2>

                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-green-800">Message Sent Successfully!</p>
                      <p className="text-sm text-green-700">
                        Thank you for reaching out. Our team will get back to you within 24 hours.
                      </p>
                    </div>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3"
                  >
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-red-800">Something went wrong</p>
                      <p className="text-sm text-red-700">
                        Please try again or contact us directly via phone or email.
                      </p>
                    </div>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-steel-700 mb-2">
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      {...register('name')}
                      className={cn(
                        'w-full px-4 py-3 rounded-lg border bg-white text-primary-900 placeholder-steel-400 focus:outline-none focus:ring-2 focus:ring-steel-900 transition-all',
                        errors.name ? 'border-red-400' : 'border-accent-200'
                      )}
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-steel-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        {...register('phone')}
                        className={cn(
                          'w-full px-4 py-3 rounded-lg border bg-white text-primary-900 placeholder-steel-400 focus:outline-none focus:ring-2 focus:ring-steel-900 transition-all',
                          errors.phone ? 'border-red-400' : 'border-accent-200'
                        )}
                        placeholder="+91 99999 99999"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-steel-700 mb-2">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        {...register('email')}
                        className={cn(
                          'w-full px-4 py-3 rounded-lg border bg-white text-primary-900 placeholder-steel-400 focus:outline-none focus:ring-2 focus:ring-steel-900 transition-all',
                          errors.email ? 'border-red-400' : 'border-accent-200'
                        )}
                        placeholder="you@example.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-steel-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      {...register('message')}
                      className={cn(
                        'w-full px-4 py-3 rounded-lg border bg-white text-primary-900 placeholder-steel-400 focus:outline-none focus:ring-2 focus:ring-steel-900 transition-all resize-none',
                        errors.message ? 'border-red-400' : 'border-accent-200'
                      )}
                      placeholder="Tell us about your project..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      'btn-primary w-full md:w-auto gap-2',
                      isSubmitting && 'opacity-70 cursor-not-allowed'
                    )}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-steel-900/30 border-t-steel-900 rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </SlideIn>
            </div>

            <div className="lg:col-span-2">
              <SlideIn direction="right">
                <div className="bg-accent-50 rounded-xl p-6 md:p-8 sticky top-24">
                  <h3 className="text-lg font-semibold text-primary-900 mb-6 font-display">Contact Information</h3>

                  <div className="space-y-6">
                    {contactInfo.map((info) => (
                      <div key={info.label} className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-accent-200 flex items-center justify-center flex-shrink-0">
                          <info.icon className="w-5 h-5 text-steel-900" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-steel-600 mb-1">{info.label}</p>
                          {info.href ? (
                            <a
                              href={info.href}
                              className="text-primary-900 font-medium hover:text-steel-900 transition-colors whitespace-pre-line"
                            >
                              {info.value}
                            </a>
                          ) : (
                            <p className="text-primary-900 font-medium whitespace-pre-line">
                              {info.value}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-accent-200">
                    <a
                      href="https://wa.me/919999999999"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-[#25D366] text-white font-semibold rounded-pill hover:bg-[#20BD5A] transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>
              </SlideIn>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="container-custom">
          <FadeIn>
            <div className="w-full aspect-[16/6] rounded-xl bg-gradient-to-br from-accent-200 via-steel-200 to-accent-300 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-steel-400 mx-auto mb-3" />
                <p className="text-steel-700 font-medium font-display">Map Integration Coming Soon</p>
                <p className="text-sm text-steel-500 mt-1">
                  Plot No. 45, Industrial Area, Pune, Maharashtra 411057
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
