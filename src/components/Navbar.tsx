'use client';

import React from 'react';
import { 
  Users, 
  Sliders, 
  Sparkles, 
  Database, 
  Activity, 
  BarChart2, 
  UserCheck, 
  BrainCircuit
} from 'lucide-react';
import { Profile } from '@/types/database';

type NavTab = 'overview' | 'compare' | 'individual' | 'insights';

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  profiles: Profile[];
  selectedUserIds: string[];
  onOpenUserSelector: () => void;
  dateRange: '7d' | '14d' | '30d' | 'all';
  setDateRange: (range: '7d' | '14d' | '30d' | 'all') => void;
  onOpenConfigModal: () => void;
  onOpenPromptModal: () => void;
  onOpenSupabaseModal: () => void;
  dataSource: 'live_supabase' | 'reference_archetypes' | 'empty';
}

export function Navbar({
  activeTab,
  setActiveTab,
  profiles,
  selectedUserIds,
  onOpenUserSelector,
  dateRange,
  setDateRange,
  onOpenConfigModal,
  onOpenPromptModal,
  onOpenSupabaseModal,
  dataSource
}: NavbarProps) {
  const selectedProfiles = profiles.filter(p => selectedUserIds.includes(p.id));

  const navItems: { id: NavTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'overview', label: 'Overview', icon: BarChart2 },
    { id: 'compare', label: 'Compare', icon: Users },
    { id: 'individual', label: 'Individual Analysis', icon: UserCheck },
    { id: 'insights', label: 'Insights & Report', icon: BrainCircuit }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-zinc-900 tracking-tight text-base sm:text-lg">
                  Behavioral Rhythm & Productivity
                </span>
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-zinc-100 text-zinc-700 border border-zinc-200">
                  Analytics & Inference
                </span>
              </div>
              <p className="text-xs text-zinc-500 hidden sm:block">
                Circadian alignment, digital engagement telemetry & calibrated predictive forecasting
              </p>
            </div>
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Supabase Status Pill */}
            <button
              onClick={onOpenSupabaseModal}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
                dataSource === 'live_supabase'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                  : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
              }`}
              title="Click for Supabase connection & RLS setup details"
            >
              <Database className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">
                {dataSource === 'live_supabase' ? 'Supabase Connected' : 'Supabase (Demo Dataset)'}
              </span>
              <span className="lg:hidden">
                {dataSource === 'live_supabase' ? 'Live' : 'Demo'}
              </span>
            </button>

            {/* Circadian Config Button */}
            <button
              onClick={onOpenConfigModal}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-zinc-700 bg-white hover:bg-zinc-50 border border-zinc-200 rounded-lg shadow-xs transition-colors"
              title="Configure reference circadian parameters & weights"
            >
              <Sliders className="w-3.5 h-3.5 text-zinc-500" />
              <span className="hidden sm:inline">Baseline Config</span>
            </button>

            {/* Copy AI Prompt Button */}
            <button
              onClick={onOpenPromptModal}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors"
              title="Generate and copy comprehensive AI analysis prompt"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Copy AI Prompt</span>
            </button>
          </div>
        </div>

        {/* Second Row: Navigation Tabs & User/Date Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-2 border-t border-zinc-100 gap-2">
          {/* Main Navigation Tabs */}
          <nav className="flex space-x-1 sm:space-x-2">
            {navItems.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-zinc-900 text-white shadow-xs'
                      : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Filters: Active Users & Date Range */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {/* Active Users Selector */}
            <button
              onClick={onOpenUserSelector}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-zinc-800 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 rounded-lg transition-colors"
            >
              <Users className="w-3.5 h-3.5 text-indigo-600" />
              <span>Users ({selectedProfiles.length}):</span>
              <span className="font-semibold text-zinc-900">
                {selectedProfiles.map(p => p.display_name).join(', ') || 'None'}
              </span>
            </button>

            {/* Date Range Selector */}
            <div className="flex items-center bg-zinc-100 p-0.5 rounded-lg border border-zinc-200 text-xs">
              {(['7d', '14d', '30d', 'all'] as const).map(range => (
                <button
                  key={range}
                  onClick={() => setDateRange(range)}
                  className={`px-2 py-0.5 rounded-md font-medium capitalize transition-colors ${
                    dateRange === range
                      ? 'bg-white text-zinc-900 shadow-xs'
                      : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                >
                  {range === 'all' ? 'All Data' : range}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
