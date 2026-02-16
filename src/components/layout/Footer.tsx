import Link from 'next/link';
import { Phone, Mail, MapPin, ArrowRight, ChevronRight } from 'lucide-react';

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/creative-projects', label: 'Creative Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const services = [
  'Industrial Fabrication',
  'Steel Structures',
  'Custom Designs',
  'Infrastructure Projects',
  'Renovation Works',
];

export default function Footer() {
  return (
    <footer className="bg-primary-950 text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-1">
              <span className="text-2xl font-bold tracking-tight">NAMDEV</span>
              <span className="text-2xl font-light text-primary-400 tracking-tight">
                INFRATECH
              </span>
            </Link>
            <p className="text-primary-400 text-sm leading-relaxed">
              Delivering excellence in infrastructure development and fabrication services.
              We build with precision, innovation, and an unwavering commitment to quality.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-primary-400 hover:text-accent-400 text-sm flex items-center gap-1.5 transition-colors duration-200 group"
                  >
                    <ChevronRight size={14} className="text-accent-500 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Services
            </h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-primary-400 text-sm flex items-center gap-1.5 group">
                    <ArrowRight size={14} className="text-accent-500" />
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Contact Info
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-primary-400 text-sm">
                <MapPin size={16} className="text-accent-500 mt-0.5 shrink-0" />
                <span>123 Industrial Area, Sector 5, Mumbai, Maharashtra 400001</span>
              </li>
              <li>
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-3 text-primary-400 hover:text-accent-400 text-sm transition-colors duration-200"
                >
                  <Phone size={16} className="text-accent-500 shrink-0" />
                  +91 98765 43210
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@namdevinfratch.com"
                  className="flex items-center gap-3 text-primary-400 hover:text-accent-400 text-sm transition-colors duration-200"
                >
                  <Mail size={16} className="text-accent-500 shrink-0" />
                  info@namdevinfratch.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-800">
        <div className="container-custom py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-primary-500 text-sm">
            © 2024 Namdev Infratech. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {['Facebook', 'Twitter', 'LinkedIn', 'Instagram'].map((social) => (
              <a
                key={social}
                href="#"
                className="w-8 h-8 rounded-full bg-primary-800 hover:bg-accent-500 flex items-center justify-center text-primary-400 hover:text-white text-xs font-medium transition-all duration-200"
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
