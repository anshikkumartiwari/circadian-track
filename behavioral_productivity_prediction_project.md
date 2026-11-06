# Behavioral Productivity Prediction

## Project overview

A personalized behavioral prediction system that uses daily smartphone usage, sleep-timing proxies, physical activity, and contextual signals to estimate whether a user is likely to have a productive day. It stores user-level daily observations, predictions, and feedback in Supabase so prediction quality can be evaluated and calibrated over time.

The project focuses on individual patterns rather than assuming the same routine works for everyone. Prediction quality should be measured against later user feedback or a separately defined outcome—not inferred from confidence scores alone.

## Database schema

```sql
-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.profiles (
  id uuid NOT NULL,
  display_name text,
  created_at timestamp with time zone DEFAULT now(),
  age integer,
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id)
);
CREATE TABLE public.daily_logs (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid,
  date date NOT NULL,
  last_unlock_prev_night time without time zone,
  first_unlock_morning time without time zone,
  sleep_duration_estimate_mins integer,
  total_screen_time_mins integer,
  unlock_count integer,
  avg_session_length_mins double precision,
  dominant_app_category text,
  step_count integer,
  active_minutes integer,
  primary_activity text,
  away_from_home_mins integer,
  calendar_event_count integer,
  weather_condition text,
  day_of_week text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT daily_logs_pkey PRIMARY KEY (id),
  CONSTRAINT daily_logs_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id)
);
CREATE TABLE public.predictions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid,
  date date NOT NULL,
  is_predictive boolean,
  confidence_score double precision,
  reason_tags ARRAY,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT predictions_pkey PRIMARY KEY (id),
  CONSTRAINT predictions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id)
);
CREATE TABLE public.feedback (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid,
  date date NOT NULL,
  rating integer CHECK (rating >= 0 AND rating <= 5),
  note text,
  submitted_at timestamp with time zone DEFAULT now(),
  CONSTRAINT feedback_pkey PRIMARY KEY (id),
  CONSTRAINT feedback_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id)
);
```

## What each table stores

### `profiles` — identity

| Column | Meaning |
|---|---|
| `id` | User UUID; must match `auth.users.id`. |
| `display_name` | Name shown by the app. |
| `created_at` | Profile creation timestamp. |
| `age` | Optional age feature; avoid using it unless there is a clear reason and appropriate consent. |

### `daily_logs` — daily behavioral features

| Column | Meaning |
|---|---|
| `id` | Unique log row UUID. |
| `user_id` | Profile the record belongs to. |
| `date` | Local/calendar day represented by the log. |
| `last_unlock_prev_night` | Time of the last recorded phone unlock the previous night; a proxy for late-night phone activity, not a confirmed bedtime. |
| `first_unlock_morning` | Time of first recorded morning unlock; a proxy for waking time, not a confirmed wake time. |
| `sleep_duration_estimate_mins` | Estimated sleep duration in minutes, if available from the collection/estimation method. |
| `total_screen_time_mins` | Total phone screen time that day, in minutes. |
| `unlock_count` | Number of device unlocks. |
| `avg_session_length_mins` | Average phone-use session length in minutes. |
| `dominant_app_category` | Most-used app category for the day. |
| `step_count` | Daily step count. |
| `active_minutes` | Estimated minutes of physical activity. |
| `primary_activity` | Main activity label for the day, if available. |
| `away_from_home_mins` | Estimated minutes spent away from home. |
| `calendar_event_count` | Number of calendar events that day. |
| `weather_condition` | Weather context associated with the day. |
| `day_of_week` | Day name, useful for weekday/weekend effects. |
| `created_at` | When the row was stored. |

### `predictions` — model output

| Column | Meaning |
|---|---|
| `id` | Unique prediction row UUID. |
| `user_id` | User the prediction is for. |
| `date` | Day the prediction refers to; for a next-day forecast this is the target date. |
| `is_predictive` | Boolean prediction field. In this project, define and document its semantics consistently—for example, `true` = predicted productive day and `false` = predicted less-productive day. The column name itself does not define that meaning. |
| `confidence_score` | Model-reported confidence/score. It is not automatically a calibrated probability or a measure of real-world accuracy. |
| `reason_tags` | Array of short labels explaining signals associated with the prediction, such as short sleep or high activity. |
| `created_at` | When the prediction was stored. |

