import { 
  DailyLog, 
  CircadianReferenceConfig, 
  CircadianMetrics, 
  CircadianComponentBreakdown 
} from '@/types/database';

export const DEFAULT_CIRCADIAN_CONFIG: CircadianReferenceConfig = {
  referenceNightUnlock: "23:00", // 11:00 PM
  referenceMorningUnlock: "07:00", // 7:00 AM
  referenceSleepMinsTarget: 480, // 8 hours (optimal range 420 - 540)
  weightNightUnlock: 0.25,
  weightMorningUnlock: 0.25,
  weightConsistency: 0.25,
  weightSleepDuration: 0.15,
  weightWeekendStability: 0.10,
};

/**
 * Converts a "HH:MM" or "HH:MM:SS" time string to minutes relative to midnight (-720 to +720).
 * For nighttime phone unlock (typically evening to early morning):
 * - 18:00 to 23:59 is negative relative to midnight (e.g. 23:00 = -60 min, 22:00 = -120 min)
 * - 00:00 to 12:00 is positive relative to midnight (e.g. 02:00 = +120 min, 03:30 = +210 min)
 */
export function parseNightTimeToMidnightMinutes(timeStr: string | null): number | null {
  if (!timeStr) return null;
  const parts = timeStr.split(':').map(Number);
  if (parts.length < 2 || isNaN(parts[0]) || isNaN(parts[1])) return null;
  const hours = parts[0];
  const minutes = parts[1];

  if (hours >= 12) {
    return (hours - 24) * 60 + minutes; // 23:00 -> -60
  } else {
    return hours * 60 + minutes; // 02:00 -> +120
  }
}

/**
 * Converts morning unlock time string to minutes past midnight (0 to 720).
 * e.g. "07:00" -> 420, "08:30" -> 510
 */
export function parseMorningTimeToMinutes(timeStr: string | null): number | null {
  if (!timeStr) return null;
  const parts = timeStr.split(':').map(Number);
  if (parts.length < 2 || isNaN(parts[0]) || isNaN(parts[1])) return null;
  return parts[0] * 60 + parts[1];
}

/**
 * Formats minutes relative to midnight back into readable 12-hour or 24-hour time.
 */
export function formatMidnightMinutesToTime(mins: number): string {
  let normalized = mins;
  while (normalized < 0) normalized += 1440;
  while (normalized >= 1440) normalized -= 1440;
  const h = Math.floor(normalized / 60);
  const m = Math.round(normalized % 60);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const displayH = h % 12 === 0 ? 12 : h % 12;
  const displayM = m < 10 ? `0${m}` : `${m}`;
  return `${displayH}:${displayM} ${ampm}`;
}

export function formatMinutesToDuration(mins: number): string {
  const abs = Math.abs(Math.round(mins));
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  if (h === 0) return `${m}m`;
  return `${h}h ${m > 0 ? `${m}m` : ''}`.trim();
}

/**
 * Standard deviation of an array of numbers.
 */
export function calculateStdDev(values: number[]): number {
  if (values.length <= 1) return 0;
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const variance = values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / (values.length - 1);
  return Math.sqrt(variance);
}

/**
 * Median of an array of numbers.
 */
