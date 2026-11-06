import { DailyLog, Prediction, Feedback, UserStatsSummary, CorrelationResult } from '@/types/database';
import { parseMorningTimeToMinutes } from './circadianEngine';

export function calculateMean(arr: number[]): number {
  if (arr.length === 0) return 0;
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

export function calculateMedianVal(arr: number[]): number {
  if (arr.length === 0) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

export function calculateStdDevVal(arr: number[]): number {
  if (arr.length <= 1) return 0;
  const mean = calculateMean(arr);
  const variance = arr.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / (arr.length - 1);
  return Math.sqrt(variance);
}

export function calculateMAD(arr: number[]): number {
  if (arr.length === 0) return 0;
  const median = calculateMedianVal(arr);
  const deviations = arr.map(v => Math.abs(v - median));
  return calculateMedianVal(deviations);
}

export function calculateRange(arr: number[]): { min: number; max: number; range: number } {
  if (arr.length === 0) return { min: 0, max: 0, range: 0 };
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  return { min, max, range: max - min };
}

/**
 * Calculates Pearson Correlation Coefficient r between two paired numerical arrays.
 * Handles null/undefined filtering.
 */
export function calculatePearson(pairs: [number, number][]): number {
  const valid = pairs.filter(p => p[0] !== null && p[1] !== null && !isNaN(p[0]) && !isNaN(p[1]));
  const n = valid.length;
  if (n < 3) return 0;

  const xs = valid.map(p => p[0]);
  const ys = valid.map(p => p[1]);

  const meanX = calculateMean(xs);
  const meanY = calculateMean(ys);

  let num = 0;
  let denX = 0;
  let denY = 0;

  for (let i = 0; i < n; i++) {
    const dx = xs[i] - meanX;
    const dy = ys[i] - meanY;
    num += dx * dy;
    denX += dx * dx;
    denY += dy * dy;
  }

  const den = Math.sqrt(denX * denY);
  if (den === 0) return 0;
  return +(num / den).toFixed(3);
}

/**
 * Calculates Spearman Rank Correlation Coefficient rho between two paired numerical arrays.
 */
export function calculateSpearman(pairs: [number, number][]): number {
  const valid = pairs.filter(p => p[0] !== null && p[1] !== null && !isNaN(p[0]) && !isNaN(p[1]));
  const n = valid.length;
  if (n < 3) return 0;

  function getRanks(vals: number[]): number[] {
    const indexed = vals.map((v, i) => ({ v, i }));
    indexed.sort((a, b) => a.v - b.v);
    const ranks = new Array(vals.length);
    let i = 0;
    while (i < indexed.length) {
      let j = i;
      while (j < indexed.length - 1 && indexed[j + 1].v === indexed[j].v) {
        j++;
      }
      const rank = (i + j + 2) / 2;
      for (let k = i; k <= j; k++) {
        ranks[indexed[k].i] = rank;
      }
      i = j + 1;
    }
    return ranks;
  }

  const rankX = getRanks(valid.map(p => p[0]));
  const rankY = getRanks(valid.map(p => p[1]));

  const rankPairs: [number, number][] = rankX.map((rx, idx) => [rx, rankY[idx]]);
  return calculatePearson(rankPairs);
}

export function computeUserStatisticsSummary(
  userId: string,
  displayName: string,
  logs: DailyLog[],
  predictions: Prediction[],
  feedback: Feedback[]
): UserStatsSummary {
  const uLogs = logs.filter(l => l.user_id === userId).sort((a, b) => a.date.localeCompare(b.date));
  const uPreds = predictions.filter(p => p.user_id === userId);
  const uFeed = feedback.filter(f => f.user_id === userId);

  const screenTimes = uLogs.map(l => l.total_screen_time_mins).filter((v): v is number => v !== null);
  const unlocks = uLogs.map(l => l.unlock_count).filter((v): v is number => v !== null);
  const sessions = uLogs.map(l => l.avg_session_length_mins).filter((v): v is number => v !== null);
  const steps = uLogs.map(l => l.step_count).filter((v): v is number => v !== null);
  const activeMins = uLogs.map(l => l.active_minutes).filter((v): v is number => v !== null);
  const sleeps = uLogs.map(l => l.sleep_duration_estimate_mins).filter((v): v is number => v !== null && v > 0);

  // Earlier period vs Recent period comparison (split chronologically)
  let screenDelta = 0;
  let wakeDeltaMins = 0;
  let confDelta = 0;

  if (uLogs.length >= 6) {
    const midIdx = Math.floor(uLogs.length / 2);
    const earlierLogs = uLogs.slice(0, midIdx);
    const recentLogs = uLogs.slice(midIdx);

    const earlierScreen = calculateMean(earlierLogs.map(l => l.total_screen_time_mins).filter((v): v is number => v !== null));
    const recentScreen = calculateMean(recentLogs.map(l => l.total_screen_time_mins).filter((v): v is number => v !== null));
    screenDelta = Math.round(recentScreen - earlierScreen);

    const earlierWakes = earlierLogs.map(l => parseMorningTimeToMinutes(l.first_unlock_morning)).filter((v): v is number => v !== null);
    const recentWakes = recentLogs.map(l => parseMorningTimeToMinutes(l.first_unlock_morning)).filter((v): v is number => v !== null);
    if (earlierWakes.length > 0 && recentWakes.length > 0) {
      wakeDeltaMins = Math.round(calculateMean(recentWakes) - calculateMean(earlierWakes));
    }

    const uPredsSorted = [...uPreds].sort((a, b) => a.date.localeCompare(b.date));
    const midPred = Math.floor(uPredsSorted.length / 2);
    const earlierConf = calculateMean(uPredsSorted.slice(0, midPred).map(p => p.confidence_score));
    const recentConf = calculateMean(uPredsSorted.slice(midPred).map(p => p.confidence_score));
    confDelta = +(recentConf - earlierConf).toFixed(2);
  }

  const predictiveCount = uPreds.filter(p => p.is_predictive).length;
  const predictiveDaysRatio = uPreds.length > 0 ? +(predictiveCount / uPreds.length).toFixed(2) : 0;
  const avgConfidence = uPreds.length > 0 ? +(calculateMean(uPreds.map(p => p.confidence_score))).toFixed(2) : 0;

  const feedbackRatings = uFeed.map(f => f.rating);
  const avgFeedback = feedbackRatings.length > 0 ? +(calculateMean(feedbackRatings)).toFixed(2) : null;
  const feedbackRatio = uLogs.length > 0 ? +(uFeed.length / uLogs.length).toFixed(2) : 0;

  return {
    userId,
    displayName,
    totalDays: uLogs.length,
    screenTimeMean: Math.round(calculateMean(screenTimes)),
    screenTimeMedian: Math.round(calculateMedianVal(screenTimes)),
    screenTimeStdDev: Math.round(calculateStdDevVal(screenTimes)),
    unlocksMean: Math.round(calculateMean(unlocks)),
    unlocksMedian: Math.round(calculateMedianVal(unlocks)),
    avgSessionMean: +(calculateMean(sessions)).toFixed(1),
    avgSessionMedian: +(calculateMedianVal(sessions)).toFixed(1),
    stepsMean: Math.round(calculateMean(steps)),
    stepsMedian: Math.round(calculateMedianVal(steps)),
    activeMinsMean: Math.round(calculateMean(activeMins)),
    sleepDurationMean: Math.round(calculateMean(sleeps)),
    sleepDurationMedian: Math.round(calculateMedianVal(sleeps)),
    sleepDurationStdDev: Math.round(calculateStdDevVal(sleeps)),
    predictiveDaysRatio,
    avgConfidence,
    feedbackSubmissionRatio: Math.min(1.0, feedbackRatio),
    avgFeedbackRating: avgFeedback,
    earlierVsRecentScreenDelta: screenDelta,
    earlierVsRecentWakeDeltaMins: wakeDeltaMins,
    earlierVsRecentConfidenceDelta: confDelta
  };
}

export function computeCrossCorrelations(
  logs: DailyLog[],
  feedback: Feedback[]
): CorrelationResult[] {
  // Join logs with feedback on (user_id, date)
  const feedbackMap = new Map<string, number>();
  feedback.forEach(f => {
    feedbackMap.set(`${f.user_id}_${f.date}`, f.rating);
  });

  const sleepVsActivePairs: [number, number][] = [];
  const screenVsFeedbackPairs: [number, number][] = [];
  const unlocksVsFeedbackPairs: [number, number][] = [];
  const stepsVsScreenPairs: [number, number][] = [];
  const sleepVsScreenPairs: [number, number][] = [];

  for (const log of logs) {
    if (log.sleep_duration_estimate_mins !== null && log.active_minutes !== null) {
      sleepVsActivePairs.push([log.sleep_duration_estimate_mins, log.active_minutes]);
    }

    if (log.step_count !== null && log.total_screen_time_mins !== null) {
      stepsVsScreenPairs.push([log.step_count, log.total_screen_time_mins]);
    }

    if (log.sleep_duration_estimate_mins !== null && log.total_screen_time_mins !== null) {
      sleepVsScreenPairs.push([log.sleep_duration_estimate_mins, log.total_screen_time_mins]);
    }

    const rating = feedbackMap.get(`${log.user_id}_${log.date}`);
    if (rating !== undefined) {
      if (log.total_screen_time_mins !== null) {
        screenVsFeedbackPairs.push([log.total_screen_time_mins, rating]);
      }
      if (log.unlock_count !== null) {
        unlocksVsFeedbackPairs.push([log.unlock_count, rating]);
      }
    }
  }

  function interpretCorr(r: number, labelA: string, labelB: string): string {
    const abs = Math.abs(r);
    const direction = r > 0 ? "positive" : "negative";
    if (abs >= 0.6) return `Strong ${direction} association between ${labelA} and ${labelB}.`;
    if (abs >= 0.3) return `Moderate ${direction} trend observed between ${labelA} and ${labelB}.`;
    if (abs >= 0.1) return `Weak ${direction} tendency between ${labelA} and ${labelB}.`;
    return `Negligible linear relationship between ${labelA} and ${labelB}.`;
  }

  const results: CorrelationResult[] = [
    {
      variableA: 'Sleep Duration (mins)',
      variableB: 'Active Minutes (mins)',
      pearsonR: calculatePearson(sleepVsActivePairs),
      spearmanRho: calculateSpearman(sleepVsActivePairs),
      sampleSize: sleepVsActivePairs.length,
      interpretation: interpretCorr(calculatePearson(sleepVsActivePairs), 'sleep duration', 'physical activity')
    },
    {
      variableA: 'Total Screen Time (mins)',
      variableB: 'Feedback Rating (0-5)',
      pearsonR: calculatePearson(screenVsFeedbackPairs),
      spearmanRho: calculateSpearman(screenVsFeedbackPairs),
      sampleSize: screenVsFeedbackPairs.length,
      interpretation: interpretCorr(calculatePearson(screenVsFeedbackPairs), 'screen time', 'user productivity rating')
    },
    {
      variableA: 'Daily Unlock Count',
      variableB: 'Feedback Rating (0-5)',
      pearsonR: calculatePearson(unlocksVsFeedbackPairs),
      spearmanRho: calculateSpearman(unlocksVsFeedbackPairs),
      sampleSize: unlocksVsFeedbackPairs.length,
      interpretation: interpretCorr(calculatePearson(unlocksVsFeedbackPairs), 'unlock frequency', 'user productivity rating')
    },
    {
      variableA: 'Daily Step Count',
      variableB: 'Total Screen Time (mins)',
      pearsonR: calculatePearson(stepsVsScreenPairs),
      spearmanRho: calculateSpearman(stepsVsScreenPairs),
      sampleSize: stepsVsScreenPairs.length,
      interpretation: interpretCorr(calculatePearson(stepsVsScreenPairs), 'step count', 'screen time')
    },
    {
      variableA: 'Sleep Duration (mins)',
      variableB: 'Total Screen Time (mins)',
      pearsonR: calculatePearson(sleepVsScreenPairs),
      spearmanRho: calculateSpearman(sleepVsScreenPairs),
      sampleSize: sleepVsScreenPairs.length,
      interpretation: interpretCorr(calculatePearson(sleepVsScreenPairs), 'sleep duration', 'screen time')
    }
  ];

  return results;
}
