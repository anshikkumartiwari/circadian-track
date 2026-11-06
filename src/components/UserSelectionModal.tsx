'use client';

import React, { useState } from 'react';
import { Check, Users, X } from 'lucide-react';
import { Profile } from '@/types/database';

interface UserSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  profiles: Profile[];
  selectedUserIds: string[];
  onSaveSelection: (ids: string[]) => void;
  isInitialScreen?: boolean;
}

export function UserSelectionModal({
  isOpen,
  onClose,
  profiles,
  selectedUserIds,
  onSaveSelection,
  isInitialScreen = false
}: UserSelectionModalProps) {
  const [tempSelected, setTempSelected] = useState<string[]>(selectedUserIds);

  if (!isOpen) return null;

  const toggleUser = (id: string) => {
    if (tempSelected.includes(id)) {
      if (tempSelected.length > 1) {
        setTempSelected(tempSelected.filter(uId => uId !== id));
      }
    } else {
      setTempSelected([...tempSelected, id]);
    }
  };

  const selectAll = () => {
    setTempSelected(profiles.map(p => p.id));
  };

  const handleApply = () => {
    onSaveSelection(tempSelected);
    onClose();
  };

  const getUserDescription = (name: string) => {
    if (name.toLowerCase() === 'anshik') {
      return 'Regular diurnal routine, high circadian alignment, high unlock frequency with short sessions (frequent checker).';
    } else if (name.toLowerCase() === 'aditya') {
      return 'Evening chronotype (delayed sleep phase), significant rhythm drift past midnight, prolonged phone engagement sessions.';
    } else if (name.toLowerCase() === 'yash') {
      return 'Bimodal weekday vs weekend routine shift (social jetlag), heavy physical activity coexisting with high digital screen use.';
    }
    return 'Longitudinal behavioral logs, sleep proxies, and predictive productivity evaluation.';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white border border-zinc-200 rounded-2xl shadow-xl max-w-xl w-full p-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
              <Users className="w-3.5 h-3.5" />
              <span>User Cohort Selector</span>
            </div>
            <h2 className="text-xl font-bold text-zinc-900 tracking-tight">
              {isInitialScreen ? 'Welcome to Behavioral Rhythm & Productivity' : 'Select Users for Comparison'}
            </h2>
            <p className="text-sm text-zinc-500">
              Select one, two, or all three users to analyze circadian alignment, phone usage archetypes, and predicted productivity.
            </p>
          </div>
          {!isInitialScreen && (
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Quick select buttons */}
        <div className="flex items-center justify-between text-xs text-zinc-600 pt-1">
          <span>Available profiles ({profiles.length})</span>
          <button
            type="button"
            onClick={selectAll}
            className="text-indigo-600 hover:text-indigo-800 font-medium hover:underline"
          >
            Select All (Anshik, Aditya, Yash)
          </button>
        </div>

        {/* User Card Choices */}
        <div className="space-y-3">
          {profiles.map(profile => {
            const isChecked = tempSelected.includes(profile.id);
            return (
              <div
                key={profile.id}
                onClick={() => toggleUser(profile.id)}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                  isChecked
                    ? 'border-indigo-600 bg-indigo-50/40 shadow-xs'
                    : 'border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50/60'
                }`}
              >
                <div
                  className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                    isChecked
                      ? 'bg-indigo-600 border-indigo-600 text-white'
                      : 'border-zinc-300 bg-white'
                  }`}
                >
                  {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-zinc-900 text-base">
                      {profile.display_name}
                    </span>
                    <span className="text-xs text-zinc-500 font-mono bg-zinc-100 px-2 py-0.5 rounded">
                      ID: {profile.id.slice(0, 8)}...
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    {getUserDescription(profile.display_name)}
                  </p>
                  {profile.age && (
                    <span className="inline-block text-[11px] text-zinc-500">
                      Age: {profile.age} yrs
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between pt-2 border-t border-zinc-100">
          <span className="text-xs text-zinc-500">
            {tempSelected.length} user{tempSelected.length > 1 ? 's' : ''} selected
          </span>
          <div className="flex items-center gap-2">
            {!isInitialScreen && (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-800 hover:bg-zinc-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
            )}
            <button
              type="button"
              onClick={handleApply}
              disabled={tempSelected.length === 0}
              className="px-5 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-lg shadow-sm transition-colors"
            >
              {isInitialScreen ? 'Open Dashboard' : 'Apply Selection'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