### `feedback` — user evaluation

| Column | Meaning |
|---|---|
| `id` | Unique feedback row UUID. |
| `user_id` | User giving feedback. |
| `date` | Day or prediction the feedback refers to; the app should use one consistent convention. |
| `rating` | User rating from 0 to 5, enforced by the check constraint. |
| `note` | Optional explanation or correction in the user's own words. |
| `submitted_at` | Time feedback was submitted. |

## Prediction workflow

The intended workflow is:

1. **Build the daily feature record.** Use `daily_logs` to represent sleep-timing proxies, phone-use patterns, activity, and context for each user and day.
2. **Compare with the user's own history.** Give more weight to recent days than older ones so the model can adapt when an individual's routine changes. A recency-weighted behavioral score can be transformed to a prediction score/probability with a logistic function.
3. **Calibrate from feedback.** Compare prior predictions with subsequent feedback and use repeated feedback to adjust the person's baseline or score calibration. Sparse feedback—especially for a user who often skips it—should reduce how confidently the system adapts.
4. **Store the forecast.** Save the target date, predicted class, confidence/score, and reason tags in `predictions`.
5. **Evaluate over time.** Measure prediction-feedback alignment across chronological periods and users. Use held-out future days or rolling evaluation rather than evaluating on the same feedback used to calibrate the model.

The schema stores inputs, outputs, and feedback; it does **not** itself implement the model. The actual algorithm, feature weighting, recency decay, calibration update, and evaluation logic must live in application/model code. Likewise, a feedback row will not improve predictions unless that code reads and uses it.

## What can be inferred from the data

- **Sleep timing and regularity:** Compare `last_unlock_prev_night`, `first_unlock_morning`, and `sleep_duration_estimate_mins` over several weeks to identify late-night activity, shifts in morning routine, and day-to-day variability.
- **Possible circadian-rhythm patterns:** Repeated sleep/wake timing can suggest a person's habitual schedule and whether it shifts across weekdays, weekends, or periods of changed routine. The gap between last unlock and first unlock can be a rough timing proxy, but it is not equivalent to measured sleep.
- **Phone-use associations:** Check whether late unlocks, high screen time, frequent unlocks, or long sessions coincide with lower user-rated productivity.
- **Activity/context associations:** Explore whether steps, active minutes, calendar load, weather, or time spent away from home are associated with feedback. These are correlations, not proof of cause.
- **Personalization and adaptation:** Measure each user's prediction-feedback agreement over time. A user with more history may support more stable personalization; a user with less feedback has greater uncertainty.
- **Model drift:** Detect when the relationship between routines and feedback changes, such as during exams, holidays, illness, or a new daily schedule.

### What this says about circadian rhythm—and what it does not

Circadian rhythm concerns the body's roughly 24-hour timing system. This dataset can support **behavioral estimates of sleep/wake timing and regularity**, not a clinical measurement of circadian phase. Phone unlocks can happen well after waking or before actual sleep; screen inactivity does not prove sleep; and `sleep_duration_estimate_mins` depends on how it was estimated. Stronger conclusions would require validated sleep/wake measurements and consistent local-time handling across days.

The current schema has no dedicated nap-duration field, so daytime naps cannot be separated reliably from nighttime sleep unless they are encoded in another feature or collected separately. It also has no explicit model version, actual productivity label, or prediction-evaluation record; adding those would make experiments and model comparisons more reproducible.

## Interpretation cautions

- **Confidence is not accuracy.** Validate forecasts against feedback or a defined outcome.
- **Feedback is subjective and missingness matters.** Users who respond more often may appear easier to model simply because there is more evaluation data.
- **Avoid data leakage.** A prediction for date *D* should use only information available before the prediction was made—not feedback or activity recorded after *D*.
- **Treat synthetic seed data as test data.** Simulated feedback or a deliberately improving error pattern can test dashboards and pipelines, but cannot demonstrate that the real model improved.
- **Protect behavioral data.** Sleep timing, location-related activity, and phone-use histories are sensitive; collect only what is needed and restrict access by user.
