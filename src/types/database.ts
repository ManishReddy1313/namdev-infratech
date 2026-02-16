export interface Database {
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
        Insert: {
          id?: string;
          title: string;
          slug: string;
          description: string;
          category: 'industrial' | 'creative';
          gallery: string[];
          materials: string[];
          client_type: string;
          featured: boolean;
          seo_title?: string | null;
          seo_description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          description?: string;
          category?: 'industrial' | 'creative';
          gallery?: string[];
          materials?: string[];
          client_type?: string;
          featured?: boolean;
          seo_title?: string | null;
          seo_description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
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
        Insert: {
          id?: string;
          title: string;
          slug: string;
          content: string;
          category: string;
          featured_image?: string | null;
          seo_title?: string | null;
          seo_description?: string | null;
          published: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          content?: string;
          category?: string;
          featured_image?: string | null;
          seo_title?: string | null;
          seo_description?: string | null;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
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
        Insert: {
          id?: string;
          name: string;
          phone: string;
          email: string;
          message: string;
          status?: 'new' | 'contacted' | 'converted';
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          phone?: string;
          email?: string;
          message?: string;
          status?: 'new' | 'contacted' | 'converted';
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

export type Project = Database['public']['Tables']['projects']['Row'];
export type Blog = Database['public']['Tables']['blogs']['Row'];
export type Lead = Database['public']['Tables']['leads']['Row'];
