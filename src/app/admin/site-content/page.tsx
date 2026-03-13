'use client';

import { useState, useEffect } from 'react';
import { Loader2, Save, CheckCircle } from 'lucide-react';

type SectionConfig = {
  key: string;
  title: string;
  fields: FieldConfig[];
};

type SubFieldConfig = { type: 'text' | 'textarea' | 'number'; name: string; label: string; wide?: boolean; hint?: string };

type FieldConfig =
  | { type: 'text'; name: string; label: string }
  | { type: 'textarea'; name: string; label: string }
  | { type: 'number'; name: string; label: string }
  | { type: 'array'; name: string; label: string; fields: SubFieldConfig[]; count: number };

const sections: SectionConfig[] = [
  {
    key: 'hero_slides',
    title: 'Hero Slides',
    fields: [
      {
        type: 'array',
        name: 'slides',
        label: 'Slides',
        count: 3,
        fields: [
          { type: 'text', name: 'title', label: 'Title' },
          { type: 'text', name: 'subtitle', label: 'Subtitle' },
          { type: 'text', name: 'image', label: 'Background Image Path', hint: 'e.g. /uploads/projects/namdev-warehouse-1.jpg', wide: true },
        ],
      },
    ],
  },
  {
    key: 'company_positioning',
    title: 'Company Positioning',
    fields: [
      { type: 'text', name: 'label', label: 'Label' },
      { type: 'text', name: 'heading', label: 'Heading' },
      { type: 'textarea', name: 'description', label: 'Description' },
      { type: 'textarea', name: 'description2', label: 'Description 2' },
      {
        type: 'array',
        name: 'stats',
        label: 'Stats',
        count: 4,
        fields: [
          { type: 'number', name: 'value', label: 'Value' },
          { type: 'text', name: 'suffix', label: 'Suffix' },
          { type: 'text', name: 'label', label: 'Label' },
        ],
      },
    ],
  },
  {
    key: 'featured_projects',
    title: 'Featured Projects',
    fields: [
      { type: 'text', name: 'label', label: 'Label' },
      { type: 'text', name: 'heading', label: 'Heading' },
      { type: 'text', name: 'subtitle', label: 'Subtitle' },
    ],
  },
  {
    key: 'services',
    title: 'Services',
    fields: [
      { type: 'text', name: 'label', label: 'Label' },
      { type: 'text', name: 'heading', label: 'Heading' },
      { type: 'textarea', name: 'description', label: 'Description' },
      {
        type: 'array',
        name: 'items',
        label: 'Service Items',
        count: 6,
        fields: [
          { type: 'text', name: 'title', label: 'Title' },
          { type: 'text', name: 'description', label: 'Description' },
        ],
      },
    ],
  },
  {
    key: 'process',
    title: 'Process Steps',
    fields: [
      { type: 'text', name: 'label', label: 'Label' },
      { type: 'text', name: 'heading', label: 'Heading' },
      { type: 'text', name: 'subtitle', label: 'Subtitle' },
      {
        type: 'array',
        name: 'steps',
        label: 'Steps',
        count: 5,
        fields: [
          { type: 'text', name: 'title', label: 'Title' },
          { type: 'text', name: 'description', label: 'Description' },
        ],
      },
    ],
  },
  {
    key: 'credibility',
    title: 'Why Choose Us',
    fields: [
      { type: 'text', name: 'label', label: 'Label' },
      { type: 'text', name: 'heading', label: 'Heading' },
      {
        type: 'array',
        name: 'features',
        label: 'Features',
        count: 6,
        fields: [
          { type: 'text', name: 'title', label: 'Title' },
          { type: 'text', name: 'description', label: 'Description' },
        ],
      },
    ],
  },
  {
    key: 'products_showcase',
    title: 'Products Showcase',
    fields: [
      { type: 'text', name: 'label', label: 'Label' },
      { type: 'text', name: 'heading', label: 'Heading' },
      { type: 'text', name: 'subtitle', label: 'Subtitle' },
    ],
  },
  {
    key: 'latest_blogs',
    title: 'Latest Blogs',
    fields: [
      { type: 'text', name: 'label', label: 'Label' },
      { type: 'text', name: 'heading', label: 'Heading' },
      { type: 'text', name: 'subtitle', label: 'Subtitle' },
    ],
  },
  {
    key: 'contact_cta',
    title: 'Contact CTA',
    fields: [
      { type: 'text', name: 'heading', label: 'Heading' },
      { type: 'textarea', name: 'description', label: 'Description' },
      { type: 'text', name: 'phone', label: 'Phone' },
      { type: 'text', name: 'whatsapp', label: 'WhatsApp Number' },
    ],
  },
];

