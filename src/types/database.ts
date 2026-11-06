export interface Profile {
  id: string;
  display_name: string;
  age?: number | null;
  created_at?: string;
}

export interface DailyLog {
  id?: string;
  user_id: string;
  date: string;
  last_unlock_prev_night: string | null;
  first_unlock_morning: string | null;
  sleep_duration_estimate_mins: number | null;
  total_screen_time_mins: number | null;
  unlock_count: number | null;
  avg_session_length_mins: number | null;
  dominant_app_category: string | null;
  step_count: number | null;
  active_minutes: number | null;
  primary_activity: string | null;
  away_from_home_mins: number | null;
  calendar_event_count: number | null;
  weather_condition: string | null;
  day_of_week: string;
  created_at?: string;
}

export interface Prediction {
  id?: string;
  user_id: string;
  date: string;
  is_predictive: boolean; // true = predicted productive, false = predicted less-productive
  confidence_score: number;
  reason_tags: string[];
  created_at?: string;
}

export interface Feedback {
  id?: string;
  user_id: string;
  date: string;
  rating: number; // 0 to 5
  note: string | null;
  submitted_at: string;
}

export interface CircadianReferenceConfig {
  referenceNightUnlock: string; // e.g. "23:00" (11:00 PM)
  referenceMorningUnlock: string; // e.g. "07:00" (7:00 AM)
  referenceSleepMinsTarget: number; // e.g. 480 (8 hours)
  weightNightUnlock: number; // default 0.25
  weightMorningUnlock: number; // default 0.25
  weightConsistency: number; // default 0.25
  weightSleepDuration: number; // default 0.15
  weightWeekendStability: number; // default 0.10
}

export interface CircadianComponentBreakdown {
  nightAlignmentScore: number; // 0 - 100
  morningAlignmentScore: number; // 0 - 100
  consistencyScore: number; // 0 - 100
  sleepDurationScore: number; // 0 - 100
  weekendStabilityScore: number; // 0 - 100
  nightContribution: number;
  morningContribution: number;
  consistencyContribution: number;
  sleepDurationContribution: number;
  weekendStabilityContribution: number;
}

export interface CircadianMetrics {
  userId: string;
  overallScore: number; // 0 - 100
  alignmentLevel: 'High Alignment' | 'Moderate Alignment' | 'Greater Schedule Drift';
  breakdown: CircadianComponentBreakdown;
  rhythmDriftMinutes: number; // positive = later than reference, negative = earlier
  rhythmDriftFormatted: string; // e.g. "+2h 15m later than reference"
  rhythmDriftDirection: 'Later than reference' | 'Earlier than reference' | 'Aligned with reference';
  routineConsistencyScore: number; // 0 - 100 (Independent of reference alignment)
  medianNightUnlock: string;
  medianMorningUnlock: string;
  medianSleepDurationMins: number;
  morningUnlockStdDevMins: number;
  nightUnlockStdDevMins: number;
  weekdayAvgWakeTime: string;
  weekendAvgWakeTime: string;
  socialJetlagMinutes: number; // weekend wake vs weekday wake shift
}

export interface BehavioralInference {
  id: string;
  title: string;
  category: 'phone_use' | 'circadian' | 'physical_activity' | 'routine' | 'adaptation';
  inference: string;
  evidence: string;
  strength: 'High' | 'Moderate' | 'Emerging';
  trend: 'Increasing' | 'Decreasing' | 'Stable';
  implication: string;
  relevantPeriod: string;
  metricsInvolved: string[];
}

export interface BehavioralProfile {
  userId: string;
  displayName: string;
  circadianAlignmentScore: number;
  routineConsistencyScore: number;
  phoneEngagementScore: number;
  physicalActivityScore: number;
  predictedProductivityScore: number;
  summaryNarrative: string;
  archetypeTag: string;
}

export interface UserStatsSummary {
  userId: string;
  displayName: string;
  totalDays: number;
  screenTimeMean: number;
  screenTimeMedian: number;
  screenTimeStdDev: number;
  unlocksMean: number;
  unlocksMedian: number;
  avgSessionMean: number;
  avgSessionMedian: number;
  stepsMean: number;
  stepsMedian: number;
  activeMinsMean: number;
  sleepDurationMean: number;
  sleepDurationMedian: number;
  sleepDurationStdDev: number;
  predictiveDaysRatio: number;
  avgConfidence: number;
  feedbackSubmissionRatio: number;
  avgFeedbackRating: number | null;
  earlierVsRecentScreenDelta: number;
  earlierVsRecentWakeDeltaMins: number;
  earlierVsRecentConfidenceDelta: number;
}

export interface CorrelationResult {
  variableA: string;
  variableB: string;
  pearsonR: number;
  spearmanRho: number;
  sampleSize: number;
  interpretation: string;
}
