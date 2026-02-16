'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FolderOpen,
  FileText,
  Users,
  TrendingUp,
  Plus,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const stats = [
  {
    label: 'Total Projects',
    value: 0,
    icon: FolderOpen,
    bg: 'bg-blue-50',
    iconColor: 'text-blue-500',
  },
  {
    label: 'Total Blog Posts',
    value: 0,
    icon: FileText,
    bg: 'bg-green-50',
    iconColor: 'text-green-500',
  },
  {
    label: 'Total Leads',
    value: 0,
    icon: Users,
    bg: 'bg-purple-50',
    iconColor: 'text-purple-500',
  },
  {
    label: 'New Leads',
    value: 0,
    icon: TrendingUp,
    bg: 'bg-steel-50',
    iconColor: 'text-steel-900',
  },
];

const quickActions = [
  {
    label: 'Add New Project',
    href: '/admin/projects/new',
    icon: Plus,
    bg: 'bg-steel-900 hover:bg-steel-800',
  },
  {
    label: 'Write Blog Post',
    href: '/admin/blogs/new',
    icon: Plus,
    bg: 'bg-primary-900 hover:bg-primary-800',
  },
  {
    label: 'View Leads',
    href: '/admin/leads',
    icon: Users,
    bg: 'bg-steel-700 hover:bg-steel-800',
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-display text-primary-900">Welcome back!</h1>
        <p className="text-primary-500 mt-1">
          Here&apos;s an overview of your website content.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white rounded-xl border border-steel-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-primary-500">{stat.label}</p>
                <p className="text-3xl font-bold text-primary-900 mt-1">
                  {stat.value}
                </p>
              </div>
              <div className={cn('w-12 h-12 rounded-lg flex items-center justify-center', stat.bg)}>
                <stat.icon className={cn('w-6 h-6', stat.iconColor)} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div>
        <h3 className="text-sm font-semibold font-display text-primary-700 uppercase tracking-wider mb-3">
          Quick Actions
        </h3>
        <div className="flex flex-wrap gap-3">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className={cn(
                'inline-flex items-center gap-2 px-4 py-2.5 rounded-pill text-sm font-medium text-white transition-colors',
                action.bg
              )}
            >
              <action.icon className="w-4 h-4" />
              {action.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="bg-white rounded-xl border border-steel-200 p-6"
        >
          <h3 className="text-lg font-semibold font-display text-primary-900 mb-4">
            Recent Leads
          </h3>
          <div className="text-center py-8">
            <Users className="w-12 h-12 text-primary-200 mx-auto mb-3" />
            <p className="text-primary-400 text-sm">No leads yet</p>
            <p className="text-primary-300 text-xs mt-1">
              Leads from your contact form will appear here
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="bg-white rounded-xl border border-steel-200 p-6"
        >
          <h3 className="text-lg font-semibold font-display text-primary-900 mb-4">
            Recent Projects
          </h3>
          <div className="text-center py-8">
            <FolderOpen className="w-12 h-12 text-primary-200 mx-auto mb-3" />
            <p className="text-primary-400 text-sm">No projects yet</p>
            <p className="text-primary-300 text-xs mt-1">
              Add your first project to get started
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
