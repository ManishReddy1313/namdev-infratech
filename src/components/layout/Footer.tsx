import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, ArrowRight, ChevronRight } from 'lucide-react';

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Products' },
  { href: '/creative-projects', label: 'Services' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const services = [
  'Structural Fabrication',
  'General Fabrication',
  'Elevation/Facade',
  'Metal Partition',
  'Warehouses',
  'Custom Jobs',
];

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="Namdev Infratech"
                width={160}
                height={54}
                className="h-12 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-accent-200 text-sm leading-relaxed">
              Namdev Infratech, founded in 2003, is a trusted hub for construction, architecture, and interior design industries. From structural steel to custom fabrication, we build with precision and reliability.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 font-display">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-accent-200/80 hover:text-accent-200 text-sm flex items-center gap-1.5 transition-colors duration-200 group"
                  >
                    <ChevronRight size={14} className="text-accent-200 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 font-display">
              Services
            </h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-accent-200/80 text-sm flex items-center gap-1.5 group">
                    <ArrowRight size={14} className="text-accent-200" />
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 font-display">
              Contact Info
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-accent-200/80 text-sm">
                <MapPin size={16} className="text-accent-200 mt-0.5 shrink-0" />
                <span>123 Industrial Area, Sector 5, Mumbai, Maharashtra 400001</span>
              </li>
              <li>
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-3 text-accent-200/80 hover:text-accent-200 text-sm transition-colors duration-200"
                >
                  <Phone size={16} className="text-accent-200 shrink-0" />
                  +91 98765 43210
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@namdevinfratech.com"
                  className="flex items-center gap-3 text-accent-200/80 hover:text-accent-200 text-sm transition-colors duration-200"
                >
                  <Mail size={16} className="text-accent-200 shrink-0" />
                  info@namdevinfratech.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-800">
        <div className="container-custom py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-accent-200/60 text-sm">
            © 2025 Namdev Infratech. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {['Facebook', 'Twitter', 'LinkedIn', 'Instagram'].map((social) => (
              <a
                key={social}
                href="#"
                className="w-8 h-8 rounded-full bg-primary-800 hover:bg-accent-200 flex items-center justify-center text-accent-200/60 hover:text-primary-900 text-xs font-medium transition-all duration-200"
                aria-label={social}
              >
                {social[0]}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
