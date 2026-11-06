'use client';

import React, { useState } from 'react';
import { 
  Profile, 
  DailyLog, 
  Prediction, 
  Feedback, 
  CircadianReferenceConfig 
} from '@/types/database';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid 
} from 'recharts';
import { parseMorningTimeToMinutes, parseNightTimeToMidnightMinutes } from '@/lib/circadianEngine';
import { calculateMean } from '@/lib/statisticsEngine';
import { Moon, Smartphone, Activity, ShieldCheck } from 'lucide-react';

interface CompareTabProps {
  profiles: Profile[];
  selectedUserIds: string[];
  logs: DailyLog[];
  predictions: Prediction[];
  feedback: Feedback[];
  circadianConfig: CircadianReferenceConfig;
}

const USER_COLORS: Record<string, string> = {
  anshik: '#4f46e5', // Indigo
  aditya: '#ea580c', // Orange/Amber
  yash: '#0d9488',   // Teal
};

function getUserColor(displayName: string, index: number): string {
  const key = displayName.toLowerCase();
  if (USER_COLORS[key]) return USER_COLORS[key];
  const fallback = ['#4f46e5', '#ea580c', '#0d9488', '#8b5cf6', '#ec4899'];
  return fallback[index % fallback.length];
}

type TimelineMetricPoint = Record<string, string | number | null>;