export function calculateMedian(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

/**
 * Computes comprehensive Circadian Rhythm metrics and alignment score.
 */
export function calculateCircadianMetrics(
  userId: string,
  logs: DailyLog[],
  config: CircadianReferenceConfig = DEFAULT_CIRCADIAN_CONFIG
): CircadianMetrics {
  const userLogs = logs.filter(l => l.user_id === userId && l.date);
  if (userLogs.length === 0) {
    return getEmptyCircadianMetrics(userId);
  }

  // Reference parsed targets
  const refNightMins = parseNightTimeToMidnightMinutes(config.referenceNightUnlock) ?? -60; // 23:00 -> -60
  const refMorningMins = parseMorningTimeToMinutes(config.referenceMorningUnlock) ?? 420; // 07:00 -> 420
  const refSleepMins = config.referenceSleepMinsTarget; // 480 mins

  // Extract observations
  const nightMinsList: number[] = [];
  const morningMinsList: number[] = [];
  const sleepMinsList: number[] = [];
  const weekdayMorningList: number[] = [];
  const weekendMorningList: number[] = [];

  for (const log of userLogs) {
    const n = parseNightTimeToMidnightMinutes(log.last_unlock_prev_night);
    if (n !== null) nightMinsList.push(n);

    const m = parseMorningTimeToMinutes(log.first_unlock_morning);
    if (m !== null) {
      morningMinsList.push(m);
      const isWeekend = log.day_of_week === 'Saturday' || log.day_of_week === 'Sunday';
      if (isWeekend) {
        weekendMorningList.push(m);
      } else {
        weekdayMorningList.push(m);
      }
    }

    if (log.sleep_duration_estimate_mins !== null && log.sleep_duration_estimate_mins > 0) {
      sleepMinsList.push(log.sleep_duration_estimate_mins);
    }
  }

  // 1. Nighttime phone activity alignment score (0 - 100)
  // Distance from reference night unlock (e.g. 23:00)
  // Penalty: 100 - (absDiff / 180 min) * 100. At 3 hours off, score is 0.
  const medianNightMins = nightMinsList.length > 0 ? calculateMedian(nightMinsList) : refNightMins;
  const nightDiffMins = medianNightMins - refNightMins; // positive = later than ref
  const nightAbsDiff = Math.abs(nightDiffMins);
  const nightAlignmentScore = Math.max(0, Math.min(100, Math.round(100 - (nightAbsDiff / 180) * 100)));

  // 2. Morning unlock alignment score (0 - 100)
  // Distance from reference morning unlock (e.g. 07:00)
  // Penalty: 100 - (absDiff / 180 min) * 100.
  const medianMorningMins = morningMinsList.length > 0 ? calculateMedian(morningMinsList) : refMorningMins;
  const morningDiffMins = medianMorningMins - refMorningMins; // positive = later than ref
  const morningAbsDiff = Math.abs(morningDiffMins);
  const morningAlignmentScore = Math.max(0, Math.min(100, Math.round(100 - (morningAbsDiff / 180) * 100)));

  // 3. Consistency of sleep-wake timing across days (0 - 100)
  // Intra-individual day-to-day variance (StdDev of morning unlock and night unlock)
  // An ideal consistent schedule has stddev < 15 mins. A stddev of 90 mins drops score towards 0.
  const morningStdDev = calculateStdDev(morningMinsList);
  const nightStdDev = calculateStdDev(nightMinsList);
  const combinedStdDev = (morningStdDev * 0.6) + (nightStdDev * 0.4);
  const consistencyScore = Math.max(0, Math.min(100, Math.round(100 - (combinedStdDev / 90) * 100)));

  // Routine Consistency Score (Independent of reference alignment)
  // Purely measures how regular the person's own routine is
  const routineConsistencyScore = consistencyScore;

  // 4. Sleep duration alignment score (0 - 100)
  // Target 420 - 540 min (7-9 hours). Peak score 100 at 480 mins.
  const medianSleepMins = sleepMinsList.length > 0 ? calculateMedian(sleepMinsList) : refSleepMins;
  const sleepDiffMins = Math.abs(medianSleepMins - refSleepMins);
  const sleepDurationScore = Math.max(0, Math.min(100, Math.round(100 - (sleepDiffMins / 150) * 100)));

  // 5. Weekday-weekend schedule stability (0 - 100)
  // Difference between weekend wake time and weekday wake time (social jetlag)
  const weekdayAvgWake = weekdayMorningList.length > 0 
    ? weekdayMorningList.reduce((a, b) => a + b, 0) / weekdayMorningList.length 
    : refMorningMins;
  const weekendAvgWake = weekendMorningList.length > 0 
    ? weekendMorningList.reduce((a, b) => a + b, 0) / weekendMorningList.length 
    : weekdayAvgWake;
  const socialJetlagMinutes = Math.round(weekendAvgWake - weekdayAvgWake);
  const weekendStabilityScore = Math.max(0, Math.min(100, Math.round(100 - (Math.abs(socialJetlagMinutes) / 120) * 100)));

  // Weights normalization
  const totalWeight = (
    config.weightNightUnlock + 
    config.weightMorningUnlock + 
    config.weightConsistency + 
    config.weightSleepDuration + 
    config.weightWeekendStability
  ) || 1.0;

  const wNight = config.weightNightUnlock / totalWeight;
  const wMorning = config.weightMorningUnlock / totalWeight;
  const wConst = config.weightConsistency / totalWeight;
  const wSleep = config.weightSleepDuration / totalWeight;
  const wWknd = config.weightWeekendStability / totalWeight;

  const nightContribution = +(nightAlignmentScore * wNight).toFixed(1);
  const morningContribution = +(morningAlignmentScore * wMorning).toFixed(1);
  const consistencyContribution = +(consistencyScore * wConst).toFixed(1);
  const sleepDurationContribution = +(sleepDurationScore * wSleep).toFixed(1);
  const weekendStabilityContribution = +(weekendStabilityScore * wWknd).toFixed(1);

  const overallScore = Math.round(
    nightContribution + 
    morningContribution + 
    consistencyContribution + 
    sleepDurationContribution + 
    weekendStabilityContribution
  );

  let alignmentLevel: CircadianMetrics['alignmentLevel'] = 'Moderate Alignment';
  if (overallScore >= 80) alignmentLevel = 'High Alignment';
  else if (overallScore < 60) alignmentLevel = 'Greater Schedule Drift';

  // Overall Rhythm Drift composite (weighted average of night drift and morning drift)
  const rhythmDriftMinutes = Math.round((nightDiffMins * 0.5) + (morningDiffMins * 0.5));
  let rhythmDriftDirection: CircadianMetrics['rhythmDriftDirection'] = 'Aligned with reference';
  let rhythmDriftFormatted = 'Aligned with reference (within ±15m)';

  if (rhythmDriftMinutes > 15) {
    rhythmDriftDirection = 'Later than reference';
    rhythmDriftFormatted = `+${formatMinutesToDuration(rhythmDriftMinutes)} later than reference`;
  } else if (rhythmDriftMinutes < -15) {
    rhythmDriftDirection = 'Earlier than reference';
    rhythmDriftFormatted = `-${formatMinutesToDuration(Math.abs(rhythmDriftMinutes))} earlier than reference`;
  }

  const breakdown: CircadianComponentBreakdown = {
    nightAlignmentScore,
    morningAlignmentScore,
    consistencyScore,
    sleepDurationScore,
    weekendStabilityScore,
    nightContribution,
    morningContribution,
    consistencyContribution,
    sleepDurationContribution,
    weekendStabilityContribution,
  };

  return {
    userId,
    overallScore,
    alignmentLevel,
    breakdown,
    rhythmDriftMinutes,
    rhythmDriftFormatted,
    rhythmDriftDirection,
    routineConsistencyScore,
    medianNightUnlock: formatMidnightMinutesToTime(medianNightMins),
    medianMorningUnlock: formatMidnightMinutesToTime(medianMorningMins),
    medianSleepDurationMins: Math.round(medianSleepMins),
    morningUnlockStdDevMins: Math.round(morningStdDev),
    nightUnlockStdDevMins: Math.round(nightStdDev),
    weekdayAvgWakeTime: formatMidnightMinutesToTime(weekdayAvgWake),
    weekendAvgWakeTime: formatMidnightMinutesToTime(weekendAvgWake),
    socialJetlagMinutes,
  };
}

export function getEmptyCircadianMetrics(userId: string): CircadianMetrics {
  return {
    userId,
    overallScore: 0,
    alignmentLevel: 'Greater Schedule Drift',
    breakdown: {
      nightAlignmentScore: 0,
      morningAlignmentScore: 0,
      consistencyScore: 0,
      sleepDurationScore: 0,
      weekendStabilityScore: 0,
      nightContribution: 0,
      morningContribution: 0,
      consistencyContribution: 0,
      sleepDurationContribution: 0,
      weekendStabilityContribution: 0,
    },
    rhythmDriftMinutes: 0,
    rhythmDriftFormatted: 'No records available',
    rhythmDriftDirection: 'Aligned with reference',
    routineConsistencyScore: 0,
    medianNightUnlock: 'N/A',
    medianMorningUnlock: 'N/A',
    medianSleepDurationMins: 0,
    morningUnlockStdDevMins: 0,
    nightUnlockStdDevMins: 0,
    weekdayAvgWakeTime: 'N/A',
    weekendAvgWakeTime: 'N/A',
    socialJetlagMinutes: 0,
  };
}
