import { Profile, DailyLog, Prediction, Feedback } from '@/types/database';
import { calculateCircadianMetrics } from './circadianEngine';
import { computeUserStatisticsSummary, computeCrossCorrelations } from './statisticsEngine';
import { generateBehavioralInferences } from './behavioralInsightsEngine';

export function generateAIPrompt(
  selectedProfiles: Profile[],
  logs: DailyLog[],
  predictions: Prediction[],
  feedback: Feedback[]
): string {
  const selectedUserIds = selectedProfiles.map(p => p.id);
  const relevantLogs = logs.filter(l => selectedUserIds.includes(l.user_id)).sort((a, b) => a.date.localeCompare(b.date));

  if (relevantLogs.length === 0 || selectedProfiles.length === 0) {
    return 'No behavioral records are currently loaded for prompt generation.';
  }

  const startDate = relevantLogs[0].date;
  const endDate = relevantLogs[relevantLogs.length - 1].date;

  const userSummaries = selectedProfiles.map(profile => {
    const uLogs = relevantLogs.filter(l => l.user_id === profile.id);
    const uPreds = predictions.filter(p => p.user_id === profile.id);
    const uFeed = feedback.filter(f => f.user_id === profile.id);
    const circ = calculateCircadianMetrics(profile.id, uLogs);
    const stats = computeUserStatisticsSummary(profile.id, profile.display_name, uLogs, uPreds, uFeed);
    const inferences = generateBehavioralInferences(profile.id, profile.display_name, uLogs, uPreds, uFeed);

    return {
      profile,
      circ,
      stats,
      inferences,
      logCount: uLogs.length,
      predCount: uPreds.length,
      feedCount: uFeed.length
    };
  });

  const correlations = computeCrossCorrelations(relevantLogs, feedback);

  let prompt = `# Behavioral Rhythm, Circadian Alignment & Productivity Analytics
## Deep Behavioral Data Analysis Request

### 1. Role & Mission
Act as an expert Behavioral Data Scientist, Chronobiology Researcher, and Digital Well-being Analyst.
You have been provided with comprehensive, empirically collected behavioral records from our **Behavioral Rhythm & Productivity Prediction** platform.

Your task is to independently analyze this dataset, discover the most critical behavioral patterns, evaluate circadian rhythm alignment, and synthesize actionable, evidence-backed recommendations for each individual.

---

### 2. Dataset Context & Methodology
- **Timeframe Analyzed**: ${startDate} to ${endDate} (${relevantLogs.length} total logged daily records across ${selectedProfiles.length} user(s)).
- **Behavioral Proxies**:
  - \`last_unlock_prev_night\`: Proxy for late-night digital activity and bedtime proximity (not polysomnographic sleep onset).
  - \`first_unlock_morning\`: Proxy for morning awakening and digital re-engagement.
  - \`sleep_duration_estimate_mins\`: Estimated sleep duration from device telemetry.
  - \`unlock_count\` & \`avg_session_length_mins\`: Structural markers distinguishing micro-checking from sustained digital consumption.
  - \`step_count\` & \`active_minutes\`: Physical exertion and daytime activity proxies.
- **Reference Circadian Baseline**: 11:00 PM (23:00) last unlock, 7:00 AM (07:00) morning unlock, 8 hours (480 mins) target sleep duration.

---

### 3. Quantitative Cohort Summaries

`;

  for (const u of userSummaries) {
    prompt += `#### User: ${u.profile.display_name} (Age: ${u.profile.age ?? 'Not disclosed'})
- **Observation Coverage**: ${u.logCount} days logged (${startDate} to ${endDate})
- **Circadian Alignment Score**: ${u.circ.overallScore} / 100 (${u.circ.alignmentLevel})
  - Night Activity Alignment: ${u.circ.breakdown.nightAlignmentScore}/100 (Contribution: ${u.circ.breakdown.nightContribution} pts)
  - Morning Unlock Alignment: ${u.circ.breakdown.morningAlignmentScore}/100 (Contribution: ${u.circ.breakdown.morningContribution} pts)
  - Intra-individual Consistency: ${u.circ.breakdown.consistencyScore}/100 (Contribution: ${u.circ.breakdown.consistencyContribution} pts)
  - Sleep Duration Alignment: ${u.circ.breakdown.sleepDurationScore}/100 (Contribution: ${u.circ.breakdown.sleepDurationContribution} pts)
  - Weekend Schedule Stability: ${u.circ.breakdown.weekendStabilityScore}/100 (Contribution: ${u.circ.breakdown.weekendStabilityContribution} pts)
- **Estimated Rhythm Drift**: ${u.circ.rhythmDriftFormatted} (Median night unlock: ${u.circ.medianNightUnlock}, Median morning unlock: ${u.circ.medianMorningUnlock})
- **Individual Schedule Consistency**: Score ${u.circ.routineConsistencyScore}/100 (Morning std dev: ±${u.circ.morningUnlockStdDevMins}m, Night std dev: ±${u.circ.nightUnlockStdDevMins}m)
- **Weekday vs Weekend Jetlag**: Weekday avg wake: ${u.circ.weekdayAvgWakeTime} | Weekend avg wake: ${u.circ.weekendAvgWakeTime} (Shift: ${u.circ.socialJetlagMinutes > 0 ? `+${u.circ.socialJetlagMinutes}m` : `${u.circ.socialJetlagMinutes}m`})
- **Phone Usage Telemetry**:
  - Daily Screen Time: Mean ${u.stats.screenTimeMean} mins (Median: ${u.stats.screenTimeMedian}m, StdDev: ±${u.stats.screenTimeStdDev}m)
  - Daily Unlock Frequency: Mean ${u.stats.unlocksMean} unlocks/day (Median: ${u.stats.unlocksMedian})
  - Average Session Duration: Mean ${u.stats.avgSessionMean} mins (Median: ${u.stats.avgSessionMedian}m)
- **Physical Activity Telemetry**:
  - Daily Steps: Mean ${u.stats.stepsMean.toLocaleString()} steps/day (Median: ${u.stats.stepsMedian.toLocaleString()})
  - Active Minutes: Mean ${u.stats.activeMinsMean} mins/day
  - Estimated Sleep Duration: Mean ${u.stats.sleepDurationMean} mins (~${(u.stats.sleepDurationMean / 60).toFixed(1)}h, StdDev: ±${u.stats.sleepDurationStdDev}m)
- **Prediction & Feedback Calibration**:
  - Machine Predicted Productive Days: ${Math.round(u.stats.predictiveDaysRatio * 100)}% of days (${u.predCount} predictions logged)
  - Mean Model Confidence Score: ${(u.stats.avgConfidence * 100).toFixed(0)}%
  - Feedback Submission Ratio: ${(u.stats.feedbackSubmissionRatio * 100).toFixed(0)}% (${u.feedCount} ratings logged)
  - Average Subjective Productivity Rating: ${u.stats.avgFeedbackRating !== null ? `${u.stats.avgFeedbackRating} / 5.0` : 'None'}
- **Chronological Adaptation (Earlier Half vs Recent Half)**:
  - Screen Time Shift: ${u.stats.earlierVsRecentScreenDelta > 0 ? `+${u.stats.earlierVsRecentScreenDelta}m` : `${u.stats.earlierVsRecentScreenDelta}m`}
  - Morning Wake Proxy Shift: ${u.stats.earlierVsRecentWakeDeltaMins > 0 ? `+${u.stats.earlierVsRecentWakeDeltaMins}m later` : `${u.stats.earlierVsRecentWakeDeltaMins}m earlier`}
  - Prediction Confidence Shift: ${u.stats.earlierVsRecentConfidenceDelta > 0 ? `+${(u.stats.earlierVsRecentConfidenceDelta * 100).toFixed(0)}%` : `${(u.stats.earlierVsRecentConfidenceDelta * 100).toFixed(0)}%`}
- **Detected Behavioral Inferences**:
${u.inferences.map(inf => `  * [${inf.strength} Strength] ${inf.title}: ${inf.inference} (Evidence: ${inf.evidence})`).join('\n')}

`;
  }

  prompt += `---

### 4. Cohort Cross-Correlations
${correlations.map(c => `- **${c.variableA}** vs **${c.variableB}**: Pearson r = ${c.pearsonR.toFixed(2)}, Spearman rho = ${c.spearmanRho.toFixed(2)} (N = ${c.sampleSize}). ${c.interpretation}`).join('\n')}

---

### 5. Specific Questions to Address in Your Analysis
1. **Circadian Phase & Social Jetlag**: How does each individual's rhythm drift relate to their daily cognitive readiness? Who experiences significant weekend delay (social jetlag), and what physiological cost does it introduce?
2. **Deconstruction of Digital Engagement**: Contrast the attentional impact of frequent checking (high unlocks, short sessions) versus extended immersion (high total duration, long sessions). How does each archetype correlate with reported subjective productivity?
3. **Physical Activity Compensation**: Can high daily physical activity (e.g. >9,000 steps) buffer against the negative impacts of high screen time or delayed bedtime?
4. **Machine Learning Calibration Assessment**: How reliable are the platform's confidence scores when cross-referenced with user feedback? Which user demonstrates true model convergence versus persistent uncertainty?
5. **Tailored Action Protocols**: Propose 2-3 prioritized, measurable behavioral experiments for each user to enhance routine stability without prescribing unrealistic blanket regimens.
`;

  return prompt;
}
