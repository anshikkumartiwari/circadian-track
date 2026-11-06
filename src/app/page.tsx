'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { CircadianReferenceConfig } from '@/types/database';
import { loadApplicationData, DataLoadResult } from '@/lib/supabase';
import { DEFAULT_CIRCADIAN_CONFIG } from '@/lib/circadianEngine';
import { generateAIPrompt } from '@/lib/promptGenerator';
import { Navbar } from '@/components/Navbar';
import { UserSelectionModal } from '@/components/UserSelectionModal';
import { CircadianConfigModal } from '@/components/CircadianConfigModal';
import { AIPromptModal } from '@/components/AIPromptModal';
import { SupabaseSetupModal } from '@/components/SupabaseSetupModal';
import { OverviewTab } from '@/components/OverviewTab';
import { CompareTab } from '@/components/CompareTab';
import { IndividualTab } from '@/components/IndividualTab';
import { InsightsTab } from '@/components/InsightsTab';
import { AlertCircle } from 'lucide-react';

export default function Home() {
  const [data, setData] = useState<DataLoadResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dataMode, setDataMode] = useState<'auto' | 'force_supabase' | 'force_reference' | 'force_empty'>('auto');

  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [activeUserId, setActiveUserId] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'overview' | 'compare' | 'individual' | 'insights'>('overview');
  const [dateRange, setDateRange] = useState<'7d' | '14d' | '30d' | 'all'>('30d');
  const [circadianConfig, setCircadianConfig] = useState<CircadianReferenceConfig>(DEFAULT_CIRCADIAN_CONFIG);

  // Modals state
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);
  const [isSupabaseModalOpen, setIsSupabaseModalOpen] = useState(false);

  // Initial load
  useEffect(() => {
    async function init() {
      setIsLoading(true);
      const res = await loadApplicationData(dataMode);
      setData(res);

      if (res.profiles.length > 0) {
        // Restore stored user selection if valid, else default to all available profiles
        const storedIds = localStorage.getItem('selected_user_ids');
        let initialIds: string[] = [];
        if (storedIds) {
          try {
            const parsed = JSON.parse(storedIds);
            initialIds = parsed.filter((id: string) => res.profiles.some(p => p.id === id));
          } catch {
            initialIds = [];
          }
        }
        if (initialIds.length === 0) {
          initialIds = res.profiles.map(p => p.id);
        }

        setSelectedUserIds(initialIds);
        setActiveUserId(initialIds[0] || res.profiles[0].id);
      }

      // Restore circadian config
      const storedConfig = localStorage.getItem('circadian_reference_config');
      if (storedConfig) {
        try {
          setCircadianConfig(JSON.parse(storedConfig));
        } catch {
          // ignore
        }
      }

      setIsLoading(false);
    }
    init();
  }, [dataMode]);

  const handleSaveUserSelection = (ids: string[]) => {
    setSelectedUserIds(ids);
    localStorage.setItem('selected_user_ids', JSON.stringify(ids));
    if (ids.length > 0 && !ids.includes(activeUserId)) {
      setActiveUserId(ids[0]);
    }
  };

  const handleSaveConfig = (newConfig: CircadianReferenceConfig) => {
    setCircadianConfig(newConfig);
    localStorage.setItem('circadian_reference_config', JSON.stringify(newConfig));
  };

  // Date filtered logs
  const filteredLogs = useMemo(() => {
    if (!data || !data.dailyLogs) return [];
    const allLogs = data.dailyLogs;
    if (dateRange === 'all') return allLogs;

    // Get sorted unique dates
    const uniqueDates = Array.from(new Set(allLogs.map(l => l.date))).sort();
    const daysToTake = dateRange === '7d' ? 7 : (dateRange === '14d' ? 14 : 30);
    const slicedDates = uniqueDates.slice(-daysToTake);
    return allLogs.filter(l => slicedDates.includes(l.date));
  }, [data, dateRange]);

  const filteredPredictions = useMemo(() => {
    if (!data || !data.predictions) return [];
    if (dateRange === 'all') return data.predictions;
    const allowedDates = new Set(filteredLogs.map(l => l.date));
    return data.predictions.filter(p => allowedDates.has(p.date));
  }, [data, filteredLogs, dateRange]);

  const filteredFeedback = useMemo(() => {
    if (!data || !data.feedback) return [];
    if (dateRange === 'all') return data.feedback;
    const allowedDates = new Set(filteredLogs.map(l => l.date));
    return data.feedback.filter(f => allowedDates.has(f.date));
  }, [data, filteredLogs, dateRange]);

  // Selected profiles
  const selectedProfiles = useMemo(() => {
    if (!data) return [];
    return data.profiles.filter(p => selectedUserIds.includes(p.id));
  }, [data, selectedUserIds]);

  // AI Prompt text generated on demand
  const aiPromptText = useMemo(() => {
    if (!data) return '';
    return generateAIPrompt(
      selectedProfiles,
      filteredLogs,
      filteredPredictions,
      filteredFeedback
    );
  }, [data, selectedProfiles, filteredLogs, filteredPredictions, filteredFeedback]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-6 space-y-4">
        <div className="w-10 h-10 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-medium text-zinc-600">Connecting to Supabase & Loading Behavioral Telemetry...</p>
      </div>
    );
  }

  const profiles = data?.profiles || [];

  return (
    <div className="min-h-screen bg-zinc-50/60 text-zinc-900 flex flex-col selection:bg-indigo-100 selection:text-indigo-900">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        profiles={profiles}
        selectedUserIds={selectedUserIds}
        onOpenUserSelector={() => setIsUserModalOpen(true)}
        dateRange={dateRange}
        setDateRange={setDateRange}
        onOpenConfigModal={() => setIsConfigModalOpen(true)}
        onOpenPromptModal={() => setIsPromptModalOpen(true)}
        onOpenSupabaseModal={() => setIsSupabaseModalOpen(true)}
        dataSource={data?.source || 'live_supabase'}
      />

      {/* Diagnostic Banner if RLS returned 0 rows */}
      {data?.errorDetails && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2.5 text-xs text-amber-800 flex items-center justify-between max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{data.errorDetails}</span>
          </div>
          <button
            onClick={() => setIsSupabaseModalOpen(true)}
            className="font-semibold underline text-amber-900 hover:text-amber-950 shrink-0 ml-2"
          >
            Setup RLS Policies &rarr;
          </button>
        </div>
      )}

      {/* Main Tab Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'overview' && (
          <OverviewTab
            profiles={profiles}
            selectedUserIds={selectedUserIds}
            logs={filteredLogs}
            predictions={filteredPredictions}
            feedback={filteredFeedback}
            circadianConfig={circadianConfig}
            onOpenConfigModal={() => setIsConfigModalOpen(true)}
            onNavigateToUser={(uId) => {
              setActiveUserId(uId);
              setActiveTab('individual');
            }}
          />
        )}

        {activeTab === 'compare' && (
          <CompareTab
            profiles={profiles}
            selectedUserIds={selectedUserIds}
            logs={filteredLogs}
            predictions={filteredPredictions}
            feedback={filteredFeedback}
            circadianConfig={circadianConfig}
          />
        )}

        {activeTab === 'individual' && (
          <IndividualTab
            profiles={profiles}
            selectedUserIds={selectedUserIds}
            activeUserId={activeUserId}
            setActiveUserId={setActiveUserId}
            logs={filteredLogs}
            predictions={filteredPredictions}
            feedback={filteredFeedback}
            circadianConfig={circadianConfig}
          />
        )}

        {activeTab === 'insights' && (
          <InsightsTab
            profiles={profiles}
            selectedUserIds={selectedUserIds}
            logs={filteredLogs}
            predictions={filteredPredictions}
            feedback={filteredFeedback}
            onOpenPromptModal={() => setIsPromptModalOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white py-5 text-center text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Behavioral Rhythm, Circadian Alignment & Productivity Analytics</span>
          <span className="font-mono text-[11px] text-zinc-400">
            Supabase: dfgkoxymviyhkisiwmce • Timezone: Asia/Kolkata
          </span>
        </div>
      </footer>

      {/* Modals */}
      <UserSelectionModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        profiles={profiles}
        selectedUserIds={selectedUserIds}
        onSaveSelection={handleSaveUserSelection}
      />

      <CircadianConfigModal
        isOpen={isConfigModalOpen}
        onClose={() => setIsConfigModalOpen(false)}
        config={circadianConfig}
        onSaveConfig={handleSaveConfig}
      />

      <AIPromptModal
        isOpen={isPromptModalOpen}
        onClose={() => setIsPromptModalOpen(false)}
        promptText={aiPromptText}
      />

      <SupabaseSetupModal
        isOpen={isSupabaseModalOpen}
        onClose={() => setIsSupabaseModalOpen(false)}
        dataSource={data?.source || 'live_supabase'}
        onSetDataSourceMode={(mode) => setDataMode(mode)}
      />
    </div>
  );
}
