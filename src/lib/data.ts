import { query, queryOne } from './db';
import type { Project, Blog } from '@/types';

export type { Project, Blog } from '@/types';

const sampleProjects: Project[] = [
  {
    id: '1',
    title: 'Steel Structure Warehouse',
    slug: 'steel-structure-warehouse',
    description: 'A 50,000 sq ft steel structure warehouse designed for heavy industrial storage. Features reinforced columns, insulated roofing panels, and integrated ventilation systems for optimal climate control. The project was completed in record time while maintaining the highest safety standards.',
    category: 'industrial',
    gallery: [],
    materials: ['Structural Steel', 'Insulated Panels', 'Concrete Foundation'],
    client_type: 'Industrial',
    featured: true,
    seo_title: 'Steel Structure Warehouse Project | Namdev Infratech',
    seo_description: 'A 50,000 sq ft steel structure warehouse with reinforced columns and insulated roofing.',
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
  },
  {
    id: '2',
    title: 'Industrial Plant Fabrication',
    slug: 'industrial-plant-fabrication',
    description: 'Complete fabrication and installation of a chemical processing plant including reactor vessels, piping systems, and structural platforms. Precision engineering ensured all components met strict industry compliance standards.',
    category: 'industrial',
    gallery: [],
    materials: ['Stainless Steel', 'Carbon Steel', 'Industrial Piping'],
    client_type: 'Manufacturing',
    featured: true,
    seo_title: 'Industrial Plant Fabrication | Namdev Infratech',
    seo_description: 'Complete fabrication of chemical processing plant with reactor vessels and piping systems.',
    created_at: '2024-03-20T00:00:00Z',
    updated_at: '2024-03-20T00:00:00Z',
  },
  {
    id: '3',
    title: 'Custom Metal Art Installation',
    slug: 'custom-metal-art-installation',
    description: 'A striking 15-foot metal sculpture commissioned for a corporate headquarters lobby. The piece features flowing abstract forms crafted from brushed stainless steel with integrated LED lighting effects that change throughout the day.',
    category: 'creative',
    gallery: [],
    materials: ['Brushed Stainless Steel', 'LED Systems', 'Bronze Accents'],
    client_type: 'Corporate',
    featured: true,
    seo_title: 'Custom Metal Art Installation | Namdev Infratech',
    seo_description: 'A 15-foot metal sculpture for corporate headquarters with LED lighting effects.',
    created_at: '2024-02-10T00:00:00Z',
    updated_at: '2024-02-10T00:00:00Z',
  },
  {
    id: '4',
    title: 'Commercial Building Steel Framework',
    slug: 'commercial-building-steel-framework',
    description: 'Engineered and fabricated the complete steel framework for a 10-story commercial building. The project required precision bolt connections and seismic-resistant design principles.',
    category: 'industrial',
    gallery: [],
    materials: ['Heavy Structural Steel', 'High-Strength Bolts', 'Welded Connections'],
    client_type: 'Real Estate',
    featured: false,
    seo_title: 'Commercial Building Steel Framework | Namdev Infratech',
    seo_description: 'Complete steel framework for a 10-story commercial building with seismic-resistant design.',
    created_at: '2024-04-05T00:00:00Z',
    updated_at: '2024-04-05T00:00:00Z',
  },
  {
    id: '5',
    title: 'Designer Staircase & Railings',
    slug: 'designer-staircase-railings',
    description: 'Custom-designed spiral staircase with ornamental railings for a luxury residence. Each element was hand-crafted using traditional metalworking techniques combined with modern CNC precision.',
    category: 'creative',
    gallery: [],
    materials: ['Wrought Iron', 'Brass Accents', 'Tempered Glass'],
    client_type: 'Residential',
    featured: false,
    seo_title: 'Designer Staircase & Railings | Namdev Infratech',
    seo_description: 'Custom spiral staircase with ornamental railings for luxury residence.',
    created_at: '2024-05-12T00:00:00Z',
    updated_at: '2024-05-12T00:00:00Z',
  },
  {
    id: '6',
    title: 'Bridge Structural Components',
    slug: 'bridge-structural-components',
    description: 'Fabrication of critical structural components for a highway bridge project including main girders, cross-bracings, and bearing plates. All components were manufactured to strict highway engineering standards.',
    category: 'industrial',
    gallery: [],
    materials: ['Weathering Steel', 'High-Strength Plates', 'Galvanized Fasteners'],
    client_type: 'Government',
    featured: true,
    seo_title: 'Bridge Structural Components | Namdev Infratech',
    seo_description: 'Fabrication of highway bridge structural components including girders and cross-bracings.',
    created_at: '2024-06-18T00:00:00Z',
    updated_at: '2024-06-18T00:00:00Z',
  },
];