export function CompareTab({
  profiles,
  selectedUserIds,
  logs,
  predictions
}: CompareTabProps) {
  const [activeMetric, setActiveMetric] = useState<
    'screen_unlocks' | 'sleep_wake' | 'activity' | 'predictions'
  >('screen_unlocks');

  const selectedProfiles = profiles.filter(p => selectedUserIds.includes(p.id));

  if (selectedProfiles.length === 0 || logs.length === 0) {
    return (
      <div className="p-12 text-center bg-white border border-zinc-200 rounded-2xl shadow-xs space-y-3">
        <Activity className="w-10 h-10 text-zinc-400 mx-auto" />
        <h3 className="text-base font-semibold text-zinc-900">No Comparative Data</h3>
        <p className="text-sm text-zinc-500 max-w-md mx-auto">
          Select at least one user with logged behavioral records to display comparative charts.
        </p>
      </div>
    );
  }

  // Build sorted unique dates across all selected users
  const relevantLogs = logs.filter(l => selectedUserIds.includes(l.user_id));
  const uniqueDates = Array.from(new Set(relevantLogs.map(l => l.date))).sort();

  // Create unified timeline data points
  const timelineData: TimelineMetricPoint[] = uniqueDates.map(date => {
    const point: TimelineMetricPoint = { date: date.slice(5) }; // "MM-DD"
    selectedProfiles.forEach(p => {
      const userLog = relevantLogs.find(l => l.user_id === p.id && l.date === date);
      const userPred = predictions.find(pr => pr.user_id === p.id && pr.date === date);

      if (userLog) {
        point[`${p.display_name}_screen`] = userLog.total_screen_time_mins;
        point[`${p.display_name}_unlocks`] = userLog.unlock_count;
        point[`${p.display_name}_session`] = userLog.avg_session_length_mins;
        point[`${p.display_name}_sleep`] = userLog.sleep_duration_estimate_mins;
        point[`${p.display_name}_steps`] = userLog.step_count;
        point[`${p.display_name}_active`] = userLog.active_minutes;

        // Night unlock (minutes relative to midnight)
        point[`${p.display_name}_night`] = parseNightTimeToMidnightMinutes(userLog.last_unlock_prev_night);
        // Morning unlock (minutes past midnight)
        point[`${p.display_name}_morning`] = parseMorningTimeToMinutes(userLog.first_unlock_morning);
      }

      if (userPred) {
        point[`${p.display_name}_conf`] = Math.round(userPred.confidence_score * 100);
      }
    });
    return point;
  });

  // Weekday vs Weekend aggregation for grouped bar chart
  const weekdayWeekendData = selectedProfiles.map(p => {
    const uLogs = relevantLogs.filter(l => l.user_id === p.id);
    const weekdayLogs = uLogs.filter(l => l.day_of_week !== 'Saturday' && l.day_of_week !== 'Sunday');
    const weekendLogs = uLogs.filter(l => l.day_of_week === 'Saturday' || l.day_of_week === 'Sunday');

    const weekdayScreen = calculateMean(weekdayLogs.map(l => l.total_screen_time_mins).filter((v): v is number => v !== null));
    const weekendScreen = calculateMean(weekendLogs.map(l => l.total_screen_time_mins).filter((v): v is number => v !== null));

    const weekdayWake = calculateMean(weekdayLogs.map(l => parseMorningTimeToMinutes(l.first_unlock_morning)).filter((v): v is number => v !== null));
    const weekendWake = calculateMean(weekendLogs.map(l => parseMorningTimeToMinutes(l.first_unlock_morning)).filter((v): v is number => v !== null));

    const weekdaySteps = calculateMean(weekdayLogs.map(l => l.step_count).filter((v): v is number => v !== null));
    const weekendSteps = calculateMean(weekendLogs.map(l => l.step_count).filter((v): v is number => v !== null));

    return {
      name: p.display_name,
      weekdayScreen: Math.round(weekdayScreen),
      weekendScreen: Math.round(weekendScreen),
      weekdayWake: Math.round(weekdayWake),
      weekendWake: Math.round(weekendWake),
      weekdaySteps: Math.round(weekdaySteps),
      weekendSteps: Math.round(weekendSteps),
    };
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Metric Selector Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white p-4 rounded-2xl border border-zinc-200 shadow-xs">
        <div>
          <h2 className="text-base font-bold text-zinc-900 tracking-tight">
            Comparative Behavioral Dynamics
          </h2>
          <p className="text-xs text-zinc-500">
            Compare longitudinal trends, schedule shifts, and behavioral features across {selectedProfiles.length} selected users.
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-zinc-100 p-1 rounded-xl text-xs flex-wrap">
          {[
            { id: 'screen_unlocks' as const, label: 'Screen & Unlocks', icon: Smartphone },
            { id: 'sleep_wake' as const, label: 'Sleep & Wake Timing', icon: Moon },
            { id: 'activity' as const, label: 'Steps & Physical Activity', icon: Activity },
            { id: 'predictions' as const, label: 'Model Confidence', icon: ShieldCheck },
          ].map(m => {
            const Icon = m.icon;
            const isActive = activeMetric === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setActiveMetric(m.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  isActive
                    ? 'bg-white text-zinc-900 shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{m.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Main Chart Container */}
      <div className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
          <div>
            <h3 className="text-sm font-semibold text-zinc-900">
              {activeMetric === 'screen_unlocks' && 'Daily Screen Time (Minutes)'}
              {activeMetric === 'sleep_wake' && 'First Morning Wake Unlock Proxy (Local Time)'}
              {activeMetric === 'activity' && 'Daily Step Count'}
              {activeMetric === 'predictions' && 'Model Prediction Confidence (%)'}
            </h3>
            <p className="text-xs text-zinc-500">
              {activeMetric === 'screen_unlocks' && 'Evaluates overall phone engagement volume across daily records.'}
              {activeMetric === 'sleep_wake' && 'Evaluates morning wake timing stability and diurnal anchoring.'}
              {activeMetric === 'activity' && 'Evaluates daytime aerobic movement and physical exertion.'}
              {activeMetric === 'predictions' && 'Evaluates algorithmic confidence score trajectories over time.'}
            </p>
          </div>
        </div>

        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timelineData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" />
              <XAxis dataKey="date" stroke="#71717a" fontSize={11} tickLine={false} />
              
              {activeMetric === 'screen_unlocks' && (
                <YAxis stroke="#71717a" fontSize={11} unit="m" tickLine={false} />
              )}
              {activeMetric === 'sleep_wake' && (
                <YAxis 
                  stroke="#71717a" 
                  fontSize={11} 
                  tickLine={false}
                  domain={[360, 660]} // 6:00 AM (360) to 11:00 AM (660)
                  tickFormatter={val => `${Math.floor(val / 60)}:${val % 60 === 0 ? '00' : val % 60}`}
                />
              )}
              {activeMetric === 'activity' && (
                <YAxis stroke="#71717a" fontSize={11} tickLine={false} tickFormatter={val => `${(val / 1000).toFixed(0)}k`} />
              )}
              {activeMetric === 'predictions' && (
                <YAxis stroke="#71717a" fontSize={11} unit="%" domain={[50, 100]} tickLine={false} />
              )}

              <Tooltip 
                contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e4e4e7', borderRadius: '0.75rem', fontSize: '12px' }}
                formatter={(val: unknown, name: unknown) => {
                  if (activeMetric === 'sleep_wake' && typeof val === 'number') {
                    const h = Math.floor(val / 60);
                    const m = Math.round(val % 60);
                    return [`${h}:${m < 10 ? `0${m}` : m} AM`, String(name)];
                  }
                  return [String(val ?? ''), String(name ?? '')];
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />

              {selectedProfiles.map((p, idx) => {
                const color = getUserColor(p.display_name, idx);
                let dataKey = `${p.display_name}_screen`;
                if (activeMetric === 'sleep_wake') dataKey = `${p.display_name}_morning`;
                if (activeMetric === 'activity') dataKey = `${p.display_name}_steps`;
                if (activeMetric === 'predictions') dataKey = `${p.display_name}_conf`;

                return (
                  <Line
                    key={p.id}
                    type="monotone"
                    dataKey={dataKey}
                    name={p.display_name}
                    stroke={color}
                    strokeWidth={2}
                    dot={{ r: 2.5, fill: color }}
                    activeDot={{ r: 5 }}
                    connectNulls={false}
                  />
                );
              })}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Secondary Chart: Daily Unlock Count vs Session Length */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Unlocks Line Chart */}
        <div className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
            <h3 className="text-sm font-semibold text-zinc-900">
              Daily Unlock Frequency (Checks / Day)
            </h3>
            <span className="text-[11px] text-zinc-500">Attention Fragmentation</span>
          </div>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timelineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" />
                <XAxis dataKey="date" stroke="#71717a" fontSize={10} tickLine={false} />
                <YAxis stroke="#71717a" fontSize={10} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e4e4e7', borderRadius: '0.75rem', fontSize: '11px' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                {selectedProfiles.map((p, idx) => (
                  <Line
                    key={p.id}
                    type="monotone"
                    dataKey={`${p.display_name}_unlocks`}
                    name={p.display_name}
                    stroke={getUserColor(p.display_name, idx)}
                    strokeWidth={2}
                    dot={false}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Estimated Sleep Duration */}
        <div className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
            <h3 className="text-sm font-semibold text-zinc-900">
              Estimated Sleep Duration (Minutes)
            </h3>
            <span className="text-[11px] text-zinc-500">Target 420-540m (7-9 hrs)</span>
          </div>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timelineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" />
                <XAxis dataKey="date" stroke="#71717a" fontSize={10} tickLine={false} />
                <YAxis stroke="#71717a" fontSize={10} domain={[300, 600]} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e4e4e7', borderRadius: '0.75rem', fontSize: '11px' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                {selectedProfiles.map((p, idx) => (
                  <Line
                    key={p.id}
                    type="monotone"
                    dataKey={`${p.display_name}_sleep`}
                    name={p.display_name}
                    stroke={getUserColor(p.display_name, idx)}
                    strokeWidth={2}
                    dot={false}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Weekday vs Weekend Comparison: Grouped Bar Chart */}
      <div className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
          <div>
            <h3 className="text-sm font-semibold text-zinc-900">
              Weekday vs Weekend Schedule Shifts (Social Jetlag)
            </h3>
            <p className="text-xs text-zinc-500">
              Compares average screen time and wake proxies between workdays and weekends.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Screen Time Bar */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-zinc-700">Average Screen Time (mins)</span>
            <div className="h-52 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weekdayWeekendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" />
                  <XAxis dataKey="name" stroke="#71717a" fontSize={11} tickLine={false} />
                  <YAxis stroke="#71717a" fontSize={11} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e4e4e7', borderRadius: '0.75rem', fontSize: '11px' }} />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Bar dataKey="weekdayScreen" name="Weekday Screen" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="weekendScreen" name="Weekend Screen" fill="#ec4899" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Daily Steps Bar */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-zinc-700">Average Daily Step Count</span>
            <div className="h-52 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weekdayWeekendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" />
                  <XAxis dataKey="name" stroke="#71717a" fontSize={11} tickLine={false} />
                  <YAxis stroke="#71717a" fontSize={11} tickLine={false} tickFormatter={val => `${(val / 1000).toFixed(0)}k`} />
                  <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e4e4e7', borderRadius: '0.75rem', fontSize: '11px' }} />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Bar dataKey="weekdaySteps" name="Weekday Steps" fill="#0d9488" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="weekendSteps" name="Weekend Steps" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
