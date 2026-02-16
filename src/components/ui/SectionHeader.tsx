'use client';

import { cn } from '@/lib/utils';
import { FadeIn } from './AnimationWrappers';

interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
  className?: string;
}

export default function SectionHeader({
  label,
  title,
  subtitle,
  align = 'center',
  className,
}: SectionHeaderProps) {
  return (
    <FadeIn
      className={cn(
        'mb-12 md:mb-16',
        align === 'center' && 'text-center',
        className
      )}
    >
      {label && (
        <span className="inline-block text-sm font-semibold uppercase tracking-wider text-accent-500 mb-3">
          {label}
        </span>
      )}
      <h2 className="heading-2">{title}</h2>
      {subtitle && <p className="text-body mt-4 max-w-2xl mx-auto">{subtitle}</p>}
    </FadeIn>
  );
}