const sampleBlogs: Blog[] = [
  {
    id: '1',
    title: 'The Future of Steel Fabrication in Modern Construction',
    slug: 'future-of-steel-fabrication',
    content: '<p>Steel fabrication has undergone a dramatic transformation in recent years. With advancements in CNC technology, robotic welding, and 3D modeling, the industry is moving towards greater precision and efficiency.</p><p>Modern steel fabrication combines traditional craftsmanship with cutting-edge technology. Computer-aided design allows engineers to model complex structures with millimeter accuracy, while automated cutting systems ensure consistent quality across large production runs.</p><p>At Namdev Infratech, we embrace these innovations while maintaining the hands-on expertise that comes from years of experience in the field. Our approach blends the best of both worlds to deliver structures that are both technically excellent and aesthetically appealing.</p>',
    category: 'Industry Insights',
    featured_image: null,
    seo_title: 'The Future of Steel Fabrication | Namdev Infratech Blog',
    seo_description: 'Explore how modern technology is transforming the steel fabrication industry.',
    published: true,
    created_at: '2024-06-01T00:00:00Z',
    updated_at: '2024-06-01T00:00:00Z',
  },
  {
    id: '2',
    title: '5 Key Factors When Choosing an Infrastructure Partner',
    slug: 'choosing-infrastructure-partner',
    content: '<p>Selecting the right infrastructure partner is one of the most important decisions for any construction project. The partner you choose will directly impact quality, timeline, and budget.</p><p>Here are five critical factors to consider: experience in similar projects, quality certifications and compliance records, technology and equipment capabilities, project management methodology, and post-completion support.</p><p>A reliable infrastructure partner should demonstrate a track record of delivering projects on time and within budget while maintaining the highest safety and quality standards.</p>',
    category: 'Tips & Guides',
    featured_image: null,
    seo_title: '5 Key Factors When Choosing an Infrastructure Partner',
    seo_description: 'Essential factors to consider when selecting an infrastructure development partner.',
    published: true,
    created_at: '2024-05-15T00:00:00Z',
    updated_at: '2024-05-15T00:00:00Z',
  },
  {
    id: '3',
    title: 'Sustainable Practices in Metal Fabrication',
    slug: 'sustainable-metal-fabrication',
    content: '<p>Sustainability is no longer optional in the fabrication industry. Clients, regulators, and communities increasingly demand environmentally responsible practices throughout the construction lifecycle.</p><p>Key sustainable practices include recycling metal waste, using energy-efficient equipment, optimizing material usage through precise CNC cutting, and sourcing materials from responsible suppliers. These practices not only reduce environmental impact but often result in cost savings.</p><p>Namdev Infratech is committed to sustainable fabrication practices that protect both our planet and our clients bottom line.</p>',
    category: 'Industry Insights',
    featured_image: null,
    seo_title: 'Sustainable Practices in Metal Fabrication',
    seo_description: 'How the metal fabrication industry is embracing sustainability and green practices.',
    published: true,
    created_at: '2024-04-20T00:00:00Z',
    updated_at: '2024-04-20T00:00:00Z',
  },
  {
    id: '4',
    title: 'Our Latest Industrial Plant Project: A Case Study',
    slug: 'industrial-plant-case-study',
    content: '<p>We recently completed one of our most challenging projects: a complete chemical processing plant fabrication and installation. This case study walks through the challenges, solutions, and outcomes of this landmark project.</p><p>The project involved fabricating over 200 tons of structural steel, installing complex piping systems, and ensuring compliance with stringent chemical industry safety standards. Our team worked in close collaboration with the clients engineering department to deliver a facility that exceeded expectations.</p>',
    category: 'Project Updates',
    featured_image: null,
    seo_title: 'Industrial Plant Case Study | Namdev Infratech',
    seo_description: 'A detailed case study of our chemical processing plant fabrication project.',
    published: true,
    created_at: '2024-03-10T00:00:00Z',
    updated_at: '2024-03-10T00:00:00Z',
  },
  {
    id: '5',
    title: 'Understanding Structural Steel Grades and Applications',
    slug: 'structural-steel-grades',
    content: '<p>Choosing the right steel grade is fundamental to any fabrication project. Different applications require different material properties, and understanding these requirements is essential for project success.</p><p>Common structural steel grades include IS 2062 for general construction, SA 516 for pressure vessels, and SS 304/316 for corrosion-resistant applications. Each grade offers specific advantages in terms of strength, weldability, and durability.</p>',
    category: 'Tips & Guides',
    featured_image: null,
    seo_title: 'Understanding Structural Steel Grades | Namdev Infratech',
    seo_description: 'A guide to structural steel grades and their applications in fabrication.',
    published: true,
    created_at: '2024-02-25T00:00:00Z',
    updated_at: '2024-02-25T00:00:00Z',
  },
  {
    id: '6',
    title: 'Namdev Infratech Expands Creative Design Division',
    slug: 'creative-division-expansion',
    content: '<p>We are excited to announce the expansion of our Creative Design Division. This new chapter allows us to take on more ambitious custom fabrication projects including metal art installations, architectural metalwork, and bespoke furniture.</p><p>The expansion includes new equipment, additional skilled artisans, and a dedicated design studio where clients can collaborate with our creative team to bring their visions to life.</p>',
    category: 'Company News',
    featured_image: null,
    seo_title: 'Creative Design Division Expansion | Namdev Infratech',
    seo_description: 'Namdev Infratech expands its Creative Design Division for custom fabrication projects.',
    published: true,
    created_at: '2024-01-30T00:00:00Z',
    updated_at: '2024-01-30T00:00:00Z',
  },
];