export default function SiteContentPage() {
  const [data, setData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await fetch('/api/site-content');
      if (res.ok) {
        const result = await res.json();
        setData(result);
      }
    } catch {
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (sectionKey: string) => {
    setSaving(sectionKey);
    setSaved(null);
    setError(null);
    try {
      const res = await fetch(`/api/site-content/${sectionKey}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data[sectionKey] || {}),
      });
      if (res.ok) {
        setSaved(sectionKey);
        setTimeout(() => setSaved(null), 3000);
      } else {
        const result = await res.json();
        setError(result.error || 'Failed to save');
        setTimeout(() => setError(null), 5000);
      }
    } catch {
      setError('Failed to save');
      setTimeout(() => setError(null), 5000);
    } finally {
      setSaving(null);
    }
  };

  const updateField = (sectionKey: string, fieldName: string, value: any) => {
    setData((prev) => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        [fieldName]: value,
      },
    }));
  };

  const updateArrayField = (sectionKey: string, arrayName: string, index: number, fieldName: string, value: any) => {
    setData((prev) => {
      const sectionData = prev[sectionKey] || {};
      const arr = [...(sectionData[arrayName] || [])];
      arr[index] = { ...arr[index], [fieldName]: value };
      return {
        ...prev,
        [sectionKey]: {
          ...sectionData,
          [arrayName]: arr,
        },
      };
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-steel-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-primary-900">Site Content</h1>
        <p className="text-sm text-steel-600 mt-1">Edit homepage text content for each section</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {sections.map((section) => (
        <div key={section.key} className="bg-white rounded-xl border border-steel-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-steel-200 bg-steel-50">
            <h3 className="text-lg font-semibold font-display text-primary-900">{section.title}</h3>
            <p className="text-xs text-steel-500 mt-0.5">Key: {section.key}</p>
          </div>
          <div className="p-6 space-y-4">
            {section.fields.map((field) => {
              if (field.type === 'array') {
                const arrData = data[section.key]?.[field.name] || [];
                return (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-steel-700 mb-3">{field.label}</label>
                    <div className="space-y-4">
                      {Array.from({ length: field.count }).map((_, idx) => (
                        <div key={idx} className="bg-steel-50 rounded-lg p-4 border border-steel-200">
                          <p className="text-xs font-semibold text-steel-500 uppercase tracking-wider mb-3">
                            {field.label} #{idx + 1}
                          </p>
                          <div className="grid gap-3 sm:grid-cols-2">
                            {field.fields.map((subField) => (
                              <div key={subField.name} className={subField.wide ? 'sm:col-span-2' : ''}>
                                <label className="block text-xs font-medium text-steel-600 mb-1">
                                  {subField.label}
                                </label>
                                <input
                                  type={subField.type === 'number' ? 'number' : 'text'}
                                  value={arrData[idx]?.[subField.name] ?? ''}
                                  onChange={(e) =>
                                    updateArrayField(
                                      section.key,
                                      field.name,
                                      idx,
                                      subField.name,
                                      subField.type === 'number' ? Number(e.target.value) : e.target.value
                                    )
                                  }
                                  className="w-full px-3 py-2 border border-steel-200 rounded-lg text-sm text-primary-900 focus:outline-none focus:ring-2 focus:ring-steel-900 focus:border-transparent"
                                />
                                {subField.hint && (
                                  <p className="mt-1 text-xs text-steel-400">{subField.hint}</p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }

              const value = data[section.key]?.[field.name] ?? '';

              if (field.type === 'textarea') {
                return (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-steel-700 mb-1">{field.label}</label>
                    <textarea
                      value={value}
                      onChange={(e) => updateField(section.key, field.name, e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-steel-200 rounded-lg text-sm text-primary-900 focus:outline-none focus:ring-2 focus:ring-steel-900 focus:border-transparent resize-vertical"
                    />
                  </div>
                );
              }

              return (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-steel-700 mb-1">{field.label}</label>
                  <input
                    type={field.type === 'number' ? 'number' : 'text'}
                    value={value}
                    onChange={(e) =>
                      updateField(
                        section.key,
                        field.name,
                        field.type === 'number' ? Number(e.target.value) : e.target.value
                      )
                    }
                    className="w-full px-3 py-2 border border-steel-200 rounded-lg text-sm text-primary-900 focus:outline-none focus:ring-2 focus:ring-steel-900 focus:border-transparent"
                  />
                </div>
              );
            })}

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => handleSave(section.key)}
                disabled={saving === section.key}
                className="inline-flex items-center gap-2 bg-steel-900 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-steel-800 transition-colors disabled:opacity-50"
              >
                {saving === section.key ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Save Section
              </button>
              {saved === section.key && (
                <span className="inline-flex items-center gap-1 text-green-600 text-sm font-medium">
                  <CheckCircle className="w-4 h-4" />
                  Saved successfully
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
