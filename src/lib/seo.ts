import type { Project, Blog } from '@/types/database';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://namdevinfratech.com';
const COMPANY_NAME = 'Namdev Infratech';

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: COMPANY_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: 'Leading infrastructure and fabrication company specializing in industrial projects, steel structures, and creative custom designs.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'India',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-9999999999',
      contactType: 'customer service',
    },
    sameAs: [],
  };
}

export function getProjectSchema(project: Project) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.seo_description || project.description,
    url: `${SITE_URL}/projects/${project.slug}`,
    image: project.gallery?.[0] || undefined,
    dateCreated: project.created_at,
    creator: {
      '@type': 'Organization',
      name: COMPANY_NAME,
    },
    material: project.materials?.join(', '),
    genre: project.category === 'industrial' ? 'Industrial Fabrication' : 'Creative Custom Design',
  };
}

export function getBlogSchema(blog: Blog) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.seo_title || blog.title,
    description: blog.seo_description || blog.content?.substring(0, 160),
    url: `${SITE_URL}/blog/${blog.slug}`,
    image: blog.featured_image || undefined,
    datePublished: blog.created_at,
    dateModified: blog.updated_at,
    author: {
      '@type': 'Organization',
      name: COMPANY_NAME,
    },
    publisher: {
      '@type': 'Organization',
      name: COMPANY_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${blog.slug}`,
    },
  };
}

export function getWebPageSchema(title: string, description: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: `${SITE_URL}${path}`,
    isPartOf: {
      '@type': 'WebSite',
      name: COMPANY_NAME,
      url: SITE_URL,
    },
  };
}
