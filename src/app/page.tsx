import { query } from '@/lib/db';
import HeroSlider from '@/components/home/HeroSlider';
import CompanyPositioning from '@/components/home/CompanyPositioning';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import CreativeHighlight from '@/components/home/CreativeHighlight';
import ProcessSection from '@/components/home/ProcessSection';
import CredibilitySection from '@/components/home/CredibilitySection';
import ProductsShowcase from '@/components/home/ProductsShowcase';
import LatestBlogs from '@/components/home/LatestBlogs';
import ContactCTA from '@/components/home/ContactCTA';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Namdev Infratech',
  description: 'Leading supplier of structural steel products, roofing solutions, and custom fabrication services in India. Serving architects, builders, and contractors since 2003.',
  url: 'https://namdevinfratech.com',
  logo: 'https://namdevinfratech.com/logo.png',
  foundingDate: '2003',
  founder: { '@type': 'Person', name: 'Bajrang Lal Didwania' },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    availableLanguage: ['English', 'Hindi'],
  },
  sameAs: [],
};

export default async function HomePage() {
  let contentMap: Record<string, any> = {};
  try {
    const rows = await query('SELECT section_key, content FROM site_content');
    for (const row of rows) {
      contentMap[(row as any).section_key] = (row as any).content;
    }
  } catch (e) {}

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSlider content={contentMap.hero_slides} />
      <CompanyPositioning content={contentMap.company_positioning} />
      <FeaturedProjects content={contentMap.featured_projects} />
      <CreativeHighlight content={contentMap.services} />
      <ProcessSection content={contentMap.process} />
      <CredibilitySection content={contentMap.credibility} />
      <ProductsShowcase content={contentMap.products_showcase} />
      <LatestBlogs content={contentMap.latest_blogs} />
      <ContactCTA content={contentMap.contact_cta} />
    </>
  );
}
