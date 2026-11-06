'use client';

import React from 'react';
import { 
  Profile, 
  DailyLog, 
  Prediction, 
  Feedback, 
  CircadianReferenceConfig 
} from '@/types/database';
import { calculateCircadianMetrics } from '@/lib/circadianEngine';
import { computeUserStatisticsSummary } from '@/lib/statisticsEngine';
import { generateBehavioralInferences, buildBehavioralProfile } from '@/lib/behavioralInsightsEngine';
import { 
  Compass, 
  ArrowUpRight, 
  Sparkles, 
  Activity, 
  Layers, 
  Info 
} from 'lucide-react';

interface OverviewTabProps {
  profiles: Profile[];
  selectedUserIds: string[];
  logs: DailyLog[];
  predictions: Prediction[];
  feedback: Feedback[];
  circadianConfig: CircadianReferenceConfig;
  onOpenConfigModal: () => void;
  onNavigateToUser: (userId: string) => void;
}

export function OverviewTab({
  profiles,
  selectedUserIds,
  logs,
  predictions,
  feedback,
  circadianConfig,
  onOpenConfigModal,
  onNavigateToUser
}: OverviewTabProps) {
  const selectedProfiles = profiles.filter(p => selectedUserIds.includes(p.id));

  if (selectedProfiles.length === 0 || logs.length === 0) {
    return (
      <div className="p-12 text-center bg-white border border-zinc-200 rounded-2xl shadow-xs space-y-3">
        <Activity className="w-10 h-10 text-zinc-400 mx-auto" />
        <h3 className="text-base font-semibold text-zinc-900">No User Records Available</h3>
        <p className="text-sm text-zinc-500 max-w-md mx-auto">
          Please select at least one active user with logged behavioral records to view the overview analysis.
        </p>
      </div>
    );
  }

  // Precompute user metrics
  const userData = selectedProfiles.map(profile => {
    const uLogs = logs.filter(l => l.user_id === profile.id);
    const uPreds = predictions.filter(p => p.user_id === profile.id);
    const uFeed = feedback.filter(f => f.user_id === profile.id);

    const circ = calculateCircadianMetrics(profile.id, uLogs, circadianConfig);
    const stats = computeUserStatisticsSummary(profile.id, profile.display_name, uLogs, uPreds, uFeed);
    const inferences = generateBehavioralInferences(profile.id, profile.display_name, uLogs, uPreds, uFeed);
    const perfProfile = buildBehavioralProfile(profile, uLogs, uPreds, uFeed);

    return {
      profile,
      circ,
      stats,
      inferences,
      perfProfile,
      logCount: uLogs.length
    };
  });

  // Calculate cohort superlative answers
  const sortedByRegularity = [...userData].sort((a, b) => b.circ.routineConsistencyScore - a.circ.routineConsistencyScore);
  const mostRegularUser = sortedByRegularity[0];

  const sortedByDrift = [...userData].sort((a, b) => Math.abs(b.circ.rhythmDriftMinutes) - Math.abs(a.circ.rhythmDriftMinutes));
  const greatestDriftUser = sortedByDrift[0];

  const sortedByUnlocks = [...userData].sort((a, b) => b.stats.unlocksMean - a.stats.unlocksMean);
  const highestCheckingUser = sortedByUnlocks[0];

  const sortedByScreen = [...userData].sort((a, b) => b.stats.screenTimeMean - a.stats.screenTimeMean);
  const longestSessionUser = sortedByScreen[0];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* 1. Quick Answers Banner: Immediate Cohort Highlights */}
      <div className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <h2 className="text-sm font-semibold text-zinc-900 tracking-tight">
              Immediate Cohort Findings
            </h2>
          </div>
          <span className="text-xs text-zinc-500">
            Based on {logs.length} multi-signal daily records
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-3">
          <div className="p-3 bg-zinc-50/70 border border-zinc-200/80 rounded-xl space-y-1">
            <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">
              Most Regular Routine
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-base font-bold text-zinc-900">{mostRegularUser.profile.display_name}</span>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                {mostRegularUser.circ.routineConsistencyScore}/100 Regular
              </span>
            </div>
            <p className="text-xs text-zinc-600">
              Wake proxy variability ±{mostRegularUser.circ.morningUnlockStdDevMins}m, bedtime ±{mostRegularUser.circ.nightUnlockStdDevMins}m.
            </p>
          </div>

          <div className="p-3 bg-zinc-50/70 border border-zinc-200/80 rounded-xl space-y-1">
            <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">
              Greatest Rhythm Drift
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-base font-bold text-zinc-900">{greatestDriftUser.profile.display_name}</span>
              <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
                {greatestDriftUser.circ.rhythmDriftFormatted}
              </span>
            </div>
            <p className="text-xs text-zinc-600">
              Median bedtime {greatestDriftUser.circ.medianNightUnlock}, wake {greatestDriftUser.circ.medianMorningUnlock}.
            </p>
          </div>

          <div className="p-3 bg-zinc-50/70 border border-zinc-200/80 rounded-xl space-y-1">
            <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">
              Highest Checking Intensity
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-base font-bold text-zinc-900">{highestCheckingUser.profile.display_name}</span>
              <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
                {highestCheckingUser.stats.unlocksMean} checks/day
              </span>
            </div>
            <p className="text-xs text-zinc-600">
              Avg session: {highestCheckingUser.stats.avgSessionMean} mins (micro-checking pattern).
            </p>
          </div>

          <div className="p-3 bg-zinc-50/70 border border-zinc-200/80 rounded-xl space-y-1">
            <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">
              Prolonged Engagement
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-base font-bold text-zinc-900">{longestSessionUser.profile.display_name}</span>
              <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">
                {longestSessionUser.stats.screenTimeMean} mins/day
              </span>
            </div>
            <p className="text-xs text-zinc-600">
              Avg session: {longestSessionUser.stats.avgSessionMean} mins (deep digital immersion).
            </p>
          </div>
        </div>
      </div>

      {/* 2. Primary Feature: Circadian Rhythm Alignment Cards */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg font-bold text-zinc-900 tracking-tight">
                Circadian Rhythm Analysis
              </h2>
            </div>
            <p className="text-xs text-zinc-500">
              Estimates concordance with reference target ({circadianConfig.referenceNightUnlock} night proxy, {circadianConfig.referenceMorningUnlock} wake proxy, {(circadianConfig.referenceSleepMinsTarget / 60).toFixed(0)}h sleep).
            </p>
          </div>
          <button
            onClick={onOpenConfigModal}
            className="self-start sm:self-auto text-xs text-indigo-600 hover:text-indigo-800 font-medium hover:underline flex items-center gap-1"
          >
            Adjust Target Baseline & Weights &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {userData.map(({ profile, circ }) => {
            const isHigh = circ.overallScore >= 80;
            const isMod = circ.overallScore >= 60 && circ.overallScore < 80;
            const badgeBg = isHigh ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : (isMod ? 'bg-teal-50 text-teal-700 border-teal-200' : 'bg-amber-50 text-amber-700 border-amber-200');

            return (
              <div 
                key={profile.id}
                className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-xs space-y-4 hover:border-zinc-300 transition-colors"
              >
                {/* User Header */}
                <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                  <div>
                    <button
                      onClick={() => onNavigateToUser(profile.id)}
                      className="text-base font-bold text-zinc-900 hover:text-indigo-600 transition-colors flex items-center gap-1"
                    >
                      <span>{profile.display_name}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
                    </button>
                    <span className="text-xs text-zinc-500">
                      {circ.medianNightUnlock} &rarr; {circ.medianMorningUnlock} ({circ.medianSleepDurationMins}m sleep)
                    </span>
                  </div>
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${badgeBg}`}>
                    {circ.overallScore} / 100
                  </span>
                </div>

                {/* Status & Drift */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-500">Classification:</span>
                    <span className="font-semibold text-zinc-800">{circ.alignmentLevel}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-500">Rhythm Drift:</span>
                    <span className="font-semibold text-zinc-800 font-mono">{circ.rhythmDriftFormatted}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-500">Schedule Regularity:</span>
                    <span className="font-semibold text-emerald-700">{circ.routineConsistencyScore} / 100</span>
                  </div>
                </div>

                {/* 5-Component Normalized Breakdown */}
                <div className="space-y-2 pt-2 border-t border-zinc-100">
                  <div className="flex justify-between items-center text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
                    <span>Component Breakdown</span>
                    <span>Score & Contribution</span>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    {[
                      { label: 'Night Phone Activity', score: circ.breakdown.nightAlignmentScore, contrib: circ.breakdown.nightContribution, weight: circadianConfig.weightNightUnlock },
                      { label: 'Morning Wake Timing', score: circ.breakdown.morningAlignmentScore, contrib: circ.breakdown.morningContribution, weight: circadianConfig.weightMorningUnlock },
                      { label: 'Sleep-Wake Consistency', score: circ.breakdown.consistencyScore, contrib: circ.breakdown.consistencyContribution, weight: circadianConfig.weightConsistency },
                      { label: 'Sleep Duration Target', score: circ.breakdown.sleepDurationScore, contrib: circ.breakdown.sleepDurationContribution, weight: circadianConfig.weightSleepDuration },
                      { label: 'Weekend Stability', score: circ.breakdown.weekendStabilityScore, contrib: circ.breakdown.weekendStabilityContribution, weight: circadianConfig.weightWeekendStability },
                    ].map((comp, idx) => (
                      <div key={idx} className="space-y-0.5">
                        <div className="flex justify-between text-[11px] text-zinc-600">
                          <span>{comp.label} ({Math.round(comp.weight * 100)}%)</span>
                          <span className="font-mono text-zinc-800">
                            {comp.score}% <span className="text-zinc-400">({comp.contrib} pts)</span>
                          </span>
                        </div>
                        <div className="w-full bg-zinc-100 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-indigo-600 h-full rounded-full"
                            style={{ width: `${comp.score}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Routine Consistency vs Reference Alignment Callout */}
                <div className="p-3 bg-zinc-50 rounded-xl text-xs text-zinc-600 border border-zinc-200/70 space-y-1">
                  <div className="flex items-center gap-1 font-semibold text-zinc-900">
                    <Info className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Consistency vs Alignment</span>
                  </div>
                  <p className="leading-relaxed text-[11px]">
                    {circ.routineConsistencyScore >= 75 && circ.overallScore < 75
                      ? 'Maintains an internally consistent schedule, though it is chronotypically delayed relative to the conventional reference.'
                      : (circ.routineConsistencyScore >= 75 && circ.overallScore >= 75
                          ? 'Synchronized with both high internal day-to-day stability and conventional diurnal reference timing.'
                          : 'Demonstrates notable day-to-day timing dispersion and social jetlag between weekdays and weekends.')}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Combined Behavioral Performance Profile */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-600" />
          <div>
            <h2 className="text-lg font-bold text-zinc-900 tracking-tight">
              Behavioral Performance Profiles
            </h2>
            <p className="text-xs text-zinc-500">
              Synthesizes diurnal routine, digital engagement structure, physical activity, and predicted productivity into an interpretable profile.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {userData.map(({ profile, perfProfile }) => (
            <div
              key={profile.id}
              className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-xs space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-base text-zinc-900">{profile.display_name}</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                    {perfProfile.archetypeTag}
                  </span>
                </div>

                {/* Dimension Scores Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <div className="p-2 bg-zinc-50 rounded-lg border border-zinc-100">
                    <span className="text-zinc-500 text-[11px] block">Circadian Alignment</span>
                    <span className="text-sm font-bold text-zinc-900">{perfProfile.circadianAlignmentScore}/100</span>
                  </div>
                  <div className="p-2 bg-zinc-50 rounded-lg border border-zinc-100">
                    <span className="text-zinc-500 text-[11px] block">Routine Regularity</span>
                    <span className="text-sm font-bold text-zinc-900">{perfProfile.routineConsistencyScore}/100</span>
                  </div>
                  <div className="p-2 bg-zinc-50 rounded-lg border border-zinc-100">
                    <span className="text-zinc-500 text-[11px] block">Phone Engagement</span>
                    <span className="text-sm font-bold text-zinc-900">{perfProfile.phoneEngagementScore}/100</span>
                  </div>
                  <div className="p-2 bg-zinc-50 rounded-lg border border-zinc-100">
                    <span className="text-zinc-500 text-[11px] block">Physical Activity</span>
                    <span className="text-sm font-bold text-zinc-900">{perfProfile.physicalActivityScore}/100</span>
                  </div>
                </div>

                {/* Synthesis Narrative */}
                <div className="pt-2 text-xs text-zinc-700 leading-relaxed border-t border-zinc-100">
                  <p>{perfProfile.summaryNarrative}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-100">
                <button
                  onClick={() => onNavigateToUser(profile.id)}
                  className="w-full py-1.5 text-xs font-medium text-zinc-700 hover:text-indigo-600 bg-zinc-50 hover:bg-zinc-100 rounded-lg transition-colors border border-zinc-200"
                >
                  View Full Behavioral History &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
