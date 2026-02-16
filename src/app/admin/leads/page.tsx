'use client';

import { useState, useEffect } from 'react';
import { Users, Phone, Mail, MessageSquare, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { cn, formatDate, truncateText } from '@/lib/utils';
import { supabase } from '@/lib/supabase';
import type { Lead } from '@/types/database';

const statusFilters = ['All', 'new', 'contacted', 'converted'] as const;

const statusColors: Record<Lead['status'], string> = {
  new: 'bg-blue-100 text-blue-700',
  contacted: 'bg-amber-100 text-amber-700',
  converted: 'bg-green-100 text-green-700',
};

const statusLabels: Record<Lead['status'], string> = {
  new: 'New',
  contacted: 'Contacted',
  converted: 'Converted',
};

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchLeads = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) setLeads(data as Lead[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleStatusUpdate = async (id: string, newStatus: Lead['status']) => {
    const { error } = await supabase
      .from('leads')
      .update({ status: newStatus })
      .eq('id', id);

    if (!error) {
      setLeads((prev) =>
        prev.map((lead) => (lead.id === id ? { ...lead, status: newStatus } : lead))
      );
    }
  };

  const filteredLeads = activeFilter === 'All'
    ? leads
    : leads.filter((lead) => lead.status === activeFilter);

  const getCount = (status: string) => {
    if (status === 'All') return leads.length;
    return leads.filter((lead) => lead.status === status).length;
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-8 w-48 bg-steel-200 rounded animate-pulse" />
        </div>
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-10 w-28 bg-steel-200 rounded-lg animate-pulse" />
          ))}
        </div>
        <div className="bg-white rounded-xl border border-steel-200 p-6 space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-16 bg-steel-100 rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-primary-900">Leads</h1>
        <p className="text-primary-500 mt-1">Manage and track your leads</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {statusFilters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={cn(
              'inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
              activeFilter === filter
                ? 'bg-steel-900 text-white'
                : 'bg-white border border-steel-200 text-primary-600 hover:bg-steel-50'
            )}
          >
            {filter === 'All' ? 'All' : statusLabels[filter as Lead['status']]}
            <span
              className={cn(
                'inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-semibold',
                activeFilter === filter
                  ? 'bg-white/20 text-white'
                  : 'bg-steel-100 text-primary-600'
              )}
            >
              {getCount(filter)}
            </span>
          </button>
        ))}
      </div>

      {filteredLeads.length === 0 ? (
        <div className="bg-white rounded-xl border border-steel-200 p-12 text-center">
          <Users className="w-12 h-12 text-primary-200 mx-auto mb-3" />
          <p className="text-primary-500 text-lg font-medium">No leads found</p>
          <p className="text-primary-400 text-sm mt-1">
            {activeFilter === 'All'
              ? 'Leads will appear here when someone submits a contact form.'
              : `No leads with "${statusLabels[activeFilter as Lead['status']]}" status.`}
          </p>
        </div>
      ) : (
        <>
          <div className="hidden md:block bg-white rounded-xl border border-steel-200 overflow-hidden">
            <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-steel-50 border-b border-steel-200 text-xs font-semibold text-primary-500 uppercase tracking-wider">
              <div className="col-span-2">Name</div>
              <div className="col-span-2">Email</div>
              <div className="col-span-2">Phone</div>
              <div className="col-span-2">Message</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2">Date</div>
            </div>
            <div className="divide-y divide-steel-100">
              {filteredLeads.map((lead) => (
                <div key={lead.id}>
                  <div
                    onClick={() => setExpandedId(expandedId === lead.id ? null : lead.id)}
                    className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-steel-50 transition-colors cursor-pointer"
                  >
                    <div className="col-span-2">
                      <p className="font-medium text-primary-900 truncate">{lead.name}</p>
                    </div>
                    <div className="col-span-2">
                      <a
                        href={`mailto:${lead.email}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-sm text-steel-700 hover:text-steel-900 truncate block"
                      >
                        {lead.email}
                      </a>
                    </div>
                    <div className="col-span-2">
                      <a
                        href={`tel:${lead.phone}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-sm text-primary-600 hover:text-steel-900 truncate block"
                      >
                        {lead.phone}
                      </a>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-primary-500 truncate">
                        {truncateText(lead.message, 50)}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <select
                        value={lead.status}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleStatusUpdate(lead.id, e.target.value as Lead['status']);
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className={cn(
                          'px-2.5 py-1 rounded-full text-xs font-medium border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-steel-900',
                          statusColors[lead.status]
                        )}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="converted">Converted</option>
                      </select>
                    </div>
                    <div className="col-span-2 flex items-center justify-between">
                      <span className="text-sm text-primary-500">{formatDate(lead.created_at)}</span>
                      {expandedId === lead.id ? (
                        <ChevronUp className="w-4 h-4 text-primary-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-primary-400" />
                      )}
                    </div>
                  </div>
                  {expandedId === lead.id && (
                    <div className="px-6 pb-4">
                      <div className="bg-steel-50 rounded-lg p-4 border border-steel-200">
                        <div className="flex items-start gap-2 mb-2">
                          <MessageSquare className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
                          <p className="text-sm font-medium text-primary-700">Full Message</p>
                        </div>
                        <p className="text-sm text-primary-600 whitespace-pre-wrap pl-6">
                          {lead.message}
                        </p>
                        <div className="flex items-center gap-4 mt-3 pl-6">
                          <a
                            href={`mailto:${lead.email}`}
                            className="inline-flex items-center gap-1.5 text-xs text-steel-700 hover:text-steel-900 font-medium"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            {lead.email}
                          </a>
                          <a
                            href={`tel:${lead.phone}`}
                            className="inline-flex items-center gap-1.5 text-xs text-steel-700 hover:text-steel-900 font-medium"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            {lead.phone}
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="md:hidden space-y-3">
            {filteredLeads.map((lead) => (
              <div
                key={lead.id}
                className="bg-white rounded-xl border border-steel-200 overflow-hidden"
              >
                <div
                  onClick={() => setExpandedId(expandedId === lead.id ? null : lead.id)}
                  className="p-4 cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-medium text-primary-900">{lead.name}</p>
                    <span
                      className={cn(
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        statusColors[lead.status]
                      )}
                    >
                      {statusLabels[lead.status]}
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    <a
                      href={`mailto:${lead.email}`}
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-2 text-sm text-steel-700"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      {lead.email}
                    </a>
                    <a
                      href={`tel:${lead.phone}`}
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-2 text-sm text-primary-600"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      {lead.phone}
                    </a>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-primary-400">{formatDate(lead.created_at)}</span>
                    {expandedId === lead.id ? (
                      <ChevronUp className="w-4 h-4 text-primary-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-primary-400" />
                    )}
                  </div>
                </div>
                {expandedId === lead.id && (
                  <div className="px-4 pb-4 border-t border-steel-100 pt-3">
                    <div className="bg-steel-50 rounded-lg p-3">
                      <div className="flex items-start gap-2 mb-2">
                        <MessageSquare className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
                        <p className="text-xs font-medium text-primary-700">Full Message</p>
                      </div>
                      <p className="text-sm text-primary-600 whitespace-pre-wrap pl-6">
                        {lead.message}
                      </p>
                    </div>
                    <div className="mt-3">
                      <label className="text-xs font-medium text-primary-500 mb-1 block">Update Status</label>
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusUpdate(lead.id, e.target.value as Lead['status'])}
                        className={cn(
                          'w-full px-3 py-2 rounded-lg text-sm font-medium border border-steel-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-steel-900',
                          statusColors[lead.status]
                        )}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="converted">Converted</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
