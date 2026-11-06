'use client';

import React, { useState } from 'react';
import { Sliders, X, RotateCcw, Clock, Moon, Sun, Scale } from 'lucide-react';
import { CircadianReferenceConfig } from '@/types/database';
import { DEFAULT_CIRCADIAN_CONFIG } from '@/lib/circadianEngine';

interface CircadianConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: CircadianReferenceConfig;
  onSaveConfig: (newConfig: CircadianReferenceConfig) => void;
}

export function CircadianConfigModal({
  isOpen,
  onClose,
  config,
  onSaveConfig
}: CircadianConfigModalProps) {
  const [form, setForm] = useState<CircadianReferenceConfig>({ ...config });

  if (!isOpen) return null;

  const handleReset = () => {
    setForm({ ...DEFAULT_CIRCADIAN_CONFIG });
  };

  const handleSave = () => {
    onSaveConfig(form);
    onClose();
  };

  const totalWeightPercent = Math.round(
    (form.weightNightUnlock +
      form.weightMorningUnlock +
      form.weightConsistency +
      form.weightSleepDuration +
      form.weightWeekendStability) * 100
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white border border-zinc-200 rounded-2xl shadow-xl max-w-lg w-full p-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-50 text-teal-700 border border-teal-100">
              <Sliders className="w-3.5 h-3.5" />
              <span>Circadian Reference Engine</span>
            </div>
            <h2 className="text-lg font-bold text-zinc-900 tracking-tight">
              Configurable Baseline & Weights
            </h2>
            <p className="text-xs text-zinc-500">
              Adjust baseline reference anchors and component weightings. All scores and drift calculations update dynamically.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Reference Anchors */}
        <div className="space-y-4">
          <h3 className="text-xs font-semibold text-zinc-900 uppercase tracking-wider">
            1. Target Schedule Anchors
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="flex items-center gap-1 text-xs font-medium text-zinc-700 mb-1">
                <Moon className="w-3.5 h-3.5 text-indigo-600" />
                <span>Reference Bedtime Proxy</span>
              </label>
              <input
                type="time"
                value={form.referenceNightUnlock}
                onChange={e => setForm({ ...form, referenceNightUnlock: e.target.value })}
                className="w-full text-sm px-3 py-1.5 border border-zinc-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
              <span className="text-[11px] text-zinc-500">Default: 23:00 (11:00 PM)</span>
            </div>

            <div>
              <label className="flex items-center gap-1 text-xs font-medium text-zinc-700 mb-1">
                <Sun className="w-3.5 h-3.5 text-amber-600" />
                <span>Reference Wake Proxy</span>
              </label>
              <input
                type="time"
                value={form.referenceMorningUnlock}
                onChange={e => setForm({ ...form, referenceMorningUnlock: e.target.value })}
                className="w-full text-sm px-3 py-1.5 border border-zinc-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
              <span className="text-[11px] text-zinc-500">Default: 07:00 (7:00 AM)</span>
            </div>
          </div>

          <div>
            <label className="flex items-center gap-1 text-xs font-medium text-zinc-700 mb-1">
              <Clock className="w-3.5 h-3.5 text-teal-600" />
              <span>Target Sleep Duration: {(form.referenceSleepMinsTarget / 60).toFixed(1)} hrs ({form.referenceSleepMinsTarget} mins)</span>
            </label>
            <input
              type="range"
              min="360"
              max="600"
              step="15"
              value={form.referenceSleepMinsTarget}
              onChange={e => setForm({ ...form, referenceSleepMinsTarget: Number(e.target.value) })}
              className="w-full accent-teal-600"
            />
            <div className="flex justify-between text-[11px] text-zinc-400">
              <span>6 hrs (360m)</span>
              <span>8 hrs (480m)</span>
              <span>10 hrs (600m)</span>
            </div>
          </div>
        </div>

        {/* Weights Configuration */}
        <div className="space-y-3 pt-2 border-t border-zinc-100">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-zinc-900 uppercase tracking-wider flex items-center gap-1">
              <Scale className="w-3.5 h-3.5 text-zinc-500" />
              <span>2. Score Component Weights</span>
            </h3>
            <span className={`text-xs font-medium px-2 py-0.5 rounded ${
              totalWeightPercent === 100 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
            }`}>
              Sum: {totalWeightPercent}%
            </span>
          </div>

          {[
            { key: 'weightNightUnlock', label: 'Nighttime Phone Activity Alignment', val: form.weightNightUnlock },
            { key: 'weightMorningUnlock', label: 'First Morning Unlock Alignment', val: form.weightMorningUnlock },
            { key: 'weightConsistency', label: 'Intra-individual Sleep-Wake Regularity', val: form.weightConsistency },
            { key: 'weightSleepDuration', label: 'Sleep Duration Alignment', val: form.weightSleepDuration },
            { key: 'weightWeekendStability', label: 'Weekday-Weekend Stability', val: form.weightWeekendStability },
          ].map(item => (
            <div key={item.key} className="space-y-1">
              <div className="flex justify-between text-xs text-zinc-700">
                <span>{item.label}</span>
                <span className="font-semibold">{Math.round(item.val * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.50"
                step="0.05"
                value={item.val}
                onChange={e => setForm({ ...form, [item.key]: Number(e.target.value) })}
                className="w-full accent-indigo-600"
              />
            </div>
          ))}
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between pt-3 border-t border-zinc-100">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-medium text-zinc-600 hover:text-zinc-800 rounded-lg hover:bg-zinc-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors"
            >
              Apply Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
