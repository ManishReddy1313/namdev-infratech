'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/creative-projects', label: 'Creative Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out',
        scrolled ? 'px-4 md:px-8 lg:px-16 pt-3' : 'px-0 pt-0'
      )}
    >
      <nav
        className={cn(
          'transition-all duration-500 ease-in-out',
          scrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-lg shadow-black/5 rounded-2xl border border-white/20'
            : 'bg-transparent'
        )}
      >
        <div className={cn(
          'transition-all duration-500',
          scrolled ? 'px-4 md:px-6 lg:px-8' : 'container-custom'
        )}>
          <div className={cn(
            'flex items-center justify-between transition-all duration-500',
            scrolled ? 'h-14 md:h-16' : 'h-20 md:h-24'
          )}>
            <Link href="/" className="flex items-center shrink-0">
              <Image
                src="/logo.png"
                alt="Namdev Infratech"
                width={180}
                height={107}
                priority
                className={cn(
                  'w-auto transition-all duration-500',
                  scrolled ? 'h-8 md:h-9' : 'h-10 md:h-12 brightness-0 invert'
                )}
              />
            </Link>

            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-[15px] font-medium transition-all duration-300 relative py-1',
                    pathname === link.href
                      ? scrolled ? 'text-steel-900' : 'text-white'
                      : scrolled
                        ? 'text-steel-900/70 hover:text-steel-900'
                        : 'text-white/75 hover:text-white'
                  )}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.span
                      layoutId="navbar-indicator"
                      className={cn(
                        'absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full',
                        scrolled ? 'bg-steel-900' : 'bg-accent-200'
                      )}
                    />
                  )}
                </Link>
              ))}
            </div>

            <div className="hidden lg:block">
              <Link
                href="/contact"
                className={cn(
                  'px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300',
                  scrolled
                    ? 'bg-steel-900 text-white hover:bg-steel-800'
                    : 'bg-accent-200 text-steel-900 hover:bg-white'
                )}
              >
                Get in Touch
              </Link>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                'lg:hidden p-2 transition-colors duration-300',
                scrolled ? 'text-steel-900' : 'text-white'
              )}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-steel-900 z-50 shadow-2xl lg:hidden"
            >
              <div className="flex items-center justify-between p-5 border-b border-white/10">
                <Link href="/" className="flex items-center">
                  <Image
                    src="/logo.png"
                    alt="Namdev Infratech"
                    width={140}
                    height={83}
                    className="h-8 w-auto brightness-0 invert"
                  />
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-white/80 hover:text-white transition-colors"
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="flex flex-col p-5 gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'px-4 py-3.5 rounded-xl text-[15px] font-medium transition-all duration-200',
                      pathname === link.href
                        ? 'bg-white/10 text-accent-200'
                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-6 pt-5 border-t border-white/10">
                  <Link href="/contact" className="block w-full text-center px-6 py-3 rounded-full bg-accent-200 text-steel-900 font-semibold text-sm hover:bg-white transition-colors">
                    Get in Touch
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
