import { 
  DailyLog, 
  Prediction, 
  Feedback, 
  BehavioralInference, 
  BehavioralProfile, 
  Profile 
} from '@/types/database';
import { calculateCircadianMetrics } from './circadianEngine';
import { calculateMean, calculateStdDevVal, calculateMedianVal } from './statisticsEngine';
import { parseMorningTimeToMinutes, parseNightTimeToMidnightMinutes } from './circadianEngine';

export function generateBehavioralInferences(
  userId: string,
  userDisplayName: string,
  logs: DailyLog[],
  predictions: Prediction[],
  feedback: Feedback[]
): BehavioralInference[] {
  const userLogs = logs.filter(l => l.user_id === userId).sort((a, b) => a.date.localeCompare(b.date));
  if (userLogs.length < 3) return [];

  const startDate = userLogs[0].date;
  const endDate = userLogs[userLogs.length - 1].date;
  const periodStr = `${startDate} to ${endDate} (${userLogs.length} days observed)`;

  const inferences: BehavioralInference[] = [];

  // Metrics extraction
  const screenTimes = userLogs.map(l => l.total_screen_time_mins).filter((v): v is number => v !== null);
  const unlocks = userLogs.map(l => l.unlock_count).filter((v): v is number => v !== null);
  const sessionLengths = userLogs.map(l => l.avg_session_length_mins).filter((v): v is number => v !== null);
  const steps = userLogs.map(l => l.step_count).filter((v): v is number => v !== null);
  const activeMins = userLogs.map(l => l.active_minutes).filter((v): v is number => v !== null);
  const sleepDurations = userLogs.map(l => l.sleep_duration_estimate_mins).filter((v): v is number => v !== null && v > 0);

  const meanUnlocks = calculateMean(unlocks);
  const meanSession = calculateMean(sessionLengths);
  const meanScreen = calculateMean(screenTimes);
  const meanSteps = calculateMean(steps);
  const meanActive = calculateMean(activeMins);
  const meanSleep = calculateMean(sleepDurations);

  const nightMinsList = userLogs
    .map(l => parseNightTimeToMidnightMinutes(l.last_unlock_prev_night))
    .filter((v): v is number => v !== null);
  const morningMinsList = userLogs
    .map(l => parseMorningTimeToMinutes(l.first_unlock_morning))
    .filter((v): v is number => v !== null);

  const nightStdDev = calculateStdDevVal(nightMinsList);
  const morningStdDev = calculateStdDevVal(morningMinsList);

  // Split into earlier vs recent for trend detection
  const mid = Math.floor(userLogs.length / 2);
  const earlierLogs = userLogs.slice(0, mid);
  const recentLogs = userLogs.slice(mid);

  // 1. Frequent Checking Pattern
  // High unlock count (>65 unlocks) + short session length (<4.0 mins)
  if (meanUnlocks >= 65 && meanSession <= 4.0) {
    const earlierUnlocks = calculateMean(earlierLogs.map(l => l.unlock_count).filter((v): v is number => v !== null));
    const recentUnlocks = calculateMean(recentLogs.map(l => l.unlock_count).filter((v): v is number => v !== null));
    const trend = recentUnlocks > earlierUnlocks + 5 ? 'Increasing' : (recentUnlocks < earlierUnlocks - 5 ? 'Decreasing' : 'Stable');

    inferences.push({
      id: `${userId}-frequent-checking`,
      title: 'Frequent Phone-Checking Pattern',
      category: 'phone_use',
      inference: 'Frequent phone-checking pattern: phone unlocks occur repeatedly throughout the day with relatively brief engagement intervals.',
      evidence: `Average of ${Math.round(meanUnlocks)} unlocks/day paired with a short median session duration of ${meanSession.toFixed(1)} mins (total screen time ~${Math.round(meanScreen)} mins/day).`,
      strength: meanUnlocks >= 80 ? 'High' : 'Moderate',
      trend,
      implication: 'Suggests repeated micro-checks and frequent task switches rather than prolonged digital consumption. May indicate intermittent attentional shifts during focused work.',
      relevantPeriod: periodStr,
      metricsInvolved: ['unlock_count', 'avg_session_length_mins', 'total_screen_time_mins']
    });
  }

  // 2. Prolonged Phone Engagement
  // High screen time (>360 mins) + longer average session length (>8.0 mins)
  if (meanScreen >= 350 && meanSession >= 8.0) {
    const earlierScreen = calculateMean(earlierLogs.map(l => l.total_screen_time_mins).filter((v): v is number => v !== null));
    const recentScreen = calculateMean(recentLogs.map(l => l.total_screen_time_mins).filter((v): v is number => v !== null));
    const trend = recentScreen > earlierScreen + 30 ? 'Increasing' : (recentScreen < earlierScreen - 30 ? 'Decreasing' : 'Stable');

    inferences.push({
      id: `${userId}-prolonged-engagement`,
      title: 'Prolonged Phone Engagement Pattern',
      category: 'phone_use',
      inference: 'Extended phone engagement: a substantial portion of daily phone use occurs in sustained, multi-minute sessions rather than quick checks.',
      evidence: `Daily screen time averages ${Math.round(meanScreen)} mins with an average session duration of ${meanSession.toFixed(1)} mins across a moderate unlock count of ${Math.round(meanUnlocks)} unlocks/day.`,
      strength: meanScreen >= 420 ? 'High' : 'Moderate',
      trend,
      implication: 'Reflects continuous media immersion, streaming, or deep social browsing. Prolonged sessions may compress available evening wind-down time.',
      relevantPeriod: periodStr,
      metricsInvolved: ['total_screen_time_mins', 'avg_session_length_mins', 'unlock_count']
    });
  }

  // 3. Late-Night Digital Activity & Schedule Drift
  // Mean night unlock past midnight (> 00:30, i.e. > 30 mins) or morning unlock > 08:30 (> 510 mins)
  const medianNightMins = calculateMedianVal(nightMinsList);
  const medianMorningMins = calculateMedianVal(morningMinsList);

  if (medianNightMins > 15 || medianMorningMins > 495) {
    const lateDays = nightMinsList.filter(m => m > 30).length; // past 00:30
    const lateRatio = Math.round((lateDays / nightMinsList.length) * 100);

    inferences.push({
      id: `${userId}-late-night-drift`,
      title: 'Late-Night Digital Activity & Schedule Drift',
      category: 'circadian',
      inference: 'Late-night phone activity coincides with a shifted morning routine, indicating a delayed circadian schedule relative to standard diurnal baselines.',
      evidence: `Nighttime unlocks extend past midnight on ${lateRatio}% of observed days (median night activity at ${medianNightMins > 0 ? `+${Math.round(medianNightMins)}m past midnight` : `${Math.round(Math.abs(medianNightMins))}m before midnight`}), coinciding with a later median wake proxy of ${Math.floor(medianMorningMins / 60)}:${Math.round(medianMorningMins % 60).toString().padStart(2, '0')} and an average sleep duration of ${Math.round(meanSleep)} mins.`,
      strength: lateRatio >= 60 ? 'High' : 'Moderate',
      trend: 'Stable',
      implication: 'Consistent delayed bedtime activity may shorten overall restorative sleep opportunity or induce morning grogginess on fixed early-schedule days.',
      relevantPeriod: periodStr,
      metricsInvolved: ['last_unlock_prev_night', 'first_unlock_morning', 'sleep_duration_estimate_mins']
    });
  }

  // 4. Irregular Sleep-Wake Routine
  // High day-to-day variance (StdDev in morning unlock > 40 min or night unlock > 45 min)
  if (morningStdDev >= 38 || nightStdDev >= 40) {
    inferences.push({
      id: `${userId}-irregular-routine`,
      title: 'Variable Day-to-Day Sleep-Wake Timing',
      category: 'routine',
      inference: "High schedule variability: the user's daily wake and sleep boundaries fluctuate substantially from day to day.",
      evidence: `Morning unlock timing has a standard deviation of ±${Math.round(morningStdDev)} mins, while evening activity fluctuates by ±${Math.round(nightStdDev)} mins across the observation window.`,
      strength: (morningStdDev >= 55 || nightStdDev >= 55) ? 'High' : 'Moderate',
      trend: 'Stable',
      implication: 'Irregular sleep timing can disrupt circadian phase anchoring, which may lead to fluctuating energy levels across consecutive workdays.',
      relevantPeriod: periodStr,
      metricsInvolved: ['first_unlock_morning', 'last_unlock_prev_night']
    });
  }

  // 5. High Activity with High Phone Use
  // Heavy screen time (>280 mins) yet high step count (>8,500) and high active minutes (>55)
  if (meanScreen >= 280 && meanSteps >= 8500 && meanActive >= 50) {
    inferences.push({
      id: `${userId}-active-heavy-user`,
      title: 'High Physical Activity Coexisting with Digital Engagement',
      category: 'physical_activity',
      inference: 'Substantial daily physical activity coexists with elevated phone use, demonstrating that screen time alone does not denote a sedentary routine.',
      evidence: `Maintains an average of ${Math.round(meanSteps).toLocaleString()} daily steps and ${Math.round(meanActive)} active minutes while logging ${Math.round(meanScreen)} minutes of daily screen time.`,
      strength: 'High',
      trend: 'Stable',
      implication: 'Physical stamina and aerobic energy remain well preserved. Digital habits likely occur during transit, breaks, or outdoor activities rather than full-day sedentary confinement.',
      relevantPeriod: periodStr,
      metricsInvolved: ['step_count', 'active_minutes', 'total_screen_time_mins']
    });
  }

  // 6. Stable Routine with Low Variability
  // Low morning stddev (<25 min) and low night stddev (<25 min)
  if (morningStdDev < 28 && nightStdDev < 28 && userLogs.length >= 7) {
    inferences.push({
      id: `${userId}-stable-routine`,
      title: 'Anchored Routine with High Temporal Stability',
      category: 'routine',
      inference: "Anchored daily routine: schedule exhibits exceptional day-to-day regularity with minimal variance in sleep and wake proxies.",
      evidence: `Morning unlock variability is tightly controlled at ±${Math.round(morningStdDev)} mins, with nighttime activity bounded within ±${Math.round(nightStdDev)} mins.`,
      strength: 'High',
      trend: 'Stable',
      implication: 'Strong routine anchoring reinforces circadian entrainment, typically supporting consistent daytime cognitive readiness and predictable productivity.',
      relevantPeriod: periodStr,
      metricsInvolved: ['first_unlock_morning', 'last_unlock_prev_night', 'sleep_duration_estimate_mins']
    });
  }

  // 7. Weekday vs Weekend Social Jetlag
  // Check difference between weekend morning unlock and weekday morning unlock
  const weekdayWakes = userLogs
    .filter(l => l.day_of_week !== 'Saturday' && l.day_of_week !== 'Sunday')
    .map(l => parseMorningTimeToMinutes(l.first_unlock_morning))
    .filter((v): v is number => v !== null);

  const weekendWakes = userLogs
    .filter(l => l.day_of_week === 'Saturday' || l.day_of_week === 'Sunday')
    .map(l => parseMorningTimeToMinutes(l.first_unlock_morning))
    .filter((v): v is number => v !== null);

  if (weekdayWakes.length > 0 && weekendWakes.length > 0) {
    const weekdayMean = calculateMean(weekdayWakes);
    const weekendMean = calculateMean(weekendWakes);
    const shiftMins = Math.round(weekendMean - weekdayMean);

    if (shiftMins >= 60) {
      inferences.push({
        id: `${userId}-social-jetlag`,
        title: 'Bimodal Weekday-to-Weekend Schedule Shift (Social Jetlag)',
        category: 'circadian',
        inference: 'Marked weekend schedule delay: wake-up timing shifts substantially later on weekends compared to weekday schedules.',
        evidence: `Weekend morning unlocks occur on average ${shiftMins} minutes later (${Math.floor(weekendMean / 60)}:${Math.round(weekendMean % 60).toString().padStart(2, '0')}) than weekday mornings (${Math.floor(weekdayMean / 60)}:${Math.round(weekdayMean % 60).toString().padStart(2, '0')}).`,
        strength: shiftMins >= 90 ? 'High' : 'Moderate',
        trend: 'Stable',
        implication: 'Significant weekend phase delays can induce Monday sleep inertia as the circadian clock attempts to re-synchronize with weekday commitments.',
        relevantPeriod: periodStr,
        metricsInvolved: ['first_unlock_morning', 'day_of_week']
      });
    }
  }

  // 8. Adaptive Calibration / Model Convergence
  const userPreds = predictions.filter(p => p.user_id === userId).sort((a, b) => a.date.localeCompare(b.date));
  const userFeedback = feedback.filter(f => f.user_id === userId).sort((a, b) => a.date.localeCompare(b.date));

  if (userPreds.length >= 10 && userFeedback.length >= 5) {
    const halfPred = Math.floor(userPreds.length / 2);
    const earlierPredConf = calculateMean(userPreds.slice(0, halfPred).map(p => p.confidence_score));
    const recentPredConf = calculateMean(userPreds.slice(halfPred).map(p => p.confidence_score));
    const confDiff = +(recentPredConf - earlierPredConf).toFixed(2);

    if (confDiff >= 0.06) {
      inferences.push({
        id: `${userId}-model-calibration`,
        title: 'Feedback-Driven Model Calibration & Confidence Growth',
        category: 'adaptation',
        inference: 'Prediction calibration improvement: model confidence and classification stability have progressively strengthened alongside regular feedback submissions.',
        evidence: `Average prediction confidence increased from ${(earlierPredConf * 100).toFixed(0)}% in the initial half to ${(recentPredConf * 100).toFixed(0)}% in the recent observation window (+${Math.round(confDiff * 100)}% gain) over ${userFeedback.length} user feedback checkpoints.`,
        strength: 'Moderate',
        trend: 'Increasing',
        implication: 'Demonstrates effective adaptation to personal behavioral baselines over longitudinal observation.',
        relevantPeriod: periodStr,
        metricsInvolved: ['confidence_score', 'feedback_rating']
      });
    }
  }

  return inferences;
}

