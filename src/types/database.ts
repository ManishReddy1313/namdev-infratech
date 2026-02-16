export type Database = {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string;
          category: 'industrial' | 'creative';
          gallery: string[];
          materials: string[];
          client_type: string;
          featured: boolean;
          seo_title: string | null;
          seo_description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['projects']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['projects']['Insert']>;
      };
      blogs: {
        Row: {
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
        Insert: Omit<Database['public']['Tables']['blogs']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['blogs']['Insert']>;
      };
      leads: {
        Row: {
          id: string;
          name: string;
          phone: string;
          email: string;
          message: string;
          status: 'new' | 'contacted' | 'converted';
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['leads']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['leads']['Insert']>;
      };
    };
  };
};

export type Project = Database['public']['Tables']['projects']['Row'];
export type Blog = Database['public']['Tables']['blogs']['Row'];
export type Lead = Database['public']['Tables']['leads']['Row'];
