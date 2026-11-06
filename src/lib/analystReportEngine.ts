import { Profile, DailyLog, Prediction, Feedback } from '@/types/database';
import { calculateCircadianMetrics } from './circadianEngine';
import { computeUserStatisticsSummary, computeCrossCorrelations } from './statisticsEngine';
import { generateBehavioralInferences } from './behavioralInsightsEngine';

export interface AnalystReportSection {
  title: string;
  badge?: string;
  paragraphs: string[];
  bulletPoints?: string[];
}

export interface GeneratedAnalystReport {
  generatedAt: string;
  selectedUserNames: string[];
  dateRangeStr: string;
  totalDaysObserved: number;
  sections: AnalystReportSection[];
}

export function generateAnalystReport(
  selectedProfiles: Profile[],
  logs: DailyLog[],
  predictions: Prediction[],
  feedback: Feedback[]
): GeneratedAnalystReport {
  const selectedUserIds = selectedProfiles.map(p => p.id);
  const relevantLogs = logs.filter(l => selectedUserIds.includes(l.user_id)).sort((a, b) => a.date.localeCompare(b.date));
  
  if (relevantLogs.length === 0 || selectedProfiles.length === 0) {
    return {
      generatedAt: new Date().toISOString(),
      selectedUserNames: selectedProfiles.map(p => p.display_name),
      dateRangeStr: 'No records in range',
      totalDaysObserved: 0,
      sections: [
        {
          title: 'Insufficient Data for Analysis',
          paragraphs: [
            'There are currently no daily observation records matching the selected users and date range.',
            'Please select users with logged behavioral records or check your Supabase data source.'
          ]
        }
      ]
    };
  }

  const startDate = relevantLogs[0].date;
  const endDate = relevantLogs[relevantLogs.length - 1].date;
  const dateRangeStr = `${startDate} to ${endDate}`;

  // Analyze each user
  const userAnalyses = selectedProfiles.map(profile => {
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
      logCount: uLogs.length
    };
  });

  const correlations = computeCrossCorrelations(relevantLogs, feedback);

  // Build report sections
  const sections: AnalystReportSection[] = [];

  // Section 1: Executive Behavioral Synthesis
  const topSyntheses = userAnalyses.map(u => {
    return `**${u.profile.display_name}** exhibits a Circadian Alignment Score of **${u.circ.overallScore}/100** (${u.circ.alignmentLevel}) with an estimated rhythm drift of **${u.circ.rhythmDriftFormatted}**. Daily screen time averages **${u.stats.screenTimeMean} mins** across **${u.stats.unlocksMean} unlocks/day** (avg session: **${u.stats.avgSessionMean} mins**), supported by **${u.stats.stepsMean.toLocaleString()} daily steps**. Predicted productivity rate is **${Math.round(u.stats.predictiveDaysRatio * 100)}%**.`;
  });

  sections.push({
    title: '1. Executive Behavioral Synthesis',
    badge: 'Overview',
    paragraphs: [
      `This analytical synthesis integrates ${relevantLogs.length} longitudinal daily observations across ${selectedProfiles.length} user(s) over the observation window from ${dateRangeStr}. The system combines sleep-wake timing proxies, phone interaction structures, physical exertion metrics, and predictive calibration records.`,
      `Rather than viewing metrics in isolation, our objective is to decipher the underlying behavioral phenotypes: distinguishing habitual micro-checking from sustained immersion, evaluating the physiological penalty of schedule drift, and examining how routine regularity relates to subjective self-evaluation.`
    ],
    bulletPoints: topSyntheses
  });

  // Section 2: Circadian Alignment & Schedule Drift Analysis
  const driftPoints = userAnalyses.map(u => {
    const socialJetlagText = Math.abs(u.circ.socialJetlagMinutes) > 30 
      ? ` Marked weekend schedule shift of ${u.circ.socialJetlagMinutes > 0 ? `+${u.circ.socialJetlagMinutes}m later` : `${u.circ.socialJetlagMinutes}m earlier`}.`
      : ' Stable weekday-to-weekend continuity.';
    return `**${u.profile.display_name}**: Nighttime phone activity median at **${u.circ.medianNightUnlock}** (alignment: ${u.circ.breakdown.nightAlignmentScore}/100), morning wake proxy median at **${u.circ.medianMorningUnlock}** (alignment: ${u.circ.breakdown.morningAlignmentScore}/100). Intra-individual schedule consistency score is **${u.circ.routineConsistencyScore}/100** (morning variability: ±${u.circ.morningUnlockStdDevMins}m).${socialJetlagText}`;
  });

  sections.push({
    title: '2. Circadian Rhythm Alignment & Rhythm Drift Assessment',
    badge: 'Circadian Biology',
    paragraphs: [
      'Circadian alignment measures the temporal concordance between observed behavioral proxies (last nighttime unlock and first morning unlock) and a diurnal reference schedule (11:00 PM sleep proxy, 7:00 AM wake proxy, 8h sleep window).',
      'Critically, our engine decouples **Individual Routine Consistency** (day-to-day stability) from **Reference Alignment** (distance from target baseline). An individual can maintain an impeccably regular daily schedule that nevertheless drifts significantly later than conventional social hours.'
    ],
    bulletPoints: driftPoints
  });

  // Section 3: Digital Usage Archetypes: Checking vs Prolonged Immersion
  const usagePoints = userAnalyses.map(u => {
    const isFrequentChecker = u.stats.unlocksMean >= 65 && u.stats.avgSessionMean <= 4.0;
    const isProlongedUser = u.stats.screenTimeMean >= 350 && u.stats.avgSessionMean >= 8.0;
    let label = 'Balanced Interaction Pattern';
    if (isFrequentChecker && !isProlongedUser) label = 'High Checking Intensity (Attention Fragmentation)';
    if (isProlongedUser && !isFrequentChecker) label = 'Extended Digital Immersion (Continuous Consumption)';
    if (isFrequentChecker && isProlongedUser) label = 'High Dual-Intensity Phone Engagement';

    return `**${u.profile.display_name} (${label})**: Screen time: ${u.stats.screenTimeMean} mins/day | Unlocks: ${u.stats.unlocksMean} checks/day | Avg Session Length: ${u.stats.avgSessionMean} mins. Screen time variability (StdDev): ±${u.stats.screenTimeStdDev} mins.`;
  });

  sections.push({
    title: '3. Digital Usage Archetypes: Frequent Checking vs Prolonged Engagement',
    badge: 'Attention Dynamics',
    paragraphs: [
      'Screen time in minutes cannot by itself diagnose behavioral intent. A user logging 300 minutes across 90 brief 3-minute checks experiences substantial attention switching and notification reactivity, whereas a user logging 300 minutes across 15 long 20-minute sessions experiences sustained digital immersion.',
      'Our analysis isolates these two distinct interaction modalities across the active user cohort:'
    ],
    bulletPoints: usagePoints
  });

  // Section 4: Longitudinal Adaptation & Temporal Shifts
  const adaptationPoints = userAnalyses.map(u => {
    const screenShift = u.stats.earlierVsRecentScreenDelta !== 0 
      ? `Screen time shifted by ${u.stats.earlierVsRecentScreenDelta > 0 ? `+${u.stats.earlierVsRecentScreenDelta}m` : `${u.stats.earlierVsRecentScreenDelta}m`}.` 
      : 'Screen time remained stable.';
    const wakeShift = u.stats.earlierVsRecentWakeDeltaMins !== 0 
      ? ` Morning wake proxy shifted by ${u.stats.earlierVsRecentWakeDeltaMins > 0 ? `+${u.stats.earlierVsRecentWakeDeltaMins}m later` : `${Math.abs(u.stats.earlierVsRecentWakeDeltaMins)}m earlier`}.` 
      : ' Wake timing remained unchanged.';
    const confShift = u.stats.earlierVsRecentConfidenceDelta !== 0 
      ? ` Model prediction confidence shifted by ${u.stats.earlierVsRecentConfidenceDelta > 0 ? `+${(u.stats.earlierVsRecentConfidenceDelta * 100).toFixed(0)}%` : `${(u.stats.earlierVsRecentConfidenceDelta * 100).toFixed(0)}%`}.` 
      : '';

    return `**${u.profile.display_name}**: ${screenShift}${wakeShift}${confShift}`;
  });

  sections.push({
    title: '4. Longitudinal Trend Trajectory & Adaptation',
    badge: 'Trends',
    paragraphs: [
      'Comparing the initial half of the observation window against the recent half reveals behavioral drift, habit formation, and prediction model convergence over time.'
    ],
    bulletPoints: adaptationPoints
  });

  // Section 5: Prediction Calibration & Feedback Concordance
  const feedbackPoints = userAnalyses.map(u => {
    const feedbackCoverage = `${Math.round(u.stats.feedbackSubmissionRatio * 100)}%`;
    const ratingStr = u.stats.avgFeedbackRating !== null ? `${u.stats.avgFeedbackRating} / 5.0` : 'No ratings submitted';
    return `**${u.profile.display_name}**: Feedback submission rate: **${feedbackCoverage}** (Average subjective rating: **${ratingStr}**). Model predicted productive rate: **${Math.round(u.stats.predictiveDaysRatio * 100)}%** with average confidence of **${Math.round(u.stats.avgConfidence * 100)}%**.`;
  });

  sections.push({
    title: '5. Prediction Calibration & Subjective Feedback Concordance',
    badge: 'Model Calibration',
    paragraphs: [
      'The machine learning framework utilizes daily features to forecast productive days. However, confidence scores do not automatically equate to ground-truth accuracy.',
      'We validate model behavior against the user feedback stream. Users with consistent feedback provide the calibration ground-truth required for rolling model adaptation, whereas sparse feedback introduces epistemic uncertainty.'
    ],
    bulletPoints: feedbackPoints
  });

  // Section 6: Empirical Bivariate Associations
  sections.push({
    title: '6. Empirical Bivariate Associations',
    badge: 'Correlation Analysis',
    paragraphs: [
      'Bivariate correlation coefficients calculated across paired daily observations provide empirical evidence of cross-signal relationships:'
    ],
    bulletPoints: correlations.map(c => 
      `**${c.variableA}** vs **${c.variableB}**: Pearson r = ${c.pearsonR > 0 ? `+${c.pearsonR.toFixed(2)}` : c.pearsonR.toFixed(2)}, Spearman rho = ${c.spearmanRho > 0 ? `+${c.spearmanRho.toFixed(2)}` : c.spearmanRho.toFixed(2)} (N = ${c.sampleSize}). ${c.interpretation}`
    )
  });

  // Section 7: Recommended Behavioral Experiments
  sections.push({
    title: '7. Recommended Behavioral Experiments',
    badge: 'Actionable Protocols',
    paragraphs: [
      'Based on the empirical patterns detected in this cohort, we recommend three structured, testable behavioral micro-experiments:'
    ],
    bulletPoints: [
      '**Digital Wind-Down Curfew (for Late-Night Drift / Prolonged Engagement)**: Initiate phone-in-dock status 45 minutes prior to desired sleep onset. Test whether shifting last-unlock timing earlier by 45 minutes advances next-morning unlock latency and improves next-day feedback ratings.',
      '**Batching Check Interval Protocol (for Frequent Checking Patterns)**: Group notifications into 3 designated daytime windows. Measure whether reducing unlock counts from >80 down to <50 improves afternoon focus tags without increasing session length.',
      '**Weekend Wake-Time Anchor (for Social Jetlag)**: Cap weekend wake-up delay at +45 minutes relative to weekday average. Evaluate whether minimizing Monday morning unlock inertia stabilizes early-week productivity predictions.'
    ]
  });

  // Section 7: Future Instrumentation & Data Gaps
  sections.push({
    title: '7. Future Instrumentation & Gaps in Behavioral Proxy Inference',
    badge: 'Methodological Transparency',
    paragraphs: [
      'To strengthen the scientific validity of future iterations, the following instrumentation enhancements are recommended:'
    ],
    bulletPoints: [
      '**Sleep Verification**: First/last phone unlocks are behavioral proxies, not direct physiological polysomnography. Screen inactivity does not guarantee sleep onset, nor does delayed unlocking guarantee sleep duration.',
      '**Nap Duration Tracking**: The existing schema lacks daytime nap demarcation, obscuring polyphasic sleep or afternoon recovery episodes.',
      '**Granular App Categorization**: Differentiating active creative productivity (e.g. docs, coding) from passive background audio/media would refine screen time interpretability.'
    ]
  });

  return {
    generatedAt: new Date().toISOString(),
    selectedUserNames: selectedProfiles.map(p => p.display_name),
    dateRangeStr,
    totalDaysObserved: relevantLogs.length,
    sections
  };
}