/**
 * Synthesizes the multi-signal Behavioral Performance Profile.
 */
export function buildBehavioralProfile(
  profile: Profile,
  logs: DailyLog[],
  predictions: Prediction[],
  feedback: Feedback[]
): BehavioralProfile {
  const userId = profile.id;
  const userLogs = logs.filter(l => l.user_id === userId);
  const userPreds = predictions.filter(p => p.user_id === userId);

  const circ = calculateCircadianMetrics(userId, logs);
  const circadianScore = circ.overallScore;
  const routineConsistencyScore = circ.routineConsistencyScore;

  // Phone engagement score (0 - 100, where 100 is very high load)
  const screens = userLogs.map(l => l.total_screen_time_mins).filter((v): v is number => v !== null);
  const avgScreen = calculateMean(screens);
  const phoneEngagementScore = Math.min(100, Math.round((avgScreen / 500) * 100));

  // Physical activity score (0 - 100)
  const steps = userLogs.map(l => l.step_count).filter((v): v is number => v !== null);
  const avgSteps = calculateMean(steps);
  const physicalActivityScore = Math.min(100, Math.round((avgSteps / 11000) * 100));

  // Predicted productivity score (0 - 100)
  const prodDays = userPreds.filter(p => p.is_predictive).length;
  const predictedProductivityScore = userPreds.length > 0 
    ? Math.round((prodDays / userPreds.length) * 100) 
    : 70;

  // User feedback alignment
  const userFeed = feedback.filter(f => f.user_id === userId);
  const avgFeedRating = userFeed.length > 0 
    ? (userFeed.reduce((s, f) => s + f.rating, 0) / userFeed.length).toFixed(1)
    : null;
  const feedbackSentence = avgFeedRating ? ` User feedback reflects an average self-rated satisfaction of ${avgFeedRating} / 5.0.` : '';

  // Archetype classification
  let archetypeTag = 'Balanced Routine';
  let summaryNarrative = '';

  if (circadianScore >= 80 && routineConsistencyScore >= 80) {
    archetypeTag = 'Circadian-Aligned Regularity';
    summaryNarrative = `${profile.display_name} exhibits strong circadian rhythm alignment (${circadianScore}/100) and exceptional day-to-day routine stability (${routineConsistencyScore}/100). Phone usage is characterized by structured, frequent checking rather than prolonged evening immersion, sustaining high physical activity and consistent predicted productivity (${predictedProductivityScore}% productive days).${feedbackSentence}`;
  } else if (circ.rhythmDriftMinutes >= 90) {
    archetypeTag = 'Delayed Phase & Prolonged Engagement';
    summaryNarrative = `${profile.display_name} displays an evening-shifted chronotype with an estimated rhythm drift of ${circ.rhythmDriftFormatted}. Digital activity shows prolonged individual sessions and late-night phone engagement, leading to moderate morning wake delays and fluctuating predicted productivity.${feedbackSentence}`;
  } else if (circ.socialJetlagMinutes >= 60) {
    archetypeTag = 'Bimodal Weekday-Weekend Jetlag';
    summaryNarrative = `${profile.display_name} maintains a disciplined schedule during weekdays that sharply delays on weekends (+${circ.socialJetlagMinutes}m social jetlag). High physical activity and active outdoor pursuits coexist with high digital usage, with model confidence demonstrating measurable calibration over time.${feedbackSentence}`;
  } else {
    archetypeTag = 'Variable Diurnal Pattern';
    summaryNarrative = `${profile.display_name} demonstrates a moderate circadian alignment profile with periodic schedule shifts. Balancing evening digital wind-down boundaries with regular morning light exposure presents the most actionable opportunity for stabilization.${feedbackSentence}`;
  }

  return {
    userId,
    displayName: profile.display_name,
    circadianAlignmentScore: circadianScore,
    routineConsistencyScore,
    phoneEngagementScore,
    physicalActivityScore,
    predictedProductivityScore,
    summaryNarrative,
    archetypeTag
  };
}
