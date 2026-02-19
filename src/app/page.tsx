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

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSlider />
      <CompanyPositioning />
      <FeaturedProjects />
      <CreativeHighlight />
      <ProcessSection />
      <CredibilitySection />
      <ProductsShowcase />
      <LatestBlogs />
      <ContactCTA />
    </>
  );
}
