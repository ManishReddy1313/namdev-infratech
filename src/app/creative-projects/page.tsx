import { query } from '@/lib/db';
import CreativeProjectsClient from './CreativeProjectsClient';

export const metadata = {
  title: 'Creative Custom Projects | Namdev Infratech',
  description: 'Explore our creative metalwork portfolio — custom pergolas, designer furniture, decorative gates, railings, and bespoke fabrication projects across Bangalore.',
};

export const dynamic = 'force-dynamic';

async function getCreativeProjects() {
  const rows = await query(
    `SELECT id, title, slug, description, category, gallery, materials, client_type, created_at
     FROM projects
     WHERE category ILIKE '%creative%'
     ORDER BY created_at DESC`
  );
  return rows.map((row: any) => ({
    ...row,
    gallery: Array.isArray(row.gallery) ? row.gallery : (typeof row.gallery === 'string' ? row.gallery.replace(/[{}]/g, '').split(',').filter(Boolean) : []),
  }));
}

export default async function CreativeProjectsPage() {
  const projects = await getCreativeProjects();
  return <CreativeProjectsClient projects={projects} />;
}
