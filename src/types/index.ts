export type Project = {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  gallery: string[];
  materials: string[];
  client_type: string;
  featured: boolean;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
};

export type Blog = {
  id: string;
  title: string;
  slug: string;
  content: string;
  category: string;
  featured_image: string | null;
  seo_title: string | null;
  seo_description: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type Lead = {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  status: 'new' | 'contacted' | 'converted';
  created_at: string;
};
