import HeroSlider from '@/components/home/HeroSlider';
import CompanyPositioning from '@/components/home/CompanyPositioning';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import CreativeHighlight from '@/components/home/CreativeHighlight';
import ProcessSection from '@/components/home/ProcessSection';
import CredibilitySection from '@/components/home/CredibilitySection';
import LatestBlogs from '@/components/home/LatestBlogs';
import ContactCTA from '@/components/home/ContactCTA';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Namdev Infratech',
  description:
    'Infrastructure development and fabrication excellence. From industrial projects to creative installations.',
  url: 'https://namdevinfratech.com',
  logo: 'https://namdevinfratech.com/logo.png',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
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
      <LatestBlogs />
      <ContactCTA />
    </>
  );
}