export async function getProjects(category?: string): Promise<Project[]> {
  try {
    let sql = 'SELECT * FROM projects ORDER BY created_at DESC';
    const params: any[] = [];
    if (category && category !== 'all') {
      sql = 'SELECT * FROM projects WHERE category = $1 ORDER BY created_at DESC';
      params.push(category);
    }
    const data = await query<Project>(sql, params);
    if (data && data.length > 0) return data;
  } catch (e) {
    console.error('Error fetching projects:', e);
  }
  if (category && category !== 'all') {
    return sampleProjects.filter(p => p.category === category);
  }
  return sampleProjects;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const data = await queryOne<Project>('SELECT * FROM projects WHERE slug = $1', [slug]);
    if (data) return data;
  } catch (e) {
    console.error('Error fetching project:', e);
  }
  return sampleProjects.find(p => p.slug === slug) || null;
}

export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const data = await query<Project>('SELECT * FROM projects WHERE featured = true ORDER BY created_at DESC LIMIT 3');
    if (data && data.length > 0) return data;
  } catch (e) {
    console.error('Error fetching featured projects:', e);
  }
  return sampleProjects.filter(p => p.featured).slice(0, 3);
}

export async function getBlogs(category?: string): Promise<Blog[]> {
  try {
    let sql = 'SELECT * FROM blogs WHERE published = true ORDER BY created_at DESC';
    const params: any[] = [];
    if (category && category !== 'All') {
      sql = 'SELECT * FROM blogs WHERE published = true AND category = $1 ORDER BY created_at DESC';
      params.push(category);
    }
    const data = await query<Blog>(sql, params);
    if (data && data.length > 0) return data;
  } catch (e) {
    console.error('Error fetching blogs:', e);
  }
  const filtered = category && category !== 'All' ? sampleBlogs.filter(b => b.category === category) : sampleBlogs;
  return filtered;
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  try {
    const data = await queryOne<Blog>('SELECT * FROM blogs WHERE slug = $1', [slug]);
    if (data) return data;
  } catch (e) {
    console.error('Error fetching blog:', e);
  }
  return sampleBlogs.find(b => b.slug === slug) || null;
}

export async function getLatestBlogs(limit: number = 3): Promise<Blog[]> {
  try {
    const data = await query<Blog>('SELECT * FROM blogs WHERE published = true ORDER BY created_at DESC LIMIT $1', [limit]);
    if (data && data.length > 0) return data;
  } catch (e) {
    console.error('Error fetching latest blogs:', e);
  }
  return sampleBlogs.slice(0, limit);
}

export async function submitLead(leadData: { name: string; phone: string; email: string; message: string }): Promise<{ success: boolean; error?: string }> {
  try {
    await queryOne(
      `INSERT INTO leads (name, phone, email, message, status) VALUES ($1, $2, $3, $4, 'new') RETURNING id`,
      [leadData.name, leadData.phone, leadData.email, leadData.message]
    );
    return { success: true };
  } catch (e) {
    console.error('Error submitting lead:', e);
    return { success: false, error: 'Failed to submit. Please try again.' };
  }
}
