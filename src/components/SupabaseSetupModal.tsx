'use client';

import React, { useState } from 'react';
import { Database, Copy, Check, X, ShieldAlert } from 'lucide-react';

interface SupabaseSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  dataSource: 'live_supabase' | 'reference_archetypes' | 'empty';
  onSetDataSourceMode: (mode: 'auto' | 'force_supabase' | 'force_reference' | 'force_empty') => void;
}

export function SupabaseSetupModal({
  isOpen,
  onClose,
  dataSource,
  onSetDataSourceMode
}: SupabaseSetupModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const sqlCodeSnippet = `-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/dfgkoxymviyhkisiwmce/sql)
-- 1. Enable Row Level Security (RLS) & Grant Anon SELECT Permissions
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow anon select profiles" ON public.profiles;
CREATE POLICY "Allow anon select profiles" ON public.profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow anon select daily_logs" ON public.daily_logs;
CREATE POLICY "Allow anon select daily_logs" ON public.daily_logs FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow anon select predictions" ON public.predictions;
CREATE POLICY "Allow anon select predictions" ON public.predictions FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow anon select feedback" ON public.feedback;
CREATE POLICY "Allow anon select feedback" ON public.feedback FOR SELECT USING (true);

-- (The full 45-day seed data for Anshik, Aditya, and Yash is located in ./supabase_setup.sql)`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(sqlCodeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white border border-zinc-200 rounded-2xl shadow-xl max-w-2xl w-full p-6 space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
              <Database className="w-3.5 h-3.5" />
              <span>Supabase Architecture & Permissions</span>
            </div>
            <h2 className="text-lg font-bold text-zinc-900 tracking-tight">
              Live Database Integration
            </h2>
            <p className="text-xs text-zinc-500">
              Connected to Supabase endpoint: <code className="text-zinc-700 bg-zinc-100 px-1 py-0.5 rounded">https://dfgkoxymviyhkisiwmce.supabase.co</code>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Mode & Toggle */}
        <div className="p-3.5 rounded-xl border border-zinc-200 bg-zinc-50/70 space-y-2">
          <div className="flex items-center justify-between text-xs font-medium">
            <span className="text-zinc-700">Active Data Mode:</span>
            <span className={`px-2 py-0.5 rounded-full ${
              dataSource === 'live_supabase' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
            }`}>
              {dataSource === 'live_supabase' ? 'Live Supabase Tables' : 'Reference Archetypes (In-Memory Dataset)'}
            </span>
          </div>
          <p className="text-xs text-zinc-500">
            Switch mode below to test live querying, reference seed data, or empty state behavior:
          </p>
          <div className="grid grid-cols-3 gap-2 pt-1">
            <button
              onClick={() => onSetDataSourceMode('force_supabase')}
              className="px-2.5 py-1.5 text-xs font-medium rounded-lg border border-zinc-300 bg-white hover:bg-zinc-100 text-zinc-800 text-center"
            >
              Live Supabase Only
            </button>
            <button
              onClick={() => onSetDataSourceMode('force_reference')}
              className="px-2.5 py-1.5 text-xs font-medium rounded-lg border border-indigo-300 bg-indigo-50/50 hover:bg-indigo-100 text-indigo-900 text-center"
            >
              Reference Archetypes
            </button>
            <button
              onClick={() => onSetDataSourceMode('force_empty')}
              className="px-2.5 py-1.5 text-xs font-medium rounded-lg border border-zinc-300 bg-white hover:bg-zinc-100 text-zinc-600 text-center"
            >
              Empty State Test
            </button>
          </div>
        </div>

        {/* RLS Policy Notice */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-800">
            <ShieldAlert className="w-4 h-4 text-amber-600" />
            <span>Row Level Security (RLS) Configuration</span>
          </div>
          <p className="text-xs text-zinc-600 leading-relaxed">
            By default in Supabase, when Row Level Security (RLS) is enabled, queries using the anonymous publishable key return 0 rows unless a <code>SELECT</code> policy exists. To allow public read access for this dashboard, execute the policy script in the Supabase SQL editor:
          </p>

          <div className="relative">
            <pre className="bg-zinc-900 text-zinc-100 p-3 rounded-xl font-mono text-[11px] overflow-x-auto max-h-40">
              {sqlCodeSnippet}
            </pre>
            <button
              onClick={handleCopy}
              className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded text-[11px] font-sans"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy SQL'}</span>
            </button>
          </div>
          <p className="text-[11px] text-zinc-500">
            A complete setup file with 135 daily records for Anshik, Aditya, and Yash has been generated at <code>./supabase_setup.sql</code> in this repository.
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-2 border-t border-zinc-100">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-zinc-700 bg-zinc-100 hover:bg-zinc-200 rounded-lg transition-colors"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
