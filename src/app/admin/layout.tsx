'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  FolderOpen,
  FileText,
  Users,
  Package,
  PenSquare,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/projects', label: 'Projects', icon: FolderOpen },
  { href: '/admin/blogs', label: 'Blog Posts', icon: FileText },
  { href: '/admin/leads', label: 'Leads', icon: Users },
  { href: '/admin/site-content', label: 'Site Content', icon: PenSquare },
];

const pageTitles: Record<string, string> = {
  '/admin/dashboard': 'Dashboard',
  '/admin/products': 'Products',
  '/admin/products/new': 'New Product',
  '/admin/projects': 'Projects',
  '/admin/projects/new': 'New Project',
  '/admin/blogs': 'Blog Posts',
  '/admin/blogs/new': 'New Blog Post',
  '/admin/leads': 'Leads',
  '/admin/site-content': 'Site Content',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        if (!res.ok || !data.user) {
          router.push('/admin/login');
          return;
        }
        setIsAuthenticated(true);
        setUserName(data.user.username || '');
      } catch {
        router.push('/admin/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-steel-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-accent-200 border-t-transparent rounded-full animate-spin" />
          <p className="text-steel-300 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const handleSignOut = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const currentTitle = pageTitles[pathname] || 'Admin';

  return (
    <div className="min-h-screen bg-steel-50">
      <aside className="hidden lg:flex fixed inset-y-0 left-0 z-50 w-64 flex-col bg-steel-900">
        <div className="p-6 border-b border-steel-800">
          <Image src="/logo.png" alt="Namdev Infratech" width={140} height={48} className="brightness-0 invert" />
          <p className="text-steel-400 text-xs mt-1">Admin Panel</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all',
                  isActive
                    ? 'bg-steel-800 text-accent-200'
                    : 'text-steel-300 hover:bg-steel-800 hover:text-accent-200'
                )}
              >
                <link.icon className="w-5 h-5" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-steel-800">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-steel-300 hover:bg-steel-800 hover:text-accent-200 transition-all w-full"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-steel-900 px-4 py-3 flex items-center justify-between">
        <Image src="/logo.png" alt="Namdev Infratech" width={120} height={40} className="brightness-0 invert" />
        <button
          onClick={() => setSidebarOpen(true)}
          className="text-white p-2"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 z-50 bg-black/50"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed inset-y-0 left-0 z-50 w-72 flex flex-col bg-steel-900"
            >
              <div className="p-6 border-b border-steel-800 flex items-center justify-between">
                <div>
                  <Image src="/logo.png" alt="Namdev Infratech" width={140} height={48} className="brightness-0 invert" />
                  <p className="text-steel-400 text-xs mt-1">Admin Panel</p>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="text-steel-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 p-4 space-y-1">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setSidebarOpen(false)}
                      className={cn(
                        'flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all',
                        isActive
                          ? 'bg-steel-800 text-accent-200'
                          : 'text-steel-300 hover:bg-steel-800 hover:text-accent-200'
                      )}
                    >
                      <link.icon className="w-5 h-5" />
                      {link.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-steel-800">
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-steel-300 hover:bg-steel-800 hover:text-accent-200 transition-all w-full"
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <main className="lg:ml-64 min-h-screen pt-14 lg:pt-0">
        <div className="bg-white border-b border-steel-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold font-display text-primary-900">{currentTitle}</h2>
          <div className="flex items-center gap-3">
            <span className="text-sm text-primary-500 hidden sm:block">{userName}</span>
            <div className="w-8 h-8 bg-steel-900 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {userName.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        </div>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
