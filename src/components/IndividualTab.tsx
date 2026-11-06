'use client';

import React, { useState } from 'react';
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
  User, 
  Star, 
  TrendingUp, 
  ChevronDown, 
  ChevronUp, 
  Search
} from 'lucide-react';

interface IndividualTabProps {
  profiles: Profile[];
  selectedUserIds: string[];
  activeUserId: string;
  setActiveUserId: (id: string) => void;
  logs: DailyLog[];
  predictions: Prediction[];
  feedback: Feedback[];
  circadianConfig: CircadianReferenceConfig;
}

export function IndividualTab({
  profiles,
  selectedUserIds,
  activeUserId,
  setActiveUserId,
  logs,
  predictions,
  feedback,
  circadianConfig
}: IndividualTabProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);

  // Fallback to first available if activeUserId not in selected
  const currentProfile = profiles.find(p => p.id === activeUserId) || profiles[0];
  if (!currentProfile) {
    return (
      <div className="p-12 text-center bg-white border border-zinc-200 rounded-2xl shadow-xs">
        <p className="text-zinc-500">No profile selected.</p>
      </div>
    );
  }

  const uLogs = logs.filter(l => l.user_id === currentProfile.id).sort((a, b) => b.date.localeCompare(a.date));
  const uPreds = predictions.filter(p => p.user_id === currentProfile.id);
  const uFeed = feedback.filter(f => f.user_id === currentProfile.id);

  const circ = calculateCircadianMetrics(currentProfile.id, uLogs, circadianConfig);
  const stats = computeUserStatisticsSummary(currentProfile.id, currentProfile.display_name, uLogs, uPreds, uFeed);
  const inferences = generateBehavioralInferences(currentProfile.id, currentProfile.display_name, uLogs, uPreds, uFeed);
  const perfProfile = buildBehavioralProfile(currentProfile, uLogs, uPreds, uFeed);

  // Predictions and feedback map for quick lookup
  const predMap = new Map<string, Prediction>();
  uPreds.forEach(p => predMap.set(p.date, p));

  const feedMap = new Map<string, Feedback>();
  uFeed.forEach(f => feedMap.set(f.date, f));

  // Filter logs for search
  const filteredLogs = uLogs.filter(l => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      l.date.includes(term) ||
      l.day_of_week.toLowerCase().includes(term) ||
      (l.dominant_app_category && l.dominant_app_category.toLowerCase().includes(term)) ||
      (l.primary_activity && l.primary_activity.toLowerCase().includes(term))
    );
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* User Switcher Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white p-5 rounded-2xl border border-zinc-200 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-xs">
            {currentProfile.display_name[0]}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-zinc-900 tracking-tight">
                {currentProfile.display_name}
              </h2>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                {perfProfile.archetypeTag}
              </span>
            </div>
            <p className="text-xs text-zinc-500 font-mono">
              User ID: {currentProfile.id} {currentProfile.age ? `• Age: ${currentProfile.age} yrs` : ''}
            </p>
          </div>
        </div>

        {/* User Switch Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-500">Switch User:</span>
          <select
            value={currentProfile.id}
            onChange={e => setActiveUserId(e.target.value)}
            className="text-xs font-medium px-3 py-1.5 bg-zinc-50 border border-zinc-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-zinc-800"
          >
            {profiles.map(p => (
              <option key={p.id} value={p.id}>
                {p.display_name} {selectedUserIds.includes(p.id) ? '(Selected)' : ''}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Top Behavioral Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="p-4 bg-white border border-zinc-200 rounded-xl shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">
            Circadian Alignment
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-bold text-zinc-900">{circ.overallScore}</span>
            <span className="text-xs text-zinc-400">/ 100</span>
          </div>
          <span className="text-[11px] font-medium text-indigo-600 block">{circ.alignmentLevel}</span>
        </div>

        <div className="p-4 bg-white border border-zinc-200 rounded-xl shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">
            Rhythm Drift
          </span>
          <div className="text-sm font-bold text-zinc-900 truncate" title={circ.rhythmDriftFormatted}>
            {circ.rhythmDriftFormatted}
          </div>
          <span className="text-[11px] text-zinc-500 block">Bedtime proxy {circ.medianNightUnlock}</span>
        </div>

        <div className="p-4 bg-white border border-zinc-200 rounded-xl shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">
            Schedule Consistency
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-bold text-emerald-700">{circ.routineConsistencyScore}</span>
            <span className="text-xs text-zinc-400">/ 100</span>
          </div>
          <span className="text-[11px] text-zinc-500 block">Wake std dev: ±{circ.morningUnlockStdDevMins}m</span>
        </div>

        <div className="p-4 bg-white border border-zinc-200 rounded-xl shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">
            Avg Screen Time
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-bold text-zinc-900">{stats.screenTimeMean}</span>
            <span className="text-xs text-zinc-500">mins/day</span>
          </div>
          <span className="text-[11px] text-zinc-500 block">{stats.unlocksMean} checks • {stats.avgSessionMean}m session</span>
        </div>

        <div className="p-4 bg-white border border-zinc-200 rounded-xl shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">
            Predicted Productive
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-bold text-purple-700">{Math.round(stats.predictiveDaysRatio * 100)}%</span>
            <span className="text-xs text-zinc-400">of days</span>
          </div>
          <span className="text-[11px] text-zinc-500 block">Avg confidence: {(stats.avgConfidence * 100).toFixed(0)}%</span>
        </div>
      </div>

      {/* Synthesis Narrative & Chronological Adaptation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-zinc-200 rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-zinc-100">
            <User className="w-4 h-4 text-indigo-600" />
            <h3 className="text-sm font-semibold text-zinc-900">
              Personal Behavioral Synthesis
            </h3>
          </div>
          <p className="text-xs text-zinc-700 leading-relaxed">
            {perfProfile.summaryNarrative}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200/60 space-y-1">
              <span className="text-[11px] font-semibold text-zinc-500 uppercase">Sleep Metrics</span>
              <p className="text-xs text-zinc-800">
                Median sleep duration: <strong>{circ.medianSleepDurationMins} mins</strong> (~{(circ.medianSleepDurationMins / 60).toFixed(1)} hrs). Standard deviation: ±{stats.sleepDurationStdDev} mins.
              </p>
            </div>
            <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200/60 space-y-1">
              <span className="text-[11px] font-semibold text-zinc-500 uppercase">Physical Activity</span>
              <p className="text-xs text-zinc-800">
                Daily step average: <strong>{stats.stepsMean.toLocaleString()} steps</strong>. Estimated active duration: <strong>{stats.activeMinsMean} mins/day</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Earlier vs Recent Period Adaptation Card */}
        <div className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-zinc-100">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-semibold text-zinc-900">
              Longitudinal Adaptation
            </h3>
          </div>
          <p className="text-[11px] text-zinc-500">
            Comparing the first half of observation vs the second half:
          </p>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-50 border border-zinc-100">
              <span className="text-zinc-600">Screen Time Shift:</span>
              <span className={`font-semibold ${stats.earlierVsRecentScreenDelta <= 0 ? 'text-emerald-700' : 'text-amber-700'}`}>
                {stats.earlierVsRecentScreenDelta > 0 ? `+${stats.earlierVsRecentScreenDelta}m` : `${stats.earlierVsRecentScreenDelta}m`}
              </span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-50 border border-zinc-100">
              <span className="text-zinc-600">Morning Wake Shift:</span>
              <span className="font-semibold text-zinc-800">
                {stats.earlierVsRecentWakeDeltaMins > 0 ? `+${stats.earlierVsRecentWakeDeltaMins}m later` : `${Math.abs(stats.earlierVsRecentWakeDeltaMins)}m earlier`}
              </span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-50 border border-zinc-100">
              <span className="text-zinc-600">Model Confidence Delta:</span>
              <span className={`font-semibold ${stats.earlierVsRecentConfidenceDelta >= 0 ? 'text-indigo-700' : 'text-zinc-600'}`}>
                {stats.earlierVsRecentConfidenceDelta > 0 ? `+${(stats.earlierVsRecentConfidenceDelta * 100).toFixed(0)}%` : `${(stats.earlierVsRecentConfidenceDelta * 100).toFixed(0)}%`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Inferences for this user */}
      {inferences.length > 0 && (
        <div className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
            <h3 className="text-sm font-semibold text-zinc-900">
              Active Behavioral Inferences for {currentProfile.display_name} ({inferences.length})
            </h3>
            <span className="text-[11px] text-zinc-500">Evidence-Backed Patterns</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {inferences.map(inf => (
              <div key={inf.id} className="p-3 bg-zinc-50 rounded-xl border border-zinc-200/60 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-zinc-900">{inf.title}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                    {inf.strength} Strength
                  </span>
                </div>
                <p className="text-zinc-700">{inf.inference}</p>
                <p className="text-[11px] text-zinc-500 font-mono">{inf.evidence}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Daily Logs Table with Expandable Details */}
      <div className="bg-white border border-zinc-200 rounded-2xl shadow-xs overflow-hidden space-y-3 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-zinc-100">
          <div>
            <h3 className="text-sm font-semibold text-zinc-900">
              Daily Behavioral Observations & Predictions ({filteredLogs.length} days)
            </h3>
            <p className="text-xs text-zinc-500">
              Click any row to inspect underlying context, reasons, and user feedback notes.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search date, activity, app..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full text-xs pl-8 pr-3 py-1.5 bg-zinc-50 border border-zinc-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-700">
            <thead className="bg-zinc-50 text-[11px] text-zinc-500 font-semibold uppercase tracking-wider border-b border-zinc-200">
              <tr>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Night Proxy</th>
                <th className="py-2.5 px-3">Wake Proxy</th>
                <th className="py-2.5 px-3">Sleep Mins</th>
                <th className="py-2.5 px-3">Screen Time</th>
                <th className="py-2.5 px-3">Unlocks</th>
                <th className="py-2.5 px-3">Steps</th>
                <th className="py-2.5 px-3">Prediction</th>
                <th className="py-2.5 px-3">Feedback</th>
                <th className="py-2.5 px-3 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filteredLogs.map(log => {
                const isExpanded = expandedLogId === log.date;
                const pred = predMap.get(log.date);
                const feed = feedMap.get(log.date);

                return (
                  <React.Fragment key={log.date}>
                    <tr
                      onClick={() => setExpandedLogId(isExpanded ? null : log.date)}
                      className={`cursor-pointer hover:bg-zinc-50/80 transition-colors ${
                        isExpanded ? 'bg-indigo-50/20' : ''
                      }`}
                    >
                      <td className="py-2.5 px-3 font-medium text-zinc-900">
                        {log.date} <span className="text-[10px] text-zinc-400 block">{log.day_of_week.slice(0, 3)}</span>
                      </td>
                      <td className="py-2.5 px-3 font-mono">{log.last_unlock_prev_night || '—'}</td>
                      <td className="py-2.5 px-3 font-mono">{log.first_unlock_morning || '—'}</td>
                      <td className="py-2.5 px-3">{log.sleep_duration_estimate_mins ? `${log.sleep_duration_estimate_mins}m` : '—'}</td>
                      <td className="py-2.5 px-3 font-medium">{log.total_screen_time_mins ? `${log.total_screen_time_mins}m` : '—'}</td>
                      <td className="py-2.5 px-3">{log.unlock_count ?? '—'}</td>
                      <td className="py-2.5 px-3">{log.step_count ? log.step_count.toLocaleString() : '—'}</td>
                      <td className="py-2.5 px-3">
                        {pred ? (
                          <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] font-medium ${
                            pred.is_predictive ? 'bg-emerald-50 text-emerald-700' : 'bg-zinc-100 text-zinc-600'
                          }`}>
                            {pred.is_predictive ? 'Productive' : 'Lower'}
                            <span className="text-[10px] text-zinc-400">({Math.round(pred.confidence_score * 100)}%)</span>
                          </span>
                        ) : '—'}
                      </td>
                      <td className="py-2.5 px-3">
                        {feed ? (
                          <span className="flex items-center text-amber-500 font-semibold">
                            {feed.rating} <Star className="w-3 h-3 fill-amber-400 ml-0.5" />
                          </span>
                        ) : (
                          <span className="text-zinc-400">None</span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        {isExpanded ? <ChevronUp className="w-4 h-4 inline text-zinc-400" /> : <ChevronDown className="w-4 h-4 inline text-zinc-400" />}
                      </td>
                    </tr>

                    {/* Expanded Detail Row */}
                    {isExpanded && (
                      <tr className="bg-zinc-50/60">
                        <td colSpan={10} className="p-4 border-t border-b border-indigo-100">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                            <div className="space-y-1">
                              <span className="font-semibold text-zinc-700 block">Contextual Telemetry:</span>
                              <p className="text-zinc-600">Dominant App: <strong>{log.dominant_app_category || 'N/A'}</strong></p>
                              <p className="text-zinc-600">Primary Activity: <strong>{log.primary_activity || 'N/A'}</strong> ({log.active_minutes || 0} active mins)</p>
                              <p className="text-zinc-600">Away from Home: <strong>{log.away_from_home_mins || 0} mins</strong> | Weather: <strong>{log.weather_condition || 'N/A'}</strong></p>
                            </div>

                            <div className="space-y-1">
                              <span className="font-semibold text-zinc-700 block">Model Reasoning Tags:</span>
                              {pred && pred.reason_tags && pred.reason_tags.length > 0 ? (
                                <div className="flex flex-wrap gap-1 pt-0.5">
                                  {pred.reason_tags.map(tag => (
                                    <span key={tag} className="px-2 py-0.5 bg-white border border-zinc-200 rounded text-[11px] text-zinc-600">
                                      {tag.replace(/_/g, ' ')}
                                    </span>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-zinc-400">No reason tags recorded</p>
                              )}
                            </div>

                            <div className="space-y-1">
                              <span className="font-semibold text-zinc-700 block">User Self-Evaluation:</span>
                              {feed ? (
                                <div className="space-y-0.5">
                                  <p className="font-semibold text-zinc-800">Rating: {feed.rating} / 5 stars</p>
                                  {feed.note && <p className="italic text-zinc-600">&ldquo;{feed.note}&rdquo;</p>}
                                </div>
                              ) : (
                                <p className="text-zinc-400 italic">No feedback submitted for this date</p>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
