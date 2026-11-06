import { createClient } from '@supabase/supabase-js';
import { Profile, DailyLog, Prediction, Feedback } from '@/types/database';
import { 
  REFERENCE_PROFILES, 
  REFERENCE_DAILY_LOGS, 
  REFERENCE_PREDICTIONS, 
  REFERENCE_FEEDBACK 
} from './referenceData';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dfgkoxymviyhkisiwmce.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_fE7uauA4etxhS-BqpIboBw_tlmeVRV-';

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface DataLoadResult {
  profiles: Profile[];
  dailyLogs: DailyLog[];
  predictions: Prediction[];
  feedback: Feedback[];
  source: 'live_supabase' | 'reference_archetypes' | 'empty';
  errorDetails: string | null;
  supabaseConnected: boolean;
}

export async function fetchLiveSupabaseData(): Promise<{
  profiles: Profile[];
  dailyLogs: DailyLog[];
  predictions: Prediction[];
  feedback: Feedback[];
  error: string | null;
}> {
  try {
    const [profilesRes, logsRes, predsRes, feedbackRes] = await Promise.all([
      supabase.from('profiles').select('*').order('created_at', { ascending: true }),
      supabase.from('daily_logs').select('*').order('date', { ascending: true }),
      supabase.from('predictions').select('*').order('date', { ascending: true }),
      supabase.from('feedback').select('*').order('date', { ascending: true })
    ]);

    if (profilesRes.error) {
      return { profiles: [], dailyLogs: [], predictions: [], feedback: [], error: profilesRes.error.message };
    }

    return {
      profiles: (profilesRes.data as Profile[]) || [],
      dailyLogs: (logsRes.data as DailyLog[]) || [],
      predictions: (predsRes.data as Prediction[]) || [],
      feedback: (feedbackRes.data as Feedback[]) || [],
      error: null
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown network error';
    return { profiles: [], dailyLogs: [], predictions: [], feedback: [], error: msg };
  }
}

export async function loadApplicationData(
  mode: 'auto' | 'force_supabase' | 'force_reference' | 'force_empty' = 'auto'
): Promise<DataLoadResult> {
  if (mode === 'force_empty') {
    return {
      profiles: [],
      dailyLogs: [],
      predictions: [],
      feedback: [],
      source: 'empty',
      errorDetails: 'Simulating empty database state for testing.',
      supabaseConnected: true
    };
  }

  if (mode === 'force_reference') {
    return {
      profiles: REFERENCE_PROFILES,
      dailyLogs: REFERENCE_DAILY_LOGS,
      predictions: REFERENCE_PREDICTIONS,
      feedback: REFERENCE_FEEDBACK,
      source: 'reference_archetypes',
      errorDetails: null,
      supabaseConnected: true
    };
  }

  // Attempt live Supabase fetch
  const live = await fetchLiveSupabaseData();

  if (live.error) {
    if (mode === 'force_supabase') {
      return {
        profiles: [],
        dailyLogs: [],
        predictions: [],
        feedback: [],
        source: 'live_supabase',
        errorDetails: `Supabase query error: ${live.error}`,
        supabaseConnected: false
      };
    }
    // Auto mode fallback
    return {
      profiles: REFERENCE_PROFILES,
      dailyLogs: REFERENCE_DAILY_LOGS,
      predictions: REFERENCE_PREDICTIONS,
      feedback: REFERENCE_FEEDBACK,
      source: 'reference_archetypes',
      errorDetails: `Live query encountered: "${live.error}". Using Reference Archetype Dataset.`,
      supabaseConnected: false
    };
  }

  // If live profiles exist and have records, use live data!
  if (live.profiles && live.profiles.length > 0) {
    return {
      profiles: live.profiles,
      dailyLogs: live.dailyLogs,
      predictions: live.predictions,
      feedback: live.feedback,
      source: 'live_supabase',
      errorDetails: null,
      supabaseConnected: true
    };
  }

  // Live Supabase connected, but tables returned 0 rows (RLS enabled without anon policy or tables not yet seeded)
  if (mode === 'force_supabase') {
    return {
      profiles: [],
      dailyLogs: [],
      predictions: [],
      feedback: [],
      source: 'live_supabase',
      errorDetails: 'Connected to Supabase, but 0 records returned. Check if Row Level Security (RLS) policies allow SELECT on public.profiles.',
      supabaseConnected: true
    };
  }

  // Auto fallback to rich reference dataset
  return {
    profiles: REFERENCE_PROFILES,
    dailyLogs: REFERENCE_DAILY_LOGS,
    predictions: REFERENCE_PREDICTIONS,
    feedback: REFERENCE_FEEDBACK,
    source: 'reference_archetypes',
    errorDetails: 'Connected to Supabase (dfgkoxymviyhkisiwmce), but RLS policies or tables returned 0 rows. Showing Reference Behavioral Archetype Dataset. Run the provided SQL setup script in Supabase SQL editor to populate live tables.',
    supabaseConnected: true
  };
}
