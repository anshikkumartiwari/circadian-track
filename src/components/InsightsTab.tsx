'use client';

import React, { useState } from 'react';
import { 
  Profile, 
  DailyLog, 
  Prediction, 
  Feedback 
} from '@/types/database';
import { generateBehavioralInferences } from '@/lib/behavioralInsightsEngine';
import { computeCrossCorrelations } from '@/lib/statisticsEngine';
import { generateAnalystReport } from '@/lib/analystReportEngine';
import { 
  BrainCircuit, 
  Sparkles, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  FileText, 
  Activity, 
  Copy, 
  Check 
} from 'lucide-react';

interface InsightsTabProps {
  profiles: Profile[];
  selectedUserIds: string[];
  logs: DailyLog[];
  predictions: Prediction[];
  feedback: Feedback[];
  onOpenPromptModal: () => void;
}

export function InsightsTab({
  profiles,
  selectedUserIds,
  logs,
  predictions,
  feedback,
  onOpenPromptModal
}: InsightsTabProps) {
  const [filterUser, setFilterUser] = useState<string>('all');
  const [reportCopied, setReportCopied] = useState(false);

  const selectedProfiles = profiles.filter(p => selectedUserIds.includes(p.id));

  if (selectedProfiles.length === 0 || logs.length === 0) {
    return (
      <div className="p-12 text-center bg-white border border-zinc-200 rounded-2xl shadow-xs space-y-3">
        <Activity className="w-10 h-10 text-zinc-400 mx-auto" />
        <h3 className="text-base font-semibold text-zinc-900">No Insights Available</h3>
        <p className="text-sm text-zinc-500 max-w-md mx-auto">
          Select at least one user with behavioral observations to generate pattern inferences and analytical reports.
        </p>
      </div>
    );
  }

  // Aggregate inferences across selected users
  const allInferences = selectedProfiles.flatMap(p => {
    const uLogs = logs.filter(l => l.user_id === p.id);
    const uPreds = predictions.filter(pr => pr.user_id === p.id);
    const uFeed = feedback.filter(f => f.user_id === p.id);
    const infs = generateBehavioralInferences(p.id, p.display_name, uLogs, uPreds, uFeed);
    return infs.map(i => ({ ...i, userName: p.display_name, userColor: p.display_name.toLowerCase() }));
  });

  const filteredInferences = filterUser === 'all' 
    ? allInferences 
    : allInferences.filter(i => i.userName === filterUser);

  // Cross-correlation analysis
  const correlations = computeCrossCorrelations(
    logs.filter(l => selectedUserIds.includes(l.user_id)),
    feedback
  );

  // Generated natural-language analyst report
  const analystReport = generateAnalystReport(selectedProfiles, logs, predictions, feedback);

  const handleCopyReportText = async () => {
    let reportText = `# Behavioral Analysis Report: What the Data Suggests\nGenerated: ${analystReport.generatedAt}\nObserved Window: ${analystReport.dateRangeStr}\nCohort: ${analystReport.selectedUserNames.join(', ')}\n\n`;
    analystReport.sections.forEach(s => {
      reportText += `## ${s.title}\n${s.paragraphs.join('\n\n')}\n\n`;
      if (s.bulletPoints) {
        reportText += s.bulletPoints.map(b => `- ${b}`).join('\n') + '\n\n';
      }
    });

    try {
      await navigator.clipboard.writeText(reportText);
      setReportCopied(true);
      setTimeout(() => setReportCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* 1. Header & AI Prompt Launcher Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gradient-to-r from-indigo-50/70 via-white to-teal-50/50 p-6 rounded-2xl border border-zinc-200 shadow-xs">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100/70 text-indigo-800 border border-indigo-200/60">
            <BrainCircuit className="w-3.5 h-3.5" />
            <span>Behavioral Insights Engine</span>
          </div>
          <h2 className="text-xl font-bold text-zinc-900 tracking-tight">
            Multi-Signal Pattern Inferences & Statistical Associations
          </h2>
          <p className="text-xs text-zinc-600 max-w-2xl">
            Derived from longitudinal telemetric signals. Evaluates checking intensity, circadian drift, activity buffering, and empirical correlation coefficients.
          </p>
        </div>

        <button
          onClick={onOpenPromptModal}
          className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-colors shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>Copy AI Analysis Prompt</span>
        </button>
      </div>

      {/* 2. Detected Behavioral Pattern Cards */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-zinc-900 tracking-tight">
              Evidence-Backed Behavioral Inferences ({filteredInferences.length})
            </h3>
            <p className="text-xs text-zinc-500">
              Each inference synthesizes multiple metrics and quantifies empirical evidence.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-zinc-500">Filter by user:</span>
            <select
              value={filterUser}
              onChange={e => setFilterUser(e.target.value)}
              className="px-2.5 py-1 bg-white border border-zinc-300 rounded-lg text-xs font-medium text-zinc-800"
            >
              <option value="all">All Selected Users</option>
              {selectedProfiles.map(p => (
                <option key={p.id} value={p.display_name}>{p.display_name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredInferences.map(inf => {
            const isHigh = inf.strength === 'High';
            return (
              <div
                key={inf.id}
                className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-xs space-y-3 flex flex-col justify-between hover:border-zinc-300 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-0.5">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-800 inline-block">
                        {inf.userName}
                      </span>
                      <h4 className="text-sm font-bold text-zinc-900">{inf.title}</h4>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full border ${
                        isHigh ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'bg-zinc-100 text-zinc-700 border-zinc-200'
                      }`}>
                        {inf.strength} Strength
                      </span>
                      <span className="flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-medium rounded-full bg-zinc-50 border border-zinc-200 text-zinc-600">
                        {inf.trend === 'Increasing' && <TrendingUp className="w-3 h-3 text-emerald-600" />}
                        {inf.trend === 'Decreasing' && <TrendingDown className="w-3 h-3 text-amber-600" />}
                        {inf.trend === 'Stable' && <Minus className="w-3 h-3 text-zinc-400" />}
                        <span>{inf.trend}</span>
                      </span>
                    </div>
                  </div>

                  {/* Inference & Evidence */}
                  <p className="text-xs font-medium text-zinc-800 leading-relaxed">
                    &ldquo;{inf.inference}&rdquo;
                  </p>

                  <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200/60 text-xs text-zinc-600 space-y-1">
                    <span className="font-semibold text-[11px] text-zinc-700 uppercase tracking-wider block">
                      Quantitative Evidence:
                    </span>
                    <p className="text-[11px] font-mono leading-relaxed text-zinc-700">
                      {inf.evidence}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-zinc-100 text-xs text-zinc-500 space-y-1">
                  <span className="font-semibold text-zinc-700 block">Practical Implication:</span>
                  <p className="text-[11px] leading-relaxed text-zinc-600">{inf.implication}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Statistical Correlation Analysis Matrix */}
      <div className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
          <div>
            <h3 className="text-base font-bold text-zinc-900 tracking-tight">
              Bivariate Correlation & Association Analysis
            </h3>
            <p className="text-xs text-zinc-500">
              Pearson linear correlation (r) and Spearman rank-order correlation (&rho;) computed across paired daily observations.
            </p>
          </div>
          <span className="text-xs text-zinc-400">
            Note: Correlation indicates association, not causation
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-700">
            <thead className="bg-zinc-50 text-[11px] text-zinc-500 font-semibold uppercase tracking-wider border-b border-zinc-200">
              <tr>
                <th className="py-2.5 px-3">Variable A</th>
                <th className="py-2.5 px-3">Variable B</th>
                <th className="py-2.5 px-3">Pearson r</th>
                <th className="py-2.5 px-3">Spearman &rho;</th>
                <th className="py-2.5 px-3">Sample (N)</th>
                <th className="py-2.5 px-3">Analytical Interpretation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {correlations.map((c, idx) => (
                <tr key={idx} className="hover:bg-zinc-50/70 transition-colors">
                  <td className="py-3 px-3 font-semibold text-zinc-900">{c.variableA}</td>
                  <td className="py-3 px-3 font-medium text-zinc-800">{c.variableB}</td>
                  <td className="py-3 px-3 font-mono font-bold">
                    <span className={`px-2 py-0.5 rounded ${
                      Math.abs(c.pearsonR) >= 0.4 
                        ? (c.pearsonR > 0 ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800')
                        : 'text-zinc-600'
                    }`}>
                      {c.pearsonR > 0 ? `+${c.pearsonR.toFixed(2)}` : c.pearsonR.toFixed(2)}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono text-zinc-700">
                    {c.spearmanRho > 0 ? `+${c.spearmanRho.toFixed(2)}` : c.spearmanRho.toFixed(2)}
                  </td>
                  <td className="py-3 px-3 text-zinc-500">{c.sampleSize} pairs</td>
                  <td className="py-3 px-3 text-zinc-600 text-[11px] max-w-sm">{c.interpretation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Built-in Analyst Report: "What the Data Suggests" */}
      <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-zinc-100">
          <div>
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-600" />
              <h3 className="text-lg font-bold text-zinc-900 tracking-tight">
                Behavioral Analysis Report: What the Data Suggests
              </h3>
            </div>
            <p className="text-xs text-zinc-500">
              Independent natural-language report generated dynamically from active user records ({analystReport.dateRangeStr}).
            </p>
          </div>

          <button
            onClick={handleCopyReportText}
            className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-700 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 rounded-lg transition-colors"
          >
            {reportCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{reportCopied ? 'Report Copied' : 'Copy Full Report'}</span>
          </button>
        </div>

        {/* Report Sections */}
        <div className="space-y-6 text-xs text-zinc-700 leading-relaxed">
          {analystReport.sections.map((section, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-zinc-100 bg-zinc-50/40 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-zinc-900 tracking-tight">
                  {section.title}
                </h4>
                {section.badge && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                    {section.badge}
                  </span>
                )}
              </div>

              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="text-zinc-600">{p}</p>
              ))}

              {section.bulletPoints && section.bulletPoints.length > 0 && (
                <ul className="space-y-1.5 pl-4 list-disc marker:text-indigo-600">
                  {section.bulletPoints.map((bp, bIdx) => (
                    <li key={bIdx} dangerouslySetInnerHTML={{ __html: bp.replace(/\*\*(.*?)\*\*/g, '<strong class="text-zinc-900 font-semibold">$1</strong>') }} />
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
