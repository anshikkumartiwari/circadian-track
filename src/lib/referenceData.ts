import { Profile, DailyLog, Prediction, Feedback } from "@/types/database";

export const REFERENCE_PROFILES: Profile[] = [
  {
    "id": "a1000000-0000-0000-0000-000000000001",
    "display_name": "Anshik",
    "age": 24
  },
  {
    "id": "a2000000-0000-0000-0000-000000000002",
    "display_name": "Aditya",
    "age": 25
  },
  {
    "id": "a3000000-0000-0000-0000-000000000003",
    "display_name": "Yash",
    "age": 23
  }
];

export const REFERENCE_DAILY_LOGS: DailyLog[] = [
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-01",
    "last_unlock_prev_night": "23:10:00",
    "first_unlock_morning": "07:03:00",
    "sleep_duration_estimate_mins": 463,
    "total_screen_time_mins": 168,
    "unlock_count": 84,
    "avg_session_length_mins": 2,
    "dominant_app_category": "Productivity",
    "step_count": 10773,
    "active_minutes": 57,
    "primary_activity": "Walking & Cardio",
    "away_from_home_mins": 480,
    "calendar_event_count": 5,
    "weather_condition": "Partly Cloudy",
    "day_of_week": "Tuesday"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-02",
    "last_unlock_prev_night": "23:15:00",
    "first_unlock_morning": "07:19:00",
    "sleep_duration_estimate_mins": 453,
    "total_screen_time_mins": 214,
    "unlock_count": 93,
    "avg_session_length_mins": 2.3,
    "dominant_app_category": "Productivity",
    "step_count": 9993,
    "active_minutes": 65,
    "primary_activity": "Brisk Walking",
    "away_from_home_mins": 503,
    "calendar_event_count": 6,
    "weather_condition": "Partly Cloudy",
    "day_of_week": "Wednesday"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-03",
    "last_unlock_prev_night": "23:13:00",
    "first_unlock_morning": "07:13:00",
    "sleep_duration_estimate_mins": 470,
    "total_screen_time_mins": 198,
    "unlock_count": 90,
    "avg_session_length_mins": 2.2,
    "dominant_app_category": "Productivity",
    "step_count": 11351,
    "active_minutes": 63,
    "primary_activity": "Walking & Cardio",
    "away_from_home_mins": 492,
    "calendar_event_count": 6,
    "weather_condition": "Partly Cloudy",
    "day_of_week": "Thursday"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-04",
    "last_unlock_prev_night": "23:17:00",
    "first_unlock_morning": "06:51:00",
    "sleep_duration_estimate_mins": 444,
    "total_screen_time_mins": 187,
    "unlock_count": 78,
    "avg_session_length_mins": 2.4,
    "dominant_app_category": "Communication",
    "step_count": 9331,
    "active_minutes": 53,
    "primary_activity": "Brisk Walking",
    "away_from_home_mins": 509,
    "calendar_event_count": 3,
    "weather_condition": "Overcast",
    "day_of_week": "Friday"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-05",
    "last_unlock_prev_night": "23:26:00",
    "first_unlock_morning": "07:14:00",
    "sleep_duration_estimate_mins": 463,
    "total_screen_time_mins": 216,
    "unlock_count": 77,
    "avg_session_length_mins": 2.8,
    "dominant_app_category": "Productivity",
    "step_count": 10779,
    "active_minutes": 52,
    "primary_activity": "Walking & Cardio",
    "away_from_home_mins": 336,
    "calendar_event_count": 2,
    "weather_condition": "Sunny",
    "day_of_week": "Saturday"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-06",
    "last_unlock_prev_night": "23:13:00",
    "first_unlock_morning": "07:15:00",
    "sleep_duration_estimate_mins": 450,
    "total_screen_time_mins": 200,
    "unlock_count": 91,
    "avg_session_length_mins": 2.2,
    "dominant_app_category": "Productivity",
    "step_count": 9826,
    "active_minutes": 64,
    "primary_activity": "Brisk Walking",
    "away_from_home_mins": 263,
    "calendar_event_count": 2,
    "weather_condition": "Sunny",
    "day_of_week": "Sunday"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-07",
    "last_unlock_prev_night": "23:17:00",
    "first_unlock_morning": "06:45:00",
    "sleep_duration_estimate_mins": 431,
    "total_screen_time_mins": 262,
    "unlock_count": 109,
    "avg_session_length_mins": 2.4,
    "dominant_app_category": "Communication",
    "step_count": 8280,
    "active_minutes": 79,
    "primary_activity": "Brisk Walking",
    "away_from_home_mins": 508,
    "calendar_event_count": 3,
    "weather_condition": "Overcast",
    "day_of_week": "Monday"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-08",
    "last_unlock_prev_night": "23:33:00",
    "first_unlock_morning": "07:04:00",
    "sleep_duration_estimate_mins": 464,
    "total_screen_time_mins": 307,
    "unlock_count": 96,
    "avg_session_length_mins": 3.2,
    "dominant_app_category": "Productivity",
    "step_count": 10892,
    "active_minutes": 68,
    "primary_activity": "Walking & Cardio",
    "away_from_home_mins": 574,
    "calendar_event_count": 5,
    "weather_condition": "Partly Cloudy",
    "day_of_week": "Tuesday"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-09",
    "last_unlock_prev_night": "23:21:00",
    "first_unlock_morning": "06:54:00",
    "sleep_duration_estimate_mins": 445,
    "total_screen_time_mins": 252,
    "unlock_count": 97,
    "avg_session_length_mins": 2.6,
    "dominant_app_category": "Communication",
    "step_count": 9431,
    "active_minutes": 69,
    "primary_activity": "Brisk Walking",
    "away_from_home_mins": 525,
    "calendar_event_count": 4,
    "weather_condition": "Partly Cloudy",
    "day_of_week": "Wednesday"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-10",
    "last_unlock_prev_night": "23:11:00",
    "first_unlock_morning": "07:03:00",
    "sleep_duration_estimate_mins": 437,
    "total_screen_time_mins": 189,
    "unlock_count": 90,
    "avg_session_length_mins": 2.1,
    "dominant_app_category": "Productivity",
    "step_count": 8751,
    "active_minutes": 63,
    "primary_activity": "Brisk Walking",
    "away_from_home_mins": 486,
    "calendar_event_count": 5,
    "weather_condition": "Partly Cloudy",
    "day_of_week": "Thursday"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-11",
    "last_unlock_prev_night": "23:15:00",
    "first_unlock_morning": "06:47:00",
    "sleep_duration_estimate_mins": 474,
    "total_screen_time_mins": 216,
    "unlock_count": 94,
    "avg_session_length_mins": 2.3,
    "dominant_app_category": "Communication",
    "step_count": 11652,
    "active_minutes": 66,
    "primary_activity": "Walking & Cardio",
    "away_from_home_mins": 503,
    "calendar_event_count": 3,
    "weather_condition": "Clear",
    "day_of_week": "Friday"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-12",
    "last_unlock_prev_night": "23:39:00",
    "first_unlock_morning": "07:00:00",
    "sleep_duration_estimate_mins": 461,
    "total_screen_time_mins": 284,
    "unlock_count": 81,
    "avg_session_length_mins": 3.5,
    "dominant_app_category": "Productivity",
    "step_count": 10655,
    "active_minutes": 55,
    "primary_activity": "Walking & Cardio",
    "away_from_home_mins": 418,
    "calendar_event_count": 1,
    "weather_condition": "Sunny",
    "day_of_week": "Saturday"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-13",
    "last_unlock_prev_night": "23:39:00",
    "first_unlock_morning": "06:51:00",
    "sleep_duration_estimate_mins": 460,
    "total_screen_time_mins": 308,
    "unlock_count": 88,
    "avg_session_length_mins": 3.5,
    "dominant_app_category": "Communication",
    "step_count": 10594,
    "active_minutes": 61,
    "primary_activity": "Walking & Cardio",
    "away_from_home_mins": 419,
    "calendar_event_count": 1,
    "weather_condition": "Sunny",
    "day_of_week": "Sunday"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-14",
    "last_unlock_prev_night": "23:32:00",
    "first_unlock_morning": "06:51:00",
    "sleep_duration_estimate_mins": 466,
    "total_screen_time_mins": 319,
    "unlock_count": 103,
    "avg_session_length_mins": 3.1,
    "dominant_app_category": "Communication",
    "step_count": 11037,
    "active_minutes": 74,
    "primary_activity": "Walking & Cardio",
    "away_from_home_mins": 569,
    "calendar_event_count": 3,
    "weather_condition": "Clear",
    "day_of_week": "Monday"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-15",
    "last_unlock_prev_night": "23:10:00",
    "first_unlock_morning": "06:49:00",
    "sleep_duration_estimate_mins": 458,
    "total_screen_time_mins": 176,
    "unlock_count": 88,
    "avg_session_length_mins": 2,
    "dominant_app_category": "Communication",
    "step_count": 10431,
    "active_minutes": 61,
    "primary_activity": "Walking & Cardio",
    "away_from_home_mins": 483,
    "calendar_event_count": 3,
    "weather_condition": "Partly Cloudy",
    "day_of_week": "Tuesday"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-16",
    "last_unlock_prev_night": "23:25:00",
    "first_unlock_morning": "07:03:00",
    "sleep_duration_estimate_mins": 434,
    "total_screen_time_mins": 305,
    "unlock_count": 109,
    "avg_session_length_mins": 2.8,
    "dominant_app_category": "Productivity",
    "step_count": 8562,
    "active_minutes": 79,
    "primary_activity": "Brisk Walking",
    "away_from_home_mins": 540,
    "calendar_event_count": 5,
    "weather_condition": "Partly Cloudy",
    "day_of_week": "Wednesday"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-17",
    "last_unlock_prev_night": "23:33:00",
    "first_unlock_morning": "06:54:00",
    "sleep_duration_estimate_mins": 459,
    "total_screen_time_mins": 342,
    "unlock_count": 107,
    "avg_session_length_mins": 3.2,
    "dominant_app_category": "Communication",
    "step_count": 10532,
    "active_minutes": 77,
    "primary_activity": "Walking & Cardio",
    "away_from_home_mins": 572,
    "calendar_event_count": 4,
    "weather_condition": "Sunny",
    "day_of_week": "Thursday"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-18",
    "last_unlock_prev_night": "23:23:00",
    "first_unlock_morning": "07:17:00",
    "sleep_duration_estimate_mins": 451,
    "total_screen_time_mins": 294,
    "unlock_count": 109,
    "avg_session_length_mins": 2.7,
    "dominant_app_category": "Productivity",
    "step_count": 9835,
    "active_minutes": 79,
    "primary_activity": "Brisk Walking",
    "away_from_home_mins": 532,
    "calendar_event_count": 6,
    "weather_condition": "Partly Cloudy",
    "day_of_week": "Friday"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-19",
    "last_unlock_prev_night": "23:33:00",
    "first_unlock_morning": "07:15:00",
    "sleep_duration_estimate_mins": 463,
    "total_screen_time_mins": 301,
    "unlock_count": 94,
    "avg_session_length_mins": 3.2,
    "dominant_app_category": "Productivity",
    "step_count": 10799,
    "active_minutes": 66,
    "primary_activity": "Walking & Cardio",
    "away_from_home_mins": 382,
    "calendar_event_count": 2,
    "weather_condition": "Overcast",
    "day_of_week": "Saturday"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-20",
    "last_unlock_prev_night": "23:25:00",
    "first_unlock_morning": "06:55:00",
    "sleep_duration_estimate_mins": 445,
    "total_screen_time_mins": 238,
    "unlock_count": 85,
    "avg_session_length_mins": 2.8,
    "dominant_app_category": "Communication",
    "step_count": 9402,
    "active_minutes": 59,
    "primary_activity": "Brisk Walking",
    "away_from_home_mins": 335,
    "calendar_event_count": 1,
    "weather_condition": "Sunny",
    "day_of_week": "Sunday"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-21",
    "last_unlock_prev_night": "23:27:00",
    "first_unlock_morning": "07:07:00",
    "sleep_duration_estimate_mins": 432,
    "total_screen_time_mins": 267,
    "unlock_count": 92,
    "avg_session_length_mins": 2.9,
    "dominant_app_category": "Productivity",
    "step_count": 8420,
    "active_minutes": 64,
    "primary_activity": "Brisk Walking",
    "away_from_home_mins": 548,
    "calendar_event_count": 5,
    "weather_condition": "Sunny",
    "day_of_week": "Monday"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-22",
    "last_unlock_prev_night": "23:10:00",
    "first_unlock_morning": "07:09:00",
    "sleep_duration_estimate_mins": 447,
    "total_screen_time_mins": 180,
    "unlock_count": 90,
    "avg_session_length_mins": 2,
    "dominant_app_category": "Productivity",
    "step_count": 9558,
    "active_minutes": 63,
    "primary_activity": "Brisk Walking",
    "away_from_home_mins": 481,
    "calendar_event_count": 5,
    "weather_condition": "Overcast",
    "day_of_week": "Tuesday"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-23",
    "last_unlock_prev_night": "23:13:00",
    "first_unlock_morning": "06:59:00",
    "sleep_duration_estimate_mins": 443,
    "total_screen_time_mins": 196,
    "unlock_count": 89,
    "avg_session_length_mins": 2.2,
    "dominant_app_category": "Productivity",
    "step_count": 9223,
    "active_minutes": 62,
    "primary_activity": "Brisk Walking",
    "away_from_home_mins": 495,
    "calendar_event_count": 4,
    "weather_condition": "Partly Cloudy",
    "day_of_week": "Wednesday"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-24",
    "last_unlock_prev_night": "23:20:00",
    "first_unlock_morning": "07:09:00",
    "sleep_duration_estimate_mins": 472,
    "total_screen_time_mins": 188,
    "unlock_count": 75,
    "avg_session_length_mins": 2.5,
    "dominant_app_category": "Productivity",
    "step_count": 11474,
    "active_minutes": 50,
    "primary_activity": "Walking & Cardio",
    "away_from_home_mins": 523,
    "calendar_event_count": 5,
    "weather_condition": "Sunny",
    "day_of_week": "Thursday"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-25",
    "last_unlock_prev_night": "23:34:00",
    "first_unlock_morning": "07:03:00",
    "sleep_duration_estimate_mins": 435,
    "total_screen_time_mins": 285,
    "unlock_count": 89,
    "avg_session_length_mins": 3.2,
    "dominant_app_category": "Productivity",
    "step_count": 8640,
    "active_minutes": 62,
    "primary_activity": "Brisk Walking",
    "away_from_home_mins": 578,
    "calendar_event_count": 5,
    "weather_condition": "Clear",
    "day_of_week": "Friday"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-26",
    "last_unlock_prev_night": "23:34:00",
    "first_unlock_morning": "06:58:00",
    "sleep_duration_estimate_mins": 433,
    "total_screen_time_mins": 304,
    "unlock_count": 95,
    "avg_session_length_mins": 3.2,
    "dominant_app_category": "Communication",
    "step_count": 8466,
    "active_minutes": 67,
    "primary_activity": "Brisk Walking",
    "away_from_home_mins": 386,
    "calendar_event_count": 1,
    "weather_condition": "Partly Cloudy",
    "day_of_week": "Saturday"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-27",
    "last_unlock_prev_night": "23:17:00",
    "first_unlock_morning": "06:58:00",
    "sleep_duration_estimate_mins": 444,
    "total_screen_time_mins": 230,
    "unlock_count": 96,
    "avg_session_length_mins": 2.4,
    "dominant_app_category": "Communication",
    "step_count": 9299,
    "active_minutes": 68,
    "primary_activity": "Brisk Walking",
    "away_from_home_mins": 285,
    "calendar_event_count": 1,
    "weather_condition": "Partly Cloudy",
    "day_of_week": "Sunday"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-28",
    "last_unlock_prev_night": "23:18:00",
    "first_unlock_morning": "07:19:00",
    "sleep_duration_estimate_mins": 438,
    "total_screen_time_mins": 235,
    "unlock_count": 98,
    "avg_session_length_mins": 2.4,
    "dominant_app_category": "Productivity",
    "step_count": 8887,
    "active_minutes": 69,
    "primary_activity": "Brisk Walking",
    "away_from_home_mins": 514,
    "calendar_event_count": 6,
    "weather_condition": "Sunny",
    "day_of_week": "Monday"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-29",
    "last_unlock_prev_night": "23:33:00",
    "first_unlock_morning": "06:49:00",
    "sleep_duration_estimate_mins": 446,
    "total_screen_time_mins": 262,
    "unlock_count": 82,
    "avg_session_length_mins": 3.2,
    "dominant_app_category": "Communication",
    "step_count": 9453,
    "active_minutes": 56,
    "primary_activity": "Brisk Walking",
    "away_from_home_mins": 574,
    "calendar_event_count": 3,
    "weather_condition": "Partly Cloudy",
    "day_of_week": "Tuesday"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-30",
    "last_unlock_prev_night": "23:15:00",
    "first_unlock_morning": "07:18:00",
    "sleep_duration_estimate_mins": 462,
    "total_screen_time_mins": 218,
    "unlock_count": 95,
    "avg_session_length_mins": 2.3,
    "dominant_app_category": "Productivity",
    "step_count": 10740,
    "active_minutes": 67,
    "primary_activity": "Walking & Cardio",
    "away_from_home_mins": 500,
    "calendar_event_count": 6,
    "weather_condition": "Sunny",
    "day_of_week": "Wednesday"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-10-01",
    "last_unlock_prev_night": "23:24:00",
    "first_unlock_morning": "06:57:00",
    "sleep_duration_estimate_mins": 443,
    "total_screen_time_mins": 238,
    "unlock_count": 88,
    "avg_session_length_mins": 2.7,
    "dominant_app_category": "Communication",
    "step_count": 9226,
    "active_minutes": 61,
    "primary_activity": "Brisk Walking",
    "away_from_home_mins": 538,
    "calendar_event_count": 4,
    "weather_condition": "Sunny",
    "day_of_week": "Thursday"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-10-02",
    "last_unlock_prev_night": "23:22:00",
    "first_unlock_morning": "06:56:00",
    "sleep_duration_estimate_mins": 445,
    "total_screen_time_mins": 203,
    "unlock_count": 78,
    "avg_session_length_mins": 2.6,
    "dominant_app_category": "Communication",
    "step_count": 9434,
    "active_minutes": 53,
    "primary_activity": "Brisk Walking",
    "away_from_home_mins": 531,
    "calendar_event_count": 4,
    "weather_condition": "Rainy",
    "day_of_week": "Friday"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-10-03",
    "last_unlock_prev_night": "23:22:00",
    "first_unlock_morning": "06:45:00",
    "sleep_duration_estimate_mins": 445,
    "total_screen_time_mins": 242,
    "unlock_count": 93,
    "avg_session_length_mins": 2.6,
    "dominant_app_category": "Communication",
    "step_count": 9429,
    "active_minutes": 66,
    "primary_activity": "Brisk Walking",
    "away_from_home_mins": 313,
    "calendar_event_count": 1,
    "weather_condition": "Clear",
    "day_of_week": "Saturday"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-10-04",
    "last_unlock_prev_night": "23:36:00",
    "first_unlock_morning": "07:16:00",
    "sleep_duration_estimate_mins": 473,
    "total_screen_time_mins": 337,
    "unlock_count": 102,
    "avg_session_length_mins": 3.3,
    "dominant_app_category": "Productivity",
    "step_count": 11577,
    "active_minutes": 73,
    "primary_activity": "Walking & Cardio",
    "away_from_home_mins": 396,
    "calendar_event_count": 2,
    "weather_condition": "Partly Cloudy",
    "day_of_week": "Sunday"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-10-05",
    "last_unlock_prev_night": "23:25:00",
    "first_unlock_morning": "06:51:00",
    "sleep_duration_estimate_mins": 469,
    "total_screen_time_mins": 288,
    "unlock_count": 103,
    "avg_session_length_mins": 2.8,
    "dominant_app_category": "Communication",
    "step_count": 11249,
    "active_minutes": 74,
    "primary_activity": "Walking & Cardio",
    "away_from_home_mins": 541,
    "calendar_event_count": 3,
    "weather_condition": "Overcast",
    "day_of_week": "Monday"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-10-06",
    "last_unlock_prev_night": "23:20:00",
    "first_unlock_morning": "07:06:00",
    "sleep_duration_estimate_mins": 460,
    "total_screen_time_mins": 265,
    "unlock_count": 106,
    "avg_session_length_mins": 2.5,
    "dominant_app_category": "Productivity",
    "step_count": 10561,
    "active_minutes": 76,
    "primary_activity": "Walking & Cardio",
    "away_from_home_mins": 521,
    "calendar_event_count": 5,
    "weather_condition": "Clear",
    "day_of_week": "Tuesday"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-10-07",
    "last_unlock_prev_night": "23:30:00",
    "first_unlock_morning": "07:19:00",
    "sleep_duration_estimate_mins": 473,
    "total_screen_time_mins": 237,
    "unlock_count": 79,
    "avg_session_length_mins": 3,
    "dominant_app_category": "Productivity",
    "step_count": 11614,
    "active_minutes": 53,
    "primary_activity": "Walking & Cardio",
    "away_from_home_mins": 561,
    "calendar_event_count": 6,
    "weather_condition": "Partly Cloudy",
    "day_of_week": "Wednesday"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-10-08",
    "last_unlock_prev_night": "23:11:00",
    "first_unlock_morning": "07:04:00",
    "sleep_duration_estimate_mins": 437,
    "total_screen_time_mins": 193,
    "unlock_count": 92,
    "avg_session_length_mins": 2.1,
    "dominant_app_category": "Productivity",
    "step_count": 8811,
    "active_minutes": 65,
    "primary_activity": "Brisk Walking",
    "away_from_home_mins": 484,
    "calendar_event_count": 5,
    "weather_condition": "Clear",
    "day_of_week": "Thursday"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-10-09",
    "last_unlock_prev_night": "23:33:00",
    "first_unlock_morning": "06:53:00",
    "sleep_duration_estimate_mins": 439,
    "total_screen_time_mins": 275,
    "unlock_count": 86,
    "avg_session_length_mins": 3.2,
    "dominant_app_category": "Communication",
    "step_count": 8957,
    "active_minutes": 60,
    "primary_activity": "Brisk Walking",
    "away_from_home_mins": 575,
    "calendar_event_count": 4,
    "weather_condition": "Rainy",
    "day_of_week": "Friday"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-10-10",
    "last_unlock_prev_night": "23:22:00",
    "first_unlock_morning": "07:18:00",
    "sleep_duration_estimate_mins": 455,
    "total_screen_time_mins": 234,
    "unlock_count": 90,
    "avg_session_length_mins": 2.6,
    "dominant_app_category": "Productivity",
    "step_count": 10212,
    "active_minutes": 63,
    "primary_activity": "Walking & Cardio",
    "away_from_home_mins": 314,
    "calendar_event_count": 2,
    "weather_condition": "Rainy",
    "day_of_week": "Saturday"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-10-11",
    "last_unlock_prev_night": "23:38:00",
    "first_unlock_morning": "07:02:00",
    "sleep_duration_estimate_mins": 450,
    "total_screen_time_mins": 262,
    "unlock_count": 77,
    "avg_session_length_mins": 3.4,
    "dominant_app_category": "Productivity",
    "step_count": 9810,
    "active_minutes": 52,
    "primary_activity": "Brisk Walking",
    "away_from_home_mins": 408,
    "calendar_event_count": 1,
    "weather_condition": "Rainy",
    "day_of_week": "Sunday"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-10-12",
    "last_unlock_prev_night": "23:14:00",
    "first_unlock_morning": "07:05:00",
    "sleep_duration_estimate_mins": 457,
    "total_screen_time_mins": 191,
    "unlock_count": 87,
    "avg_session_length_mins": 2.2,
    "dominant_app_category": "Productivity",
    "step_count": 10321,
    "active_minutes": 60,
    "primary_activity": "Walking & Cardio",
    "away_from_home_mins": 498,
    "calendar_event_count": 5,
    "weather_condition": "Partly Cloudy",
    "day_of_week": "Monday"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-10-13",
    "last_unlock_prev_night": "23:16:00",
    "first_unlock_morning": "07:13:00",
    "sleep_duration_estimate_mins": 451,
    "total_screen_time_mins": 223,
    "unlock_count": 97,
    "avg_session_length_mins": 2.3,
    "dominant_app_category": "Productivity",
    "step_count": 9885,
    "active_minutes": 69,
    "primary_activity": "Brisk Walking",
    "away_from_home_mins": 506,
    "calendar_event_count": 6,
    "weather_condition": "Sunny",
    "day_of_week": "Tuesday"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-10-14",
    "last_unlock_prev_night": "23:11:00",
    "first_unlock_morning": "07:07:00",
    "sleep_duration_estimate_mins": 460,
    "total_screen_time_mins": 168,
    "unlock_count": 80,
    "avg_session_length_mins": 2.1,
    "dominant_app_category": "Productivity",
    "step_count": 10560,
    "active_minutes": 54,
    "primary_activity": "Walking & Cardio",
    "away_from_home_mins": 486,
    "calendar_event_count": 5,
    "weather_condition": "Overcast",
    "day_of_week": "Wednesday"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-10-15",
    "last_unlock_prev_night": "23:16:00",
    "first_unlock_morning": "06:46:00",
    "sleep_duration_estimate_mins": 450,
    "total_screen_time_mins": 230,
    "unlock_count": 100,
    "avg_session_length_mins": 2.3,
    "dominant_app_category": "Communication",
    "step_count": 9808,
    "active_minutes": 72,
    "primary_activity": "Brisk Walking",
    "away_from_home_mins": 505,
    "calendar_event_count": 3,
    "weather_condition": "Overcast",
    "day_of_week": "Thursday"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-01",
    "last_unlock_prev_night": "001:16:00",
    "first_unlock_morning": "09:38:00",
    "sleep_duration_estimate_mins": 394,
    "total_screen_time_mins": 464,
    "unlock_count": 43,
    "avg_session_length_mins": 10.8,
    "dominant_app_category": "Entertainment",
    "step_count": 4467,
    "active_minutes": 28,
    "primary_activity": "Sedentary Work",
    "away_from_home_mins": 408,
    "calendar_event_count": 2,
    "weather_condition": "Sunny",
    "day_of_week": "Tuesday"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-02",
    "last_unlock_prev_night": "001:28:00",
    "first_unlock_morning": "09:56:00",
    "sleep_duration_estimate_mins": 425,
    "total_screen_time_mins": 520,
    "unlock_count": 40,
    "avg_session_length_mins": 13,
    "dominant_app_category": "Entertainment",
    "step_count": 5769,
    "active_minutes": 38,
    "primary_activity": "Sedentary Work",
    "away_from_home_mins": 393,
    "calendar_event_count": 2,
    "weather_condition": "Overcast",
    "day_of_week": "Wednesday"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-03",
    "last_unlock_prev_night": "001:16:00",
    "first_unlock_morning": "09:45:00",
    "sleep_duration_estimate_mins": 386,
    "total_screen_time_mins": 475,
    "unlock_count": 44,
    "avg_session_length_mins": 10.8,
    "dominant_app_category": "Entertainment",
    "step_count": 4130,
    "active_minutes": 31,
    "primary_activity": "Sedentary Work",
    "away_from_home_mins": 409,
    "calendar_event_count": 2,
    "weather_condition": "Rainy",
    "day_of_week": "Thursday"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-04",
    "last_unlock_prev_night": "002:31:00",
    "first_unlock_morning": "09:37:00",
    "sleep_duration_estimate_mins": 427,
    "total_screen_time_mins": 432,
    "unlock_count": 32,
    "avg_session_length_mins": 13.5,
    "dominant_app_category": "Entertainment",
    "step_count": 5862,
    "active_minutes": 25,
    "primary_activity": "Sedentary Work",
    "away_from_home_mins": 362,
    "calendar_event_count": 2,
    "weather_condition": "Partly Cloudy",
    "day_of_week": "Friday"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-05",
    "last_unlock_prev_night": "001:48:00",
    "first_unlock_morning": "09:20:00",
    "sleep_duration_estimate_mins": 401,
    "total_screen_time_mins": 857,
    "unlock_count": 51,
    "avg_session_length_mins": 16.8,
    "dominant_app_category": "Entertainment",
    "step_count": 4745,
    "active_minutes": 37,
    "primary_activity": "Sedentary Work",
    "away_from_home_mins": 312,
    "calendar_event_count": 1,
    "weather_condition": "Overcast",
    "day_of_week": "Saturday"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-06",
    "last_unlock_prev_night": "002:16:00",
    "first_unlock_morning": "09:23:00",
    "sleep_duration_estimate_mins": 405,
    "total_screen_time_mins": 342,
    "unlock_count": 32,
    "avg_session_length_mins": 10.7,
    "dominant_app_category": "Entertainment",
    "step_count": 4934,
    "active_minutes": 26,
    "primary_activity": "Sedentary Work",
    "away_from_home_mins": 183,
    "calendar_event_count": 0,
    "weather_condition": "Sunny",
    "day_of_week": "Sunday"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-07",
    "last_unlock_prev_night": "001:38:00",
    "first_unlock_morning": "09:32:00",
    "sleep_duration_estimate_mins": 410,
    "total_screen_time_mins": 636,
    "unlock_count": 43,
    "avg_session_length_mins": 14.8,
    "dominant_app_category": "Entertainment",
    "step_count": 5138,
    "active_minutes": 20,
    "primary_activity": "Sedentary Work",
    "away_from_home_mins": 408,
    "calendar_event_count": 3,
    "weather_condition": "Clear",
    "day_of_week": "Monday"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-08",
    "last_unlock_prev_night": "001:43:00",
    "first_unlock_morning": "10:07:00",
    "sleep_duration_estimate_mins": 398,
    "total_screen_time_mins": 769,
    "unlock_count": 49,
    "avg_session_length_mins": 15.7,
    "dominant_app_category": "Entertainment",
    "step_count": 4612,
    "active_minutes": 19,
    "primary_activity": "Sedentary Work",
    "away_from_home_mins": 429,
    "calendar_event_count": 3,
    "weather_condition": "Clear",
    "day_of_week": "Tuesday"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-09",
    "last_unlock_prev_night": "001:49:00",
    "first_unlock_morning": "10:07:00",
    "sleep_duration_estimate_mins": 396,
    "total_screen_time_mins": 693,
    "unlock_count": 41,
    "avg_session_length_mins": 16.9,
    "dominant_app_category": "Entertainment",
    "step_count": 4532,
    "active_minutes": 25,
    "primary_activity": "Sedentary Work",
    "away_from_home_mins": 399,
    "calendar_event_count": 3,
    "weather_condition": "Partly Cloudy",
    "day_of_week": "Wednesday"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-10",
    "last_unlock_prev_night": "001:42:00",
    "first_unlock_morning": "09:13:00",
    "sleep_duration_estimate_mins": 389,
    "total_screen_time_mins": 832,
    "unlock_count": 53,
    "avg_session_length_mins": 15.7,
    "dominant_app_category": "Social",
    "step_count": 4259,
    "active_minutes": 19,
    "primary_activity": "Sedentary Work",
    "away_from_home_mins": 449,
    "calendar_event_count": 3,
    "weather_condition": "Clear",
    "day_of_week": "Thursday"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-11",
    "last_unlock_prev_night": "001:36:00",
    "first_unlock_morning": "10:03:00",
    "sleep_duration_estimate_mins": 418,
    "total_screen_time_mins": 759,
    "unlock_count": 52,
    "avg_session_length_mins": 14.6,
    "dominant_app_category": "Entertainment",
    "step_count": 5481,
    "active_minutes": 36,
    "primary_activity": "Sedentary Work",
    "away_from_home_mins": 443,
    "calendar_event_count": 3,
    "weather_condition": "Overcast",
    "day_of_week": "Friday"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-12",
    "last_unlock_prev_night": "002:31:00",
    "first_unlock_morning": "08:45:00",
    "sleep_duration_estimate_mins": 389,
    "total_screen_time_mins": 476,
    "unlock_count": 35,
    "avg_session_length_mins": 13.6,
    "dominant_app_category": "Social",
    "step_count": 4228,
    "active_minutes": 23,
    "primary_activity": "Sedentary Work",
    "away_from_home_mins": 201,
    "calendar_event_count": 0,
    "weather_condition": "Partly Cloudy",
    "day_of_week": "Saturday"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-13",
    "last_unlock_prev_night": "001:40:00",
    "first_unlock_morning": "09:44:00",
    "sleep_duration_estimate_mins": 385,
    "total_screen_time_mins": 627,
    "unlock_count": 41,
    "avg_session_length_mins": 15.3,
    "dominant_app_category": "Entertainment",
    "step_count": 4078,
    "active_minutes": 27,
    "primary_activity": "Sedentary Work",
    "away_from_home_mins": 244,
    "calendar_event_count": 1,
    "weather_condition": "Sunny",
    "day_of_week": "Sunday"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-14",
    "last_unlock_prev_night": "001:36:00",
    "first_unlock_morning": "09:24:00",
    "sleep_duration_estimate_mins": 422,
    "total_screen_time_mins": 715,
    "unlock_count": 49,
    "avg_session_length_mins": 14.6,
    "dominant_app_category": "Entertainment",
    "step_count": 5643,
    "active_minutes": 35,
    "primary_activity": "Sedentary Work",
    "away_from_home_mins": 431,
    "calendar_event_count": 3,
    "weather_condition": "Overcast",
    "day_of_week": "Monday"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-15",
    "last_unlock_prev_night": "002:22:00",
    "first_unlock_morning": "09:39:00",
    "sleep_duration_estimate_mins": 385,
    "total_screen_time_mins": 440,
    "unlock_count": 37,
    "avg_session_length_mins": 11.9,
    "dominant_app_category": "Entertainment",
    "step_count": 4050,
    "active_minutes": 26,
    "primary_activity": "Sedentary Work",
    "away_from_home_mins": 384,
    "calendar_event_count": 2,
    "weather_condition": "Partly Cloudy",
    "day_of_week": "Tuesday"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-16",
    "last_unlock_prev_night": "002:36:00",
    "first_unlock_morning": "08:50:00",
    "sleep_duration_estimate_mins": 409,
    "total_screen_time_mins": 540,
    "unlock_count": 37,
    "avg_session_length_mins": 14.6,
    "dominant_app_category": "Social",
    "step_count": 5091,
    "active_minutes": 26,
    "primary_activity": "Sedentary Work",
    "away_from_home_mins": 381,
    "calendar_event_count": 3,
    "weather_condition": "Partly Cloudy",
    "day_of_week": "Wednesday"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-17",
    "last_unlock_prev_night": "002:33:00",
    "first_unlock_morning": "09:14:00",
    "sleep_duration_estimate_mins": 395,
    "total_screen_time_mins": 476,
    "unlock_count": 34,
    "avg_session_length_mins": 14,
    "dominant_app_category": "Social",
    "step_count": 4500,
    "active_minutes": 38,
    "primary_activity": "Sedentary Work",
    "away_from_home_mins": 371,
    "calendar_event_count": 3,
    "weather_condition": "Overcast",
    "day_of_week": "Thursday"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-18",
    "last_unlock_prev_night": "002:18:00",
    "first_unlock_morning": "09:03:00",
    "sleep_duration_estimate_mins": 415,
    "total_screen_time_mins": 355,
    "unlock_count": 32,
    "avg_session_length_mins": 11.1,
    "dominant_app_category": "Social",
    "step_count": 5347,
    "active_minutes": 36,
    "primary_activity": "Sedentary Work",
    "away_from_home_mins": 362,
    "calendar_event_count": 2,
    "weather_condition": "Overcast",
    "day_of_week": "Friday"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-19",
    "last_unlock_prev_night": "001:15:00",
    "first_unlock_morning": "09:51:00",
    "sleep_duration_estimate_mins": 394,
    "total_screen_time_mins": 456,
    "unlock_count": 43,
    "avg_session_length_mins": 10.6,
    "dominant_app_category": "Entertainment",
    "step_count": 4474,
    "active_minutes": 20,
    "primary_activity": "Sedentary Work",
    "away_from_home_mins": 258,
    "calendar_event_count": 0,
    "weather_condition": "Clear",
    "day_of_week": "Saturday"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-20",
    "last_unlock_prev_night": "002:28:00",
    "first_unlock_morning": "08:43:00",
    "sleep_duration_estimate_mins": 387,
    "total_screen_time_mins": 455,
    "unlock_count": 35,
    "avg_session_length_mins": 13,
    "dominant_app_category": "Social",
    "step_count": 4162,
    "active_minutes": 33,
    "primary_activity": "Sedentary Work",
    "away_from_home_mins": 203,
    "calendar_event_count": 0,
    "weather_condition": "Rainy",
    "day_of_week": "Sunday"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-21",
    "last_unlock_prev_night": "002:16:00",
    "first_unlock_morning": "09:43:00",
    "sleep_duration_estimate_mins": 419,
    "total_screen_time_mins": 389,
    "unlock_count": 36,
    "avg_session_length_mins": 10.8,
    "dominant_app_category": "Entertainment",
    "step_count": 5526,
    "active_minutes": 20,
    "primary_activity": "Sedentary Work",
    "away_from_home_mins": 377,
    "calendar_event_count": 2,
    "weather_condition": "Clear",
    "day_of_week": "Monday"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-22",
    "last_unlock_prev_night": "001:34:00",
    "first_unlock_morning": "09:25:00",
    "sleep_duration_estimate_mins": 419,
    "total_screen_time_mins": 719,
    "unlock_count": 51,
    "avg_session_length_mins": 14.1,
    "dominant_app_category": "Entertainment",
    "step_count": 5551,
    "active_minutes": 39,
    "primary_activity": "Sedentary Work",
    "away_from_home_mins": 438,
    "calendar_event_count": 3,
    "weather_condition": "Overcast",
    "day_of_week": "Tuesday"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-23",
    "last_unlock_prev_night": "002:40:00",
    "first_unlock_morning": "09:05:00",
    "sleep_duration_estimate_mins": 404,
    "total_screen_time_mins": 578,
    "unlock_count": 38,
    "avg_session_length_mins": 15.2,
    "dominant_app_category": "Social",
    "step_count": 4881,
    "active_minutes": 32,
    "primary_activity": "Sedentary Work",
    "away_from_home_mins": 386,
    "calendar_event_count": 3,
    "weather_condition": "Rainy",
    "day_of_week": "Wednesday"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-24",
    "last_unlock_prev_night": "002:29:00",
    "first_unlock_morning": "09:32:00",
    "sleep_duration_estimate_mins": 409,
    "total_screen_time_mins": 472,
    "unlock_count": 36,
    "avg_session_length_mins": 13.1,
    "dominant_app_category": "Entertainment",
    "step_count": 5084,
    "active_minutes": 23,
    "primary_activity": "Sedentary Work",
    "away_from_home_mins": 379,
    "calendar_event_count": 2,
    "weather_condition": "Partly Cloudy",
    "day_of_week": "Thursday"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-25",
    "last_unlock_prev_night": "001:27:00",
    "first_unlock_morning": "09:23:00",
    "sleep_duration_estimate_mins": 402,
    "total_screen_time_mins": 589,
    "unlock_count": 46,
    "avg_session_length_mins": 12.8,
    "dominant_app_category": "Entertainment",
    "step_count": 4815,
    "active_minutes": 25,
    "primary_activity": "Sedentary Work",
    "away_from_home_mins": 421,
    "calendar_event_count": 2,
    "weather_condition": "Partly Cloudy",
    "day_of_week": "Friday"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-26",
    "last_unlock_prev_night": "001:42:00",
    "first_unlock_morning": "09:58:00",
    "sleep_duration_estimate_mins": 398,
    "total_screen_time_mins": 733,
    "unlock_count": 47,
    "avg_session_length_mins": 15.6,
    "dominant_app_category": "Entertainment",
    "step_count": 4623,
    "active_minutes": 27,
    "primary_activity": "Sedentary Work",
    "away_from_home_mins": 288,
    "calendar_event_count": 1,
    "weather_condition": "Sunny",
    "day_of_week": "Saturday"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-27",
    "last_unlock_prev_night": "002:20:00",
    "first_unlock_morning": "09:19:00",
    "sleep_duration_estimate_mins": 418,
    "total_screen_time_mins": 433,
    "unlock_count": 38,
    "avg_session_length_mins": 11.4,
    "dominant_app_category": "Entertainment",
    "step_count": 5505,
    "active_minutes": 39,
    "primary_activity": "Sedentary Work",
    "away_from_home_mins": 227,
    "calendar_event_count": 0,
    "weather_condition": "Overcast",
    "day_of_week": "Sunday"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-28",
    "last_unlock_prev_night": "001:36:00",
    "first_unlock_morning": "09:26:00",
    "sleep_duration_estimate_mins": 370,
    "total_screen_time_mins": 730,
    "unlock_count": 50,
    "avg_session_length_mins": 14.6,
    "dominant_app_category": "Entertainment",
    "step_count": 3414,
    "active_minutes": 38,
    "primary_activity": "Sedentary Work",
    "away_from_home_mins": 434,
    "calendar_event_count": 3,
    "weather_condition": "Overcast",
    "day_of_week": "Monday"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-29",
    "last_unlock_prev_night": "001:21:00",
    "first_unlock_morning": "09:46:00",
    "sleep_duration_estimate_mins": 393,
    "total_screen_time_mins": 519,
    "unlock_count": 44,
    "avg_session_length_mins": 11.8,
    "dominant_app_category": "Entertainment",
    "step_count": 4415,
    "active_minutes": 27,
    "primary_activity": "Sedentary Work",
    "away_from_home_mins": 409,
    "calendar_event_count": 2,
    "weather_condition": "Sunny",
    "day_of_week": "Tuesday"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-30",
    "last_unlock_prev_night": "002:19:00",
    "first_unlock_morning": "09:08:00",
    "sleep_duration_estimate_mins": 430,
    "total_screen_time_mins": 399,
    "unlock_count": 35,
    "avg_session_length_mins": 11.4,
    "dominant_app_category": "Social",
    "step_count": 5997,
    "active_minutes": 34,
    "primary_activity": "Sedentary Work",
    "away_from_home_mins": 373,
    "calendar_event_count": 2,
    "weather_condition": "Rainy",
    "day_of_week": "Wednesday"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-10-01",
    "last_unlock_prev_night": "001:40:00",
    "first_unlock_morning": "09:10:00",
    "sleep_duration_estimate_mins": 400,
    "total_screen_time_mins": 714,
    "unlock_count": 47,
    "avg_session_length_mins": 15.2,
    "dominant_app_category": "Social",
    "step_count": 4692,
    "active_minutes": 30,
    "primary_activity": "Sedentary Work",
    "away_from_home_mins": 422,
    "calendar_event_count": 3,
    "weather_condition": "Sunny",
    "day_of_week": "Thursday"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-10-02",
    "last_unlock_prev_night": "001:22:00",
    "first_unlock_morning": "09:46:00",
    "sleep_duration_estimate_mins": 413,
    "total_screen_time_mins": 547,
    "unlock_count": 46,
    "avg_session_length_mins": 11.9,
    "dominant_app_category": "Entertainment",
    "step_count": 5254,
    "active_minutes": 22,
    "primary_activity": "Sedentary Work",
    "away_from_home_mins": 417,
    "calendar_event_count": 2,
    "weather_condition": "Clear",
    "day_of_week": "Friday"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-10-03",
    "last_unlock_prev_night": "002:43:00",
    "first_unlock_morning": "09:12:00",
    "sleep_duration_estimate_mins": 425,
    "total_screen_time_mins": 553,
    "unlock_count": 35,
    "avg_session_length_mins": 15.8,
    "dominant_app_category": "Social",
    "step_count": 5778,
    "active_minutes": 38,
    "primary_activity": "Sedentary Work",
    "away_from_home_mins": 206,
    "calendar_event_count": 1,
    "weather_condition": "Overcast",
    "day_of_week": "Saturday"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-10-04",
    "last_unlock_prev_night": "001:27:00",
    "first_unlock_morning": "09:09:00",
    "sleep_duration_estimate_mins": 387,
    "total_screen_time_mins": 653,
    "unlock_count": 51,
    "avg_session_length_mins": 12.8,
    "dominant_app_category": "Social",
    "step_count": 4145,
    "active_minutes": 30,
    "primary_activity": "Sedentary Work",
    "away_from_home_mins": 312,
    "calendar_event_count": 0,
    "weather_condition": "Sunny",
    "day_of_week": "Sunday"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-10-05",
    "last_unlock_prev_night": "001:43:00",
    "first_unlock_morning": "09:56:00",
    "sleep_duration_estimate_mins": 393,
    "total_screen_time_mins": 769,
    "unlock_count": 49,
    "avg_session_length_mins": 15.7,
    "dominant_app_category": "Entertainment",
    "step_count": 4432,
    "active_minutes": 19,
    "primary_activity": "Sedentary Work",
    "away_from_home_mins": 429,
    "calendar_event_count": 3,
    "weather_condition": "Clear",
    "day_of_week": "Monday"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-10-06",
    "last_unlock_prev_night": "002:26:00",
    "first_unlock_morning": "09:41:00",
    "sleep_duration_estimate_mins": 421,
    "total_screen_time_mins": 454,
    "unlock_count": 36,
    "avg_session_length_mins": 12.6,
    "dominant_app_category": "Entertainment",
    "step_count": 5616,
    "active_minutes": 31,
    "primary_activity": "Sedentary Work",
    "away_from_home_mins": 378,
    "calendar_event_count": 2,
    "weather_condition": "Rainy",
    "day_of_week": "Tuesday"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-10-07",
    "last_unlock_prev_night": "001:24:00",
    "first_unlock_morning": "09:35:00",
    "sleep_duration_estimate_mins": 423,
    "total_screen_time_mins": 586,
    "unlock_count": 48,
    "avg_session_length_mins": 12.2,
    "dominant_app_category": "Entertainment",
    "step_count": 5685,
    "active_minutes": 18,
    "primary_activity": "Sedentary Work",
    "away_from_home_mins": 429,
    "calendar_event_count": 2,
    "weather_condition": "Clear",
    "day_of_week": "Wednesday"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-10-08",
    "last_unlock_prev_night": "001:27:00",
    "first_unlock_morning": "09:59:00",
    "sleep_duration_estimate_mins": 408,
    "total_screen_time_mins": 512,
    "unlock_count": 40,
    "avg_session_length_mins": 12.8,
    "dominant_app_category": "Entertainment",
    "step_count": 5043,
    "active_minutes": 23,
    "primary_activity": "Sedentary Work",
    "away_from_home_mins": 395,
    "calendar_event_count": 2,
    "weather_condition": "Partly Cloudy",
    "day_of_week": "Thursday"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-10-09",
    "last_unlock_prev_night": "002:48:00",
    "first_unlock_morning": "09:45:00",
    "sleep_duration_estimate_mins": 395,
    "total_screen_time_mins": 655,
    "unlock_count": 39,
    "avg_session_length_mins": 16.8,
    "dominant_app_category": "Entertainment",
    "step_count": 4514,
    "active_minutes": 28,
    "primary_activity": "Sedentary Work",
    "away_from_home_mins": 388,
    "calendar_event_count": 3,
    "weather_condition": "Sunny",
    "day_of_week": "Friday"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-10-10",
    "last_unlock_prev_night": "002:17:00",
    "first_unlock_morning": "08:58:00",
    "sleep_duration_estimate_mins": 424,
    "total_screen_time_mins": 371,
    "unlock_count": 34,
    "avg_session_length_mins": 10.9,
    "dominant_app_category": "Social",
    "step_count": 5750,
    "active_minutes": 34,
    "primary_activity": "Sedentary Work",
    "away_from_home_mins": 198,
    "calendar_event_count": 0,
    "weather_condition": "Rainy",
    "day_of_week": "Saturday"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-10-11",
    "last_unlock_prev_night": "002:15:00",
    "first_unlock_morning": "08:41:00",
    "sleep_duration_estimate_mins": 384,
    "total_screen_time_mins": 403,
    "unlock_count": 38,
    "avg_session_length_mins": 10.6,
    "dominant_app_category": "Social",
    "step_count": 4006,
    "active_minutes": 23,
    "primary_activity": "Sedentary Work",
    "away_from_home_mins": 226,
    "calendar_event_count": 0,
    "weather_condition": "Partly Cloudy",
    "day_of_week": "Sunday"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-10-12",
    "last_unlock_prev_night": "001:46:00",
    "first_unlock_morning": "09:17:00",
    "sleep_duration_estimate_mins": 399,
    "total_screen_time_mins": 738,
    "unlock_count": 45,
    "avg_session_length_mins": 16.4,
    "dominant_app_category": "Entertainment",
    "step_count": 4657,
    "active_minutes": 35,
    "primary_activity": "Sedentary Work",
    "away_from_home_mins": 414,
    "calendar_event_count": 3,
    "weather_condition": "Rainy",
    "day_of_week": "Monday"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-10-13",
    "last_unlock_prev_night": "002:48:00",
    "first_unlock_morning": "09:00:00",
    "sleep_duration_estimate_mins": 425,
    "total_screen_time_mins": 551,
    "unlock_count": 33,
    "avg_session_length_mins": 16.7,
    "dominant_app_category": "Social",
    "step_count": 5799,
    "active_minutes": 30,
    "primary_activity": "Sedentary Work",
    "away_from_home_mins": 366,
    "calendar_event_count": 3,
    "weather_condition": "Sunny",
    "day_of_week": "Tuesday"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-10-14",
    "last_unlock_prev_night": "002:16:00",
    "first_unlock_morning": "09:27:00",
    "sleep_duration_estimate_mins": 404,
    "total_screen_time_mins": 385,
    "unlock_count": 36,
    "avg_session_length_mins": 10.7,
    "dominant_app_category": "Entertainment",
    "step_count": 4864,
    "active_minutes": 28,
    "primary_activity": "Sedentary Work",
    "away_from_home_mins": 377,
    "calendar_event_count": 2,
    "weather_condition": "Sunny",
    "day_of_week": "Wednesday"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-10-15",
    "last_unlock_prev_night": "002:45:00",
    "first_unlock_morning": "10:01:00",
    "sleep_duration_estimate_mins": 419,
    "total_screen_time_mins": 567,
    "unlock_count": 35,
    "avg_session_length_mins": 16.2,
    "dominant_app_category": "Entertainment",
    "step_count": 5515,
    "active_minutes": 35,
    "primary_activity": "Sedentary Work",
    "away_from_home_mins": 373,
    "calendar_event_count": 3,
    "weather_condition": "Rainy",
    "day_of_week": "Thursday"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-01",
    "last_unlock_prev_night": "23:32:00",
    "first_unlock_morning": "07:12:00",
    "sleep_duration_estimate_mins": 427,
    "total_screen_time_mins": 266,
    "unlock_count": 61,
    "avg_session_length_mins": 5,
    "dominant_app_category": "Productivity",
    "step_count": 10270,
    "active_minutes": 67,
    "primary_activity": "Running & Gym",
    "away_from_home_mins": 561,
    "calendar_event_count": 3,
    "weather_condition": "Overcast",
    "day_of_week": "Tuesday"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-02",
    "last_unlock_prev_night": "23:25:00",
    "first_unlock_morning": "07:27:00",
    "sleep_duration_estimate_mins": 450,
    "total_screen_time_mins": 322,
    "unlock_count": 74,
    "avg_session_length_mins": 4.4,
    "dominant_app_category": "Productivity",
    "step_count": 12575,
    "active_minutes": 84,
    "primary_activity": "Running & Gym",
    "away_from_home_mins": 536,
    "calendar_event_count": 5,
    "weather_condition": "Overcast",
    "day_of_week": "Wednesday"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-03",
    "last_unlock_prev_night": "23:23:00",
    "first_unlock_morning": "07:22:00",
    "sleep_duration_estimate_mins": 429,
    "total_screen_time_mins": 304,
    "unlock_count": 83,
    "avg_session_length_mins": 4.3,
    "dominant_app_category": "Productivity",
    "step_count": 10454,
    "active_minutes": 98,
    "primary_activity": "Running & Gym",
    "away_from_home_mins": 531,
    "calendar_event_count": 5,
    "weather_condition": "Clear",
    "day_of_week": "Thursday"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-04",
    "last_unlock_prev_night": "23:44:00",
    "first_unlock_morning": "07:06:00",
    "sleep_duration_estimate_mins": 453,
    "total_screen_time_mins": 246,
    "unlock_count": 82,
    "avg_session_length_mins": 6,
    "dominant_app_category": "Productivity",
    "step_count": 12829,
    "active_minutes": 96,
    "primary_activity": "Running & Gym",
    "away_from_home_mins": 598,
    "calendar_event_count": 3,
    "weather_condition": "Overcast",
    "day_of_week": "Friday"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-05",
    "last_unlock_prev_night": "02:43:00",
    "first_unlock_morning": "10:44:00",
    "sleep_duration_estimate_mins": 480,
    "total_screen_time_mins": 507,
    "unlock_count": 98,
    "avg_session_length_mins": 7.4,
    "dominant_app_category": "Social",
    "step_count": 12149,
    "active_minutes": 100,
    "primary_activity": "Football & Hiking",
    "away_from_home_mins": 559,
    "calendar_event_count": 1,
    "weather_condition": "Clear",
    "day_of_week": "Saturday"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-06",
    "last_unlock_prev_night": "02:24:00",
    "first_unlock_morning": "10:26:00",
    "sleep_duration_estimate_mins": 529,
    "total_screen_time_mins": 461,
    "unlock_count": 111,
    "avg_session_length_mins": 5.9,
    "dominant_app_category": "Social",
    "step_count": 14921,
    "active_minutes": 115,
    "primary_activity": "Football & Hiking",
    "away_from_home_mins": 445,
    "calendar_event_count": 1,
    "weather_condition": "Clear",
    "day_of_week": "Sunday"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-07",
    "last_unlock_prev_night": "23:24:00",
    "first_unlock_morning": "07:27:00",
    "sleep_duration_estimate_mins": 428,
    "total_screen_time_mins": 319,
    "unlock_count": 69,
    "avg_session_length_mins": 4.4,
    "dominant_app_category": "Productivity",
    "step_count": 10356,
    "active_minutes": 78,
    "primary_activity": "Running & Gym",
    "away_from_home_mins": 535,
    "calendar_event_count": 5,
    "weather_condition": "Rainy",
    "day_of_week": "Monday"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-08",
    "last_unlock_prev_night": "23:27:00",
    "first_unlock_morning": "07:10:00",
    "sleep_duration_estimate_mins": 437,
    "total_screen_time_mins": 260,
    "unlock_count": 62,
    "avg_session_length_mins": 4.6,
    "dominant_app_category": "Productivity",
    "step_count": 11272,
    "active_minutes": 68,
    "primary_activity": "Running & Gym",
    "away_from_home_mins": 545,
    "calendar_event_count": 3,
    "weather_condition": "Partly Cloudy",
    "day_of_week": "Tuesday"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-09",
    "last_unlock_prev_night": "23:44:00",
    "first_unlock_morning": "07:16:00",
    "sleep_duration_estimate_mins": 427,
    "total_screen_time_mins": 282,
    "unlock_count": 75,
    "avg_session_length_mins": 6,
    "dominant_app_category": "Productivity",
    "step_count": 10269,
    "active_minutes": 87,
    "primary_activity": "Running & Gym",
    "away_from_home_mins": 599,
    "calendar_event_count": 4,
    "weather_condition": "Rainy",
    "day_of_week": "Wednesday"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-10",
    "last_unlock_prev_night": "23:33:00",
    "first_unlock_morning": "07:22:00",
    "sleep_duration_estimate_mins": 430,
    "total_screen_time_mins": 301,
    "unlock_count": 75,
    "avg_session_length_mins": 5.1,
    "dominant_app_category": "Productivity",
    "step_count": 10585,
    "active_minutes": 87,
    "primary_activity": "Running & Gym",
    "away_from_home_mins": 562,
    "calendar_event_count": 5,
    "weather_condition": "Sunny",
    "day_of_week": "Thursday"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-11",
    "last_unlock_prev_night": "23:42:00",
    "first_unlock_morning": "07:20:00",
    "sleep_duration_estimate_mins": 435,
    "total_screen_time_mins": 294,
    "unlock_count": 80,
    "avg_session_length_mins": 5.8,
    "dominant_app_category": "Productivity",
    "step_count": 11045,
    "active_minutes": 93,
    "primary_activity": "Running & Gym",
    "away_from_home_mins": 591,
    "calendar_event_count": 4,
    "weather_condition": "Sunny",
    "day_of_week": "Friday"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-12",
    "last_unlock_prev_night": "02:49:00",
    "first_unlock_morning": "10:18:00",
    "sleep_duration_estimate_mins": 516,
    "total_screen_time_mins": 442,
    "unlock_count": 85,
    "avg_session_length_mins": 7.9,
    "dominant_app_category": "Social",
    "step_count": 14194,
    "active_minutes": 85,
    "primary_activity": "Football & Hiking",
    "away_from_home_mins": 594,
    "calendar_event_count": 1,
    "weather_condition": "Overcast",
    "day_of_week": "Saturday"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-13",
    "last_unlock_prev_night": "02:27:00",
    "first_unlock_morning": "10:40:00",
    "sleep_duration_estimate_mins": 486,
    "total_screen_time_mins": 497,
    "unlock_count": 87,
    "avg_session_length_mins": 6.1,
    "dominant_app_category": "Social",
    "step_count": 12510,
    "active_minutes": 88,
    "primary_activity": "Football & Hiking",
    "away_from_home_mins": 464,
    "calendar_event_count": 1,
    "weather_condition": "Partly Cloudy",
    "day_of_week": "Sunday"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-14",
    "last_unlock_prev_night": "23:38:00",
    "first_unlock_morning": "07:28:00",
    "sleep_duration_estimate_mins": 431,
    "total_screen_time_mins": 323,
    "unlock_count": 81,
    "avg_session_length_mins": 5.5,
    "dominant_app_category": "Productivity",
    "step_count": 10615,
    "active_minutes": 94,
    "primary_activity": "Running & Gym",
    "away_from_home_mins": 580,
    "calendar_event_count": 5,
    "weather_condition": "Partly Cloudy",
    "day_of_week": "Monday"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-15",
    "last_unlock_prev_night": "23:33:00",
    "first_unlock_morning": "07:25:00",
    "sleep_duration_estimate_mins": 434,
    "total_screen_time_mins": 312,
    "unlock_count": 78,
    "avg_session_length_mins": 5.1,
    "dominant_app_category": "Productivity",
    "step_count": 10975,
    "active_minutes": 91,
    "primary_activity": "Running & Gym",
    "away_from_home_mins": 563,
    "calendar_event_count": 5,
    "weather_condition": "Sunny",
    "day_of_week": "Tuesday"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-16",
    "last_unlock_prev_night": "23:21:00",
    "first_unlock_morning": "07:21:00",
    "sleep_duration_estimate_mins": 448,
    "total_screen_time_mins": 298,
    "unlock_count": 78,
    "avg_session_length_mins": 4.1,
    "dominant_app_category": "Productivity",
    "step_count": 12371,
    "active_minutes": 90,
    "primary_activity": "Running & Gym",
    "away_from_home_mins": 523,
    "calendar_event_count": 4,
    "weather_condition": "Partly Cloudy",
    "day_of_week": "Wednesday"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-17",
    "last_unlock_prev_night": "23:35:00",
    "first_unlock_morning": "07:09:00",
    "sleep_duration_estimate_mins": 442,
    "total_screen_time_mins": 257,
    "unlock_count": 71,
    "avg_session_length_mins": 5.2,
    "dominant_app_category": "Productivity",
    "step_count": 11760,
    "active_minutes": 81,
    "primary_activity": "Running & Gym",
    "away_from_home_mins": 569,
    "calendar_event_count": 3,
    "weather_condition": "Sunny",
    "day_of_week": "Thursday"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-18",
    "last_unlock_prev_night": "23:37:00",
    "first_unlock_morning": "07:28:00",
    "sleep_duration_estimate_mins": 427,
    "total_screen_time_mins": 325,
    "unlock_count": 62,
    "avg_session_length_mins": 5.4,
    "dominant_app_category": "Productivity",
    "step_count": 10205,
    "active_minutes": 68,
    "primary_activity": "Running & Gym",
    "away_from_home_mins": 576,
    "calendar_event_count": 5,
    "weather_condition": "Rainy",
    "day_of_week": "Friday"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-19",
    "last_unlock_prev_night": "02:42:00",
    "first_unlock_morning": "10:24:00",
    "sleep_duration_estimate_mins": 487,
    "total_screen_time_mins": 457,
    "unlock_count": 101,
    "avg_session_length_mins": 7.4,
    "dominant_app_category": "Social",
    "step_count": 12557,
    "active_minutes": 104,
    "primary_activity": "Football & Hiking",
    "away_from_home_mins": 553,
    "calendar_event_count": 1,
    "weather_condition": "Overcast",
    "day_of_week": "Saturday"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-20",
    "last_unlock_prev_night": "02:42:00",
    "first_unlock_morning": "10:43:00",
    "sleep_duration_estimate_mins": 477,
    "total_screen_time_mins": 507,
    "unlock_count": 106,
    "avg_session_length_mins": 7.4,
    "dominant_app_category": "Social",
    "step_count": 12010,
    "active_minutes": 109,
    "primary_activity": "Football & Hiking",
    "away_from_home_mins": 553,
    "calendar_event_count": 1,
    "weather_condition": "Overcast",
    "day_of_week": "Sunday"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-21",
    "last_unlock_prev_night": "23:23:00",
    "first_unlock_morning": "07:14:00",
    "sleep_duration_estimate_mins": 431,
    "total_screen_time_mins": 275,
    "unlock_count": 67,
    "avg_session_length_mins": 4.3,
    "dominant_app_category": "Productivity",
    "step_count": 10691,
    "active_minutes": 74,
    "primary_activity": "Running & Gym",
    "away_from_home_mins": 530,
    "calendar_event_count": 4,
    "weather_condition": "Sunny",
    "day_of_week": "Monday"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-22",
    "last_unlock_prev_night": "23:25:00",
    "first_unlock_morning": "07:21:00",
    "sleep_duration_estimate_mins": 423,
    "total_screen_time_mins": 299,
    "unlock_count": 81,
    "avg_session_length_mins": 4.4,
    "dominant_app_category": "Productivity",
    "step_count": 9895,
    "active_minutes": 95,
    "primary_activity": "Running & Gym",
    "away_from_home_mins": 536,
    "calendar_event_count": 4,
    "weather_condition": "Clear",
    "day_of_week": "Tuesday"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-23",
    "last_unlock_prev_night": "23:32:00",
    "first_unlock_morning": "07:22:00",
    "sleep_duration_estimate_mins": 449,
    "total_screen_time_mins": 303,
    "unlock_count": 64,
    "avg_session_length_mins": 5,
    "dominant_app_category": "Productivity",
    "step_count": 12439,
    "active_minutes": 70,
    "primary_activity": "Running & Gym",
    "away_from_home_mins": 559,
    "calendar_event_count": 5,
    "weather_condition": "Sunny",
    "day_of_week": "Wednesday"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-24",
    "last_unlock_prev_night": "23:22:00",
    "first_unlock_morning": "07:22:00",
    "sleep_duration_estimate_mins": 425,
    "total_screen_time_mins": 301,
    "unlock_count": 62,
    "avg_session_length_mins": 4.2,
    "dominant_app_category": "Productivity",
    "step_count": 10033,
    "active_minutes": 68,
    "primary_activity": "Running & Gym",
    "away_from_home_mins": 527,
    "calendar_event_count": 5,
    "weather_condition": "Partly Cloudy",
    "day_of_week": "Thursday"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-25",
    "last_unlock_prev_night": "23:25:00",
    "first_unlock_morning": "07:27:00",
    "sleep_duration_estimate_mins": 422,
    "total_screen_time_mins": 319,
    "unlock_count": 61,
    "avg_session_length_mins": 4.5,
    "dominant_app_category": "Productivity",
    "step_count": 9758,
    "active_minutes": 67,
    "primary_activity": "Running & Gym",
    "away_from_home_mins": 539,
    "calendar_event_count": 5,
    "weather_condition": "Sunny",
    "day_of_week": "Friday"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-26",
    "last_unlock_prev_night": "02:29:00",
    "first_unlock_morning": "10:37:00",
    "sleep_duration_estimate_mins": 492,
    "total_screen_time_mins": 490,
    "unlock_count": 107,
    "avg_session_length_mins": 6.3,
    "dominant_app_category": "Social",
    "step_count": 12821,
    "active_minutes": 110,
    "primary_activity": "Football & Hiking",
    "away_from_home_mins": 475,
    "calendar_event_count": 1,
    "weather_condition": "Clear",
    "day_of_week": "Saturday"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-27",
    "last_unlock_prev_night": "02:25:00",
    "first_unlock_morning": "10:42:00",
    "sleep_duration_estimate_mins": 528,
    "total_screen_time_mins": 502,
    "unlock_count": 114,
    "avg_session_length_mins": 5.9,
    "dominant_app_category": "Social",
    "step_count": 14861,
    "active_minutes": 118,
    "primary_activity": "Football & Hiking",
    "away_from_home_mins": 451,
    "calendar_event_count": 1,
    "weather_condition": "Sunny",
    "day_of_week": "Sunday"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-28",
    "last_unlock_prev_night": "23:35:00",
    "first_unlock_morning": "07:15:00",
    "sleep_duration_estimate_mins": 445,
    "total_screen_time_mins": 278,
    "unlock_count": 64,
    "avg_session_length_mins": 5.3,
    "dominant_app_category": "Productivity",
    "step_count": 12068,
    "active_minutes": 71,
    "primary_activity": "Running & Gym",
    "away_from_home_mins": 570,
    "calendar_event_count": 4,
    "weather_condition": "Sunny",
    "day_of_week": "Monday"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-29",
    "last_unlock_prev_night": "23:36:00",
    "first_unlock_morning": "07:19:00",
    "sleep_duration_estimate_mins": 429,
    "total_screen_time_mins": 293,
    "unlock_count": 70,
    "avg_session_length_mins": 5.4,
    "dominant_app_category": "Productivity",
    "step_count": 10492,
    "active_minutes": 79,
    "primary_activity": "Running & Gym",
    "away_from_home_mins": 574,
    "calendar_event_count": 4,
    "weather_condition": "Rainy",
    "day_of_week": "Tuesday"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-30",
    "last_unlock_prev_night": "23:21:00",
    "first_unlock_morning": "07:17:00",
    "sleep_duration_estimate_mins": 449,
    "total_screen_time_mins": 285,
    "unlock_count": 77,
    "avg_session_length_mins": 4.1,
    "dominant_app_category": "Productivity",
    "step_count": 12426,
    "active_minutes": 89,
    "primary_activity": "Running & Gym",
    "away_from_home_mins": 523,
    "calendar_event_count": 4,
    "weather_condition": "Sunny",
    "day_of_week": "Wednesday"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-10-01",
    "last_unlock_prev_night": "23:42:00",
    "first_unlock_morning": "07:23:00",
    "sleep_duration_estimate_mins": 435,
    "total_screen_time_mins": 306,
    "unlock_count": 65,
    "avg_session_length_mins": 5.8,
    "dominant_app_category": "Productivity",
    "step_count": 11037,
    "active_minutes": 72,
    "primary_activity": "Running & Gym",
    "away_from_home_mins": 592,
    "calendar_event_count": 5,
    "weather_condition": "Sunny",
    "day_of_week": "Thursday"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-10-02",
    "last_unlock_prev_night": "23:40:00",
    "first_unlock_morning": "07:05:00",
    "sleep_duration_estimate_mins": 429,
    "total_screen_time_mins": 242,
    "unlock_count": 74,
    "avg_session_length_mins": 5.6,
    "dominant_app_category": "Productivity",
    "step_count": 10415,
    "active_minutes": 85,
    "primary_activity": "Running & Gym",
    "away_from_home_mins": 584,
    "calendar_event_count": 3,
    "weather_condition": "Rainy",
    "day_of_week": "Friday"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-10-03",
    "last_unlock_prev_night": "02:31:00",
    "first_unlock_morning": "10:33:00",
    "sleep_duration_estimate_mins": 521,
    "total_screen_time_mins": 480,
    "unlock_count": 119,
    "avg_session_length_mins": 6.5,
    "dominant_app_category": "Social",
    "step_count": 14485,
    "active_minutes": 124,
    "primary_activity": "Football & Hiking",
    "away_from_home_mins": 489,
    "calendar_event_count": 1,
    "weather_condition": "Overcast",
    "day_of_week": "Saturday"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-10-04",
    "last_unlock_prev_night": "02:46:00",
    "first_unlock_morning": "10:24:00",
    "sleep_duration_estimate_mins": 521,
    "total_screen_time_mins": 458,
    "unlock_count": 96,
    "avg_session_length_mins": 7.7,
    "dominant_app_category": "Social",
    "step_count": 14462,
    "active_minutes": 97,
    "primary_activity": "Football & Hiking",
    "away_from_home_mins": 580,
    "calendar_event_count": 1,
    "weather_condition": "Rainy",
    "day_of_week": "Sunday"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-10-05",
    "last_unlock_prev_night": "23:24:00",
    "first_unlock_morning": "07:06:00",
    "sleep_duration_estimate_mins": 443,
    "total_screen_time_mins": 243,
    "unlock_count": 70,
    "avg_session_length_mins": 4.3,
    "dominant_app_category": "Productivity",
    "step_count": 11844,
    "active_minutes": 80,
    "primary_activity": "Running & Gym",
    "away_from_home_mins": 533,
    "calendar_event_count": 3,
    "weather_condition": "Overcast",
    "day_of_week": "Monday"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-10-06",
    "last_unlock_prev_night": "23:28:00",
    "first_unlock_morning": "07:20:00",
    "sleep_duration_estimate_mins": 449,
    "total_screen_time_mins": 296,
    "unlock_count": 74,
    "avg_session_length_mins": 4.7,
    "dominant_app_category": "Productivity",
    "step_count": 12463,
    "active_minutes": 84,
    "primary_activity": "Running & Gym",
    "away_from_home_mins": 546,
    "calendar_event_count": 4,
    "weather_condition": "Overcast",
    "day_of_week": "Tuesday"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-10-07",
    "last_unlock_prev_night": "23:38:00",
    "first_unlock_morning": "07:18:00",
    "sleep_duration_estimate_mins": 423,
    "total_screen_time_mins": 288,
    "unlock_count": 83,
    "avg_session_length_mins": 5.5,
    "dominant_app_category": "Productivity",
    "step_count": 9800,
    "active_minutes": 98,
    "primary_activity": "Running & Gym",
    "away_from_home_mins": 579,
    "calendar_event_count": 4,
    "weather_condition": "Sunny",
    "day_of_week": "Wednesday"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-10-08",
    "last_unlock_prev_night": "23:35:00",
    "first_unlock_morning": "07:23:00",
    "sleep_duration_estimate_mins": 435,
    "total_screen_time_mins": 305,
    "unlock_count": 62,
    "avg_session_length_mins": 5.2,
    "dominant_app_category": "Productivity",
    "step_count": 11024,
    "active_minutes": 68,
    "primary_activity": "Running & Gym",
    "away_from_home_mins": 568,
    "calendar_event_count": 5,
    "weather_condition": "Partly Cloudy",
    "day_of_week": "Thursday"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-10-09",
    "last_unlock_prev_night": "23:42:00",
    "first_unlock_morning": "07:26:00",
    "sleep_duration_estimate_mins": 443,
    "total_screen_time_mins": 317,
    "unlock_count": 63,
    "avg_session_length_mins": 5.8,
    "dominant_app_category": "Productivity",
    "step_count": 11806,
    "active_minutes": 69,
    "primary_activity": "Running & Gym",
    "away_from_home_mins": 591,
    "calendar_event_count": 5,
    "weather_condition": "Clear",
    "day_of_week": "Friday"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-10-10",
    "last_unlock_prev_night": "02:27:00",
    "first_unlock_morning": "10:36:00",
    "sleep_duration_estimate_mins": 464,
    "total_screen_time_mins": 487,
    "unlock_count": 109,
    "avg_session_length_mins": 6.1,
    "dominant_app_category": "Social",
    "step_count": 11260,
    "active_minutes": 112,
    "primary_activity": "Football & Hiking",
    "away_from_home_mins": 464,
    "calendar_event_count": 1,
    "weather_condition": "Rainy",
    "day_of_week": "Saturday"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-10-11",
    "last_unlock_prev_night": "02:34:00",
    "first_unlock_morning": "10:28:00",
    "sleep_duration_estimate_mins": 518,
    "total_screen_time_mins": 467,
    "unlock_count": 100,
    "avg_session_length_mins": 6.7,
    "dominant_app_category": "Social",
    "step_count": 14263,
    "active_minutes": 102,
    "primary_activity": "Football & Hiking",
    "away_from_home_mins": 509,
    "calendar_event_count": 1,
    "weather_condition": "Rainy",
    "day_of_week": "Sunday"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-10-12",
    "last_unlock_prev_night": "23:21:00",
    "first_unlock_morning": "07:24:00",
    "sleep_duration_estimate_mins": 452,
    "total_screen_time_mins": 310,
    "unlock_count": 74,
    "avg_session_length_mins": 4.1,
    "dominant_app_category": "Productivity",
    "step_count": 12793,
    "active_minutes": 85,
    "primary_activity": "Running & Gym",
    "away_from_home_mins": 524,
    "calendar_event_count": 5,
    "weather_condition": "Overcast",
    "day_of_week": "Monday"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-10-13",
    "last_unlock_prev_night": "23:37:00",
    "first_unlock_morning": "07:13:00",
    "sleep_duration_estimate_mins": 453,
    "total_screen_time_mins": 269,
    "unlock_count": 68,
    "avg_session_length_mins": 5.4,
    "dominant_app_category": "Productivity",
    "step_count": 12864,
    "active_minutes": 76,
    "primary_activity": "Running & Gym",
    "away_from_home_mins": 576,
    "calendar_event_count": 3,
    "weather_condition": "Overcast",
    "day_of_week": "Tuesday"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-10-14",
    "last_unlock_prev_night": "23:21:00",
    "first_unlock_morning": "07:09:00",
    "sleep_duration_estimate_mins": 438,
    "total_screen_time_mins": 256,
    "unlock_count": 79,
    "avg_session_length_mins": 4.1,
    "dominant_app_category": "Productivity",
    "step_count": 11343,
    "active_minutes": 92,
    "primary_activity": "Running & Gym",
    "away_from_home_mins": 525,
    "calendar_event_count": 3,
    "weather_condition": "Overcast",
    "day_of_week": "Wednesday"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-10-15",
    "last_unlock_prev_night": "23:37:00",
    "first_unlock_morning": "07:12:00",
    "sleep_duration_estimate_mins": 453,
    "total_screen_time_mins": 267,
    "unlock_count": 75,
    "avg_session_length_mins": 5.4,
    "dominant_app_category": "Productivity",
    "step_count": 12876,
    "active_minutes": 86,
    "primary_activity": "Running & Gym",
    "away_from_home_mins": 574,
    "calendar_event_count": 3,
    "weather_condition": "Clear",
    "day_of_week": "Thursday"
  }
];

export const REFERENCE_PREDICTIONS: Prediction[] = [
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-01",
    "is_predictive": true,
    "confidence_score": 0.84,
    "reason_tags": [
      "consistent_circadian_timing",
      "optimal_sleep_restoration",
      "structured_checking_intervals",
      "high_activity"
    ]
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-02",
    "is_predictive": true,
    "confidence_score": 0.88,
    "reason_tags": [
      "consistent_circadian_timing",
      "optimal_sleep_restoration",
      "structured_checking_intervals",
      "high_activity"
    ]
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-03",
    "is_predictive": true,
    "confidence_score": 0.87,
    "reason_tags": [
      "consistent_circadian_timing",
      "optimal_sleep_restoration",
      "structured_checking_intervals",
      "high_activity"
    ]
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-04",
    "is_predictive": true,
    "confidence_score": 0.82,
    "reason_tags": [
      "consistent_circadian_timing",
      "optimal_sleep_restoration",
      "structured_checking_intervals",
      "high_activity"
    ]
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-05",
    "is_predictive": true,
    "confidence_score": 0.81,
    "reason_tags": [
      "consistent_circadian_timing",
      "optimal_sleep_restoration",
      "structured_checking_intervals",
      "high_activity"
    ]
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-06",
    "is_predictive": true,
    "confidence_score": 0.88,
    "reason_tags": [
      "consistent_circadian_timing",
      "optimal_sleep_restoration",
      "structured_checking_intervals",
      "high_activity"
    ]
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-07",
    "is_predictive": false,
    "confidence_score": 0.96,
    "reason_tags": [
      "elevated_unlock_frequency",
      "minor_late_unlock"
    ]
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-08",
    "is_predictive": true,
    "confidence_score": 0.9,
    "reason_tags": [
      "consistent_circadian_timing",
      "optimal_sleep_restoration",
      "structured_checking_intervals",
      "high_activity"
    ]
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-09",
    "is_predictive": true,
    "confidence_score": 0.9,
    "reason_tags": [
      "consistent_circadian_timing",
      "optimal_sleep_restoration",
      "structured_checking_intervals",
      "high_activity"
    ]
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-10",
    "is_predictive": true,
    "confidence_score": 0.87,
    "reason_tags": [
      "consistent_circadian_timing",
      "optimal_sleep_restoration",
      "structured_checking_intervals",
      "high_activity"
    ]
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-11",
    "is_predictive": true,
    "confidence_score": 0.89,
    "reason_tags": [
      "consistent_circadian_timing",
      "optimal_sleep_restoration",
      "structured_checking_intervals",
      "high_activity"
    ]
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-12",
    "is_predictive": true,
    "confidence_score": 0.83,
    "reason_tags": [
      "consistent_circadian_timing",
      "optimal_sleep_restoration",
      "structured_checking_intervals",
      "high_activity"
    ]
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-13",
    "is_predictive": true,
    "confidence_score": 0.86,
    "reason_tags": [
      "consistent_circadian_timing",
      "optimal_sleep_restoration",
      "structured_checking_intervals",
      "high_activity"
    ]
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-14",
    "is_predictive": true,
    "confidence_score": 0.93,
    "reason_tags": [
      "consistent_circadian_timing",
      "optimal_sleep_restoration",
      "structured_checking_intervals",
      "high_activity"
    ]
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-15",
    "is_predictive": true,
    "confidence_score": 0.86,
    "reason_tags": [
      "consistent_circadian_timing",
      "optimal_sleep_restoration",
      "structured_checking_intervals",
      "high_activity"
    ]
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-16",
    "is_predictive": false,
    "confidence_score": 0.96,
    "reason_tags": [
      "elevated_unlock_frequency",
      "minor_late_unlock"
    ]
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-17",
    "is_predictive": true,
    "confidence_score": 0.95,
    "reason_tags": [
      "consistent_circadian_timing",
      "optimal_sleep_restoration",
      "structured_checking_intervals",
      "high_activity"
    ]
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-18",
    "is_predictive": true,
    "confidence_score": 0.96,
    "reason_tags": [
      "consistent_circadian_timing",
      "optimal_sleep_restoration",
      "structured_checking_intervals",
      "high_activity"
    ]
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-19",
    "is_predictive": true,
    "confidence_score": 0.89,
    "reason_tags": [
      "consistent_circadian_timing",
      "optimal_sleep_restoration",
      "structured_checking_intervals",
      "high_activity"
    ]
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-20",
    "is_predictive": true,
    "confidence_score": 0.85,
    "reason_tags": [
      "consistent_circadian_timing",
      "optimal_sleep_restoration",
      "structured_checking_intervals",
      "high_activity"
    ]
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-21",
    "is_predictive": false,
    "confidence_score": 0.88,
    "reason_tags": [
      "elevated_unlock_frequency",
      "minor_late_unlock"
    ]
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-22",
    "is_predictive": true,
    "confidence_score": 0.87,
    "reason_tags": [
      "consistent_circadian_timing",
      "optimal_sleep_restoration",
      "structured_checking_intervals",
      "high_activity"
    ]
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-23",
    "is_predictive": true,
    "confidence_score": 0.87,
    "reason_tags": [
      "consistent_circadian_timing",
      "optimal_sleep_restoration",
      "structured_checking_intervals",
      "high_activity"
    ]
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-24",
    "is_predictive": true,
    "confidence_score": 0.8,
    "reason_tags": [
      "consistent_circadian_timing",
      "optimal_sleep_restoration",
      "structured_checking_intervals",
      "high_activity"
    ]
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-25",
    "is_predictive": false,
    "confidence_score": 0.86,
    "reason_tags": [
      "elevated_unlock_frequency",
      "minor_late_unlock"
    ]
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-26",
    "is_predictive": false,
    "confidence_score": 0.9,
    "reason_tags": [
      "elevated_unlock_frequency",
      "minor_late_unlock"
    ]
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-27",
    "is_predictive": true,
    "confidence_score": 0.9,
    "reason_tags": [
      "consistent_circadian_timing",
      "optimal_sleep_restoration",
      "structured_checking_intervals",
      "high_activity"
    ]
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-28",
    "is_predictive": true,
    "confidence_score": 0.91,
    "reason_tags": [
      "consistent_circadian_timing",
      "optimal_sleep_restoration",
      "structured_checking_intervals",
      "high_activity"
    ]
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-29",
    "is_predictive": true,
    "confidence_score": 0.84,
    "reason_tags": [
      "consistent_circadian_timing",
      "optimal_sleep_restoration",
      "structured_checking_intervals",
      "high_activity"
    ]
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-30",
    "is_predictive": true,
    "confidence_score": 0.89,
    "reason_tags": [
      "consistent_circadian_timing",
      "optimal_sleep_restoration",
      "structured_checking_intervals",
      "high_activity"
    ]
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-10-01",
    "is_predictive": true,
    "confidence_score": 0.86,
    "reason_tags": [
      "consistent_circadian_timing",
      "optimal_sleep_restoration",
      "structured_checking_intervals",
      "high_activity"
    ]
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-10-02",
    "is_predictive": true,
    "confidence_score": 0.82,
    "reason_tags": [
      "consistent_circadian_timing",
      "optimal_sleep_restoration",
      "structured_checking_intervals",
      "high_activity"
    ]
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-10-03",
    "is_predictive": true,
    "confidence_score": 0.89,
    "reason_tags": [
      "consistent_circadian_timing",
      "optimal_sleep_restoration",
      "structured_checking_intervals",
      "high_activity"
    ]
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-10-04",
    "is_predictive": true,
    "confidence_score": 0.93,
    "reason_tags": [
      "consistent_circadian_timing",
      "optimal_sleep_restoration",
      "structured_checking_intervals",
      "high_activity"
    ]
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-10-05",
    "is_predictive": true,
    "confidence_score": 0.93,
    "reason_tags": [
      "consistent_circadian_timing",
      "optimal_sleep_restoration",
      "structured_checking_intervals",
      "high_activity"
    ]
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-10-06",
    "is_predictive": true,
    "confidence_score": 0.94,
    "reason_tags": [
      "consistent_circadian_timing",
      "optimal_sleep_restoration",
      "structured_checking_intervals",
      "high_activity"
    ]
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-10-07",
    "is_predictive": true,
    "confidence_score": 0.82,
    "reason_tags": [
      "consistent_circadian_timing",
      "optimal_sleep_restoration",
      "structured_checking_intervals",
      "high_activity"
    ]
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-10-08",
    "is_predictive": true,
    "confidence_score": 0.88,
    "reason_tags": [
      "consistent_circadian_timing",
      "optimal_sleep_restoration",
      "structured_checking_intervals",
      "high_activity"
    ]
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-10-09",
    "is_predictive": true,
    "confidence_score": 0.85,
    "reason_tags": [
      "consistent_circadian_timing",
      "optimal_sleep_restoration",
      "structured_checking_intervals",
      "high_activity"
    ]
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-10-10",
    "is_predictive": true,
    "confidence_score": 0.87,
    "reason_tags": [
      "consistent_circadian_timing",
      "optimal_sleep_restoration",
      "structured_checking_intervals",
      "high_activity"
    ]
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-10-11",
    "is_predictive": true,
    "confidence_score": 0.81,
    "reason_tags": [
      "consistent_circadian_timing",
      "optimal_sleep_restoration",
      "structured_checking_intervals",
      "high_activity"
    ]
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-10-12",
    "is_predictive": true,
    "confidence_score": 0.86,
    "reason_tags": [
      "consistent_circadian_timing",
      "optimal_sleep_restoration",
      "structured_checking_intervals",
      "high_activity"
    ]
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-10-13",
    "is_predictive": true,
    "confidence_score": 0.9,
    "reason_tags": [
      "consistent_circadian_timing",
      "optimal_sleep_restoration",
      "structured_checking_intervals",
      "high_activity"
    ]
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-10-14",
    "is_predictive": true,
    "confidence_score": 0.82,
    "reason_tags": [
      "consistent_circadian_timing",
      "optimal_sleep_restoration",
      "structured_checking_intervals",
      "high_activity"
    ]
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-10-15",
    "is_predictive": true,
    "confidence_score": 0.92,
    "reason_tags": [
      "consistent_circadian_timing",
      "optimal_sleep_restoration",
      "structured_checking_intervals",
      "high_activity"
    ]
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-01",
    "is_predictive": true,
    "confidence_score": 0.76,
    "reason_tags": [
      "deep_work_focus_block",
      "adequate_catchup_sleep"
    ]
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-02",
    "is_predictive": true,
    "confidence_score": 0.87,
    "reason_tags": [
      "deep_work_focus_block",
      "adequate_catchup_sleep"
    ]
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-03",
    "is_predictive": true,
    "confidence_score": 0.74,
    "reason_tags": [
      "deep_work_focus_block",
      "adequate_catchup_sleep"
    ]
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-04",
    "is_predictive": true,
    "confidence_score": 0.87,
    "reason_tags": [
      "deep_work_focus_block",
      "adequate_catchup_sleep"
    ]
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-05",
    "is_predictive": false,
    "confidence_score": 0.79,
    "reason_tags": [
      "delayed_bedtime_drift",
      "prolonged_screen_sessions",
      "reduced_physical_activity"
    ]
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-06",
    "is_predictive": false,
    "confidence_score": 0.8,
    "reason_tags": [
      "delayed_bedtime_drift",
      "prolonged_screen_sessions",
      "reduced_physical_activity"
    ]
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-07",
    "is_predictive": false,
    "confidence_score": 0.82,
    "reason_tags": [
      "delayed_bedtime_drift",
      "prolonged_screen_sessions",
      "reduced_physical_activity"
    ]
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-08",
    "is_predictive": true,
    "confidence_score": 0.78,
    "reason_tags": [
      "deep_work_focus_block",
      "adequate_catchup_sleep"
    ]
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-09",
    "is_predictive": true,
    "confidence_score": 0.77,
    "reason_tags": [
      "deep_work_focus_block",
      "adequate_catchup_sleep"
    ]
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-10",
    "is_predictive": false,
    "confidence_score": 0.75,
    "reason_tags": [
      "delayed_bedtime_drift",
      "prolonged_screen_sessions",
      "reduced_physical_activity"
    ]
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-11",
    "is_predictive": true,
    "confidence_score": 0.84,
    "reason_tags": [
      "deep_work_focus_block",
      "adequate_catchup_sleep"
    ]
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-12",
    "is_predictive": false,
    "confidence_score": 0.75,
    "reason_tags": [
      "delayed_bedtime_drift",
      "prolonged_screen_sessions",
      "reduced_physical_activity"
    ]
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-13",
    "is_predictive": true,
    "confidence_score": 0.73,
    "reason_tags": [
      "deep_work_focus_block",
      "adequate_catchup_sleep"
    ]
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-14",
    "is_predictive": false,
    "confidence_score": 0.86,
    "reason_tags": [
      "delayed_bedtime_drift",
      "prolonged_screen_sessions",
      "reduced_physical_activity"
    ]
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-15",
    "is_predictive": true,
    "confidence_score": 0.73,
    "reason_tags": [
      "deep_work_focus_block",
      "adequate_catchup_sleep"
    ]
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-16",
    "is_predictive": false,
    "confidence_score": 0.81,
    "reason_tags": [
      "delayed_bedtime_drift",
      "prolonged_screen_sessions",
      "reduced_physical_activity"
    ]
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-17",
    "is_predictive": false,
    "confidence_score": 0.77,
    "reason_tags": [
      "delayed_bedtime_drift",
      "prolonged_screen_sessions",
      "reduced_physical_activity"
    ]
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-18",
    "is_predictive": false,
    "confidence_score": 0.83,
    "reason_tags": [
      "delayed_bedtime_drift",
      "prolonged_screen_sessions",
      "reduced_physical_activity"
    ]
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-19",
    "is_predictive": true,
    "confidence_score": 0.76,
    "reason_tags": [
      "deep_work_focus_block",
      "adequate_catchup_sleep"
    ]
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-20",
    "is_predictive": false,
    "confidence_score": 0.74,
    "reason_tags": [
      "delayed_bedtime_drift",
      "prolonged_screen_sessions",
      "reduced_physical_activity"
    ]
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-21",
    "is_predictive": true,
    "confidence_score": 0.85,
    "reason_tags": [
      "deep_work_focus_block",
      "adequate_catchup_sleep"
    ]
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-22",
    "is_predictive": false,
    "confidence_score": 0.85,
    "reason_tags": [
      "delayed_bedtime_drift",
      "prolonged_screen_sessions",
      "reduced_physical_activity"
    ]
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-23",
    "is_predictive": false,
    "confidence_score": 0.8,
    "reason_tags": [
      "delayed_bedtime_drift",
      "prolonged_screen_sessions",
      "reduced_physical_activity"
    ]
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-24",
    "is_predictive": false,
    "confidence_score": 0.81,
    "reason_tags": [
      "delayed_bedtime_drift",
      "prolonged_screen_sessions",
      "reduced_physical_activity"
    ]
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-25",
    "is_predictive": false,
    "confidence_score": 0.79,
    "reason_tags": [
      "delayed_bedtime_drift",
      "prolonged_screen_sessions",
      "reduced_physical_activity"
    ]
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-26",
    "is_predictive": true,
    "confidence_score": 0.78,
    "reason_tags": [
      "deep_work_focus_block",
      "adequate_catchup_sleep"
    ]
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-27",
    "is_predictive": false,
    "confidence_score": 0.85,
    "reason_tags": [
      "delayed_bedtime_drift",
      "prolonged_screen_sessions",
      "reduced_physical_activity"
    ]
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-28",
    "is_predictive": false,
    "confidence_score": 0.68,
    "reason_tags": [
      "delayed_bedtime_drift",
      "prolonged_screen_sessions",
      "reduced_physical_activity"
    ]
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-29",
    "is_predictive": true,
    "confidence_score": 0.76,
    "reason_tags": [
      "deep_work_focus_block",
      "adequate_catchup_sleep"
    ]
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-30",
    "is_predictive": false,
    "confidence_score": 0.88,
    "reason_tags": [
      "delayed_bedtime_drift",
      "prolonged_screen_sessions",
      "reduced_physical_activity"
    ]
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-10-01",
    "is_predictive": false,
    "confidence_score": 0.78,
    "reason_tags": [
      "delayed_bedtime_drift",
      "prolonged_screen_sessions",
      "reduced_physical_activity"
    ]
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-10-02",
    "is_predictive": true,
    "confidence_score": 0.83,
    "reason_tags": [
      "deep_work_focus_block",
      "adequate_catchup_sleep"
    ]
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-10-03",
    "is_predictive": false,
    "confidence_score": 0.87,
    "reason_tags": [
      "delayed_bedtime_drift",
      "prolonged_screen_sessions",
      "reduced_physical_activity"
    ]
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-10-04",
    "is_predictive": false,
    "confidence_score": 0.74,
    "reason_tags": [
      "delayed_bedtime_drift",
      "prolonged_screen_sessions",
      "reduced_physical_activity"
    ]
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-10-05",
    "is_predictive": true,
    "confidence_score": 0.76,
    "reason_tags": [
      "deep_work_focus_block",
      "adequate_catchup_sleep"
    ]
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-10-06",
    "is_predictive": true,
    "confidence_score": 0.85,
    "reason_tags": [
      "deep_work_focus_block",
      "adequate_catchup_sleep"
    ]
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-10-07",
    "is_predictive": true,
    "confidence_score": 0.86,
    "reason_tags": [
      "deep_work_focus_block",
      "adequate_catchup_sleep"
    ]
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-10-08",
    "is_predictive": true,
    "confidence_score": 0.81,
    "reason_tags": [
      "deep_work_focus_block",
      "adequate_catchup_sleep"
    ]
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-10-09",
    "is_predictive": true,
    "confidence_score": 0.77,
    "reason_tags": [
      "deep_work_focus_block",
      "adequate_catchup_sleep"
    ]
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-10-10",
    "is_predictive": false,
    "confidence_score": 0.86,
    "reason_tags": [
      "delayed_bedtime_drift",
      "prolonged_screen_sessions",
      "reduced_physical_activity"
    ]
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-10-11",
    "is_predictive": false,
    "confidence_score": 0.73,
    "reason_tags": [
      "delayed_bedtime_drift",
      "prolonged_screen_sessions",
      "reduced_physical_activity"
    ]
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-10-12",
    "is_predictive": false,
    "confidence_score": 0.78,
    "reason_tags": [
      "delayed_bedtime_drift",
      "prolonged_screen_sessions",
      "reduced_physical_activity"
    ]
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-10-13",
    "is_predictive": false,
    "confidence_score": 0.87,
    "reason_tags": [
      "delayed_bedtime_drift",
      "prolonged_screen_sessions",
      "reduced_physical_activity"
    ]
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-10-14",
    "is_predictive": false,
    "confidence_score": 0.8,
    "reason_tags": [
      "delayed_bedtime_drift",
      "prolonged_screen_sessions",
      "reduced_physical_activity"
    ]
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-10-15",
    "is_predictive": true,
    "confidence_score": 0.85,
    "reason_tags": [
      "deep_work_focus_block",
      "adequate_catchup_sleep"
    ]
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-01",
    "is_predictive": false,
    "confidence_score": 0.73,
    "reason_tags": [
      "steady_weekday_schedule",
      "high_activity"
    ]
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-02",
    "is_predictive": true,
    "confidence_score": 0.8,
    "reason_tags": [
      "steady_weekday_schedule",
      "high_activity"
    ]
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-03",
    "is_predictive": false,
    "confidence_score": 0.85,
    "reason_tags": [
      "steady_weekday_schedule",
      "high_activity"
    ]
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-04",
    "is_predictive": true,
    "confidence_score": 0.85,
    "reason_tags": [
      "steady_weekday_schedule",
      "high_activity"
    ]
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-05",
    "is_predictive": false,
    "confidence_score": 0.59,
    "reason_tags": [
      "uncalibrated_weekend_shift",
      "prolonged_nighttime_activity"
    ]
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-06",
    "is_predictive": false,
    "confidence_score": 0.63,
    "reason_tags": [
      "uncalibrated_weekend_shift",
      "prolonged_nighttime_activity"
    ]
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-07",
    "is_predictive": false,
    "confidence_score": 0.77,
    "reason_tags": [
      "steady_weekday_schedule",
      "high_activity"
    ]
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-08",
    "is_predictive": true,
    "confidence_score": 0.73,
    "reason_tags": [
      "steady_weekday_schedule",
      "high_activity"
    ]
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-09",
    "is_predictive": false,
    "confidence_score": 0.81,
    "reason_tags": [
      "steady_weekday_schedule",
      "high_activity"
    ]
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-10",
    "is_predictive": true,
    "confidence_score": 0.81,
    "reason_tags": [
      "steady_weekday_schedule",
      "high_activity"
    ]
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-11",
    "is_predictive": true,
    "confidence_score": 0.83,
    "reason_tags": [
      "steady_weekday_schedule",
      "high_activity"
    ]
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-12",
    "is_predictive": false,
    "confidence_score": 0.55,
    "reason_tags": [
      "uncalibrated_weekend_shift",
      "prolonged_nighttime_activity"
    ]
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-13",
    "is_predictive": false,
    "confidence_score": 0.56,
    "reason_tags": [
      "uncalibrated_weekend_shift",
      "prolonged_nighttime_activity"
    ]
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-14",
    "is_predictive": true,
    "confidence_score": 0.84,
    "reason_tags": [
      "steady_weekday_schedule",
      "high_activity"
    ]
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-15",
    "is_predictive": true,
    "confidence_score": 0.82,
    "reason_tags": [
      "steady_weekday_schedule",
      "high_activity"
    ]
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-16",
    "is_predictive": true,
    "confidence_score": 0.82,
    "reason_tags": [
      "steady_weekday_schedule",
      "high_activity"
    ]
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-17",
    "is_predictive": true,
    "confidence_score": 0.79,
    "reason_tags": [
      "steady_weekday_schedule",
      "high_activity"
    ]
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-18",
    "is_predictive": false,
    "confidence_score": 0.73,
    "reason_tags": [
      "steady_weekday_schedule",
      "high_activity"
    ]
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-19",
    "is_predictive": false,
    "confidence_score": 0.6,
    "reason_tags": [
      "uncalibrated_weekend_shift",
      "prolonged_nighttime_activity"
    ]
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-20",
    "is_predictive": false,
    "confidence_score": 0.61,
    "reason_tags": [
      "uncalibrated_weekend_shift",
      "prolonged_nighttime_activity"
    ]
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-21",
    "is_predictive": false,
    "confidence_score": 0.84,
    "reason_tags": [
      "sleep_timing_variability"
    ]
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-22",
    "is_predictive": false,
    "confidence_score": 0.93,
    "reason_tags": [
      "sleep_timing_variability"
    ]
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-23",
    "is_predictive": true,
    "confidence_score": 0.83,
    "reason_tags": [
      "calibrated_weekend_recovery",
      "consistent_aerobic_energy"
    ]
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-24",
    "is_predictive": false,
    "confidence_score": 0.81,
    "reason_tags": [
      "sleep_timing_variability"
    ]
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-25",
    "is_predictive": false,
    "confidence_score": 0.81,
    "reason_tags": [
      "sleep_timing_variability"
    ]
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-26",
    "is_predictive": true,
    "confidence_score": 0.9,
    "reason_tags": [
      "calibrated_weekend_recovery",
      "consistent_aerobic_energy"
    ]
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-27",
    "is_predictive": true,
    "confidence_score": 0.93,
    "reason_tags": [
      "calibrated_weekend_recovery",
      "consistent_aerobic_energy"
    ]
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-28",
    "is_predictive": true,
    "confidence_score": 0.83,
    "reason_tags": [
      "calibrated_weekend_recovery",
      "consistent_aerobic_energy"
    ]
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-29",
    "is_predictive": false,
    "confidence_score": 0.86,
    "reason_tags": [
      "sleep_timing_variability"
    ]
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-30",
    "is_predictive": true,
    "confidence_score": 0.9,
    "reason_tags": [
      "calibrated_weekend_recovery",
      "consistent_aerobic_energy"
    ]
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-10-01",
    "is_predictive": true,
    "confidence_score": 0.83,
    "reason_tags": [
      "calibrated_weekend_recovery",
      "consistent_aerobic_energy"
    ]
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-10-02",
    "is_predictive": false,
    "confidence_score": 0.89,
    "reason_tags": [
      "sleep_timing_variability"
    ]
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-10-03",
    "is_predictive": true,
    "confidence_score": 0.95,
    "reason_tags": [
      "calibrated_weekend_recovery",
      "consistent_aerobic_energy"
    ]
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-10-04",
    "is_predictive": true,
    "confidence_score": 0.85,
    "reason_tags": [
      "calibrated_weekend_recovery",
      "consistent_aerobic_energy"
    ]
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-10-05",
    "is_predictive": true,
    "confidence_score": 0.87,
    "reason_tags": [
      "calibrated_weekend_recovery",
      "consistent_aerobic_energy"
    ]
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-10-06",
    "is_predictive": true,
    "confidence_score": 0.88,
    "reason_tags": [
      "calibrated_weekend_recovery",
      "consistent_aerobic_energy"
    ]
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-10-07",
    "is_predictive": false,
    "confidence_score": 0.94,
    "reason_tags": [
      "sleep_timing_variability"
    ]
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-10-08",
    "is_predictive": true,
    "confidence_score": 0.81,
    "reason_tags": [
      "calibrated_weekend_recovery",
      "consistent_aerobic_energy"
    ]
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-10-09",
    "is_predictive": true,
    "confidence_score": 0.82,
    "reason_tags": [
      "calibrated_weekend_recovery",
      "consistent_aerobic_energy"
    ]
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-10-10",
    "is_predictive": false,
    "confidence_score": 0.9,
    "reason_tags": [
      "sleep_timing_variability"
    ]
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-10-11",
    "is_predictive": true,
    "confidence_score": 0.86,
    "reason_tags": [
      "calibrated_weekend_recovery",
      "consistent_aerobic_energy"
    ]
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-10-12",
    "is_predictive": true,
    "confidence_score": 0.89,
    "reason_tags": [
      "calibrated_weekend_recovery",
      "consistent_aerobic_energy"
    ]
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-10-13",
    "is_predictive": true,
    "confidence_score": 0.85,
    "reason_tags": [
      "calibrated_weekend_recovery",
      "consistent_aerobic_energy"
    ]
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-10-14",
    "is_predictive": true,
    "confidence_score": 0.92,
    "reason_tags": [
      "calibrated_weekend_recovery",
      "consistent_aerobic_energy"
    ]
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-10-15",
    "is_predictive": true,
    "confidence_score": 0.89,
    "reason_tags": [
      "calibrated_weekend_recovery",
      "consistent_aerobic_energy"
    ]
  }
];

export const REFERENCE_FEEDBACK: Feedback[] = [
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-01",
    "rating": 4,
    "note": "Felt energetic and completed core sprints.",
    "submitted_at": "2026-09-01T21:30:00.000Z"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-02",
    "rating": 4,
    "note": "Felt energetic and completed core sprints.",
    "submitted_at": "2026-09-02T21:30:00.000Z"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-03",
    "rating": 4,
    "note": "Felt energetic and completed core sprints.",
    "submitted_at": "2026-09-03T21:30:00.000Z"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-04",
    "rating": 4,
    "note": "Felt energetic and completed core sprints.",
    "submitted_at": "2026-09-04T21:30:00.000Z"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-05",
    "rating": 5,
    "note": "Felt energetic and completed core sprints.",
    "submitted_at": "2026-09-05T21:30:00.000Z"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-06",
    "rating": 4,
    "note": "Felt energetic and completed core sprints.",
    "submitted_at": "2026-09-06T21:30:00.000Z"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-07",
    "rating": 3,
    "note": "Felt slight attention fragmentation from frequent notifications.",
    "submitted_at": "2026-09-07T21:30:00.000Z"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-08",
    "rating": 5,
    "note": "Felt energetic and completed core sprints.",
    "submitted_at": "2026-09-08T21:30:00.000Z"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-09",
    "rating": 5,
    "note": "Felt energetic and completed core sprints.",
    "submitted_at": "2026-09-09T21:30:00.000Z"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-10",
    "rating": 4,
    "note": "Felt energetic and completed core sprints.",
    "submitted_at": "2026-09-10T21:30:00.000Z"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-12",
    "rating": 5,
    "note": "Felt energetic and completed core sprints.",
    "submitted_at": "2026-09-12T21:30:00.000Z"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-13",
    "rating": 5,
    "note": "Felt energetic and completed core sprints.",
    "submitted_at": "2026-09-13T21:30:00.000Z"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-15",
    "rating": 4,
    "note": "Felt energetic and completed core sprints.",
    "submitted_at": "2026-09-15T21:30:00.000Z"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-16",
    "rating": 3,
    "note": "Felt slight attention fragmentation from frequent notifications.",
    "submitted_at": "2026-09-16T21:30:00.000Z"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-17",
    "rating": 5,
    "note": "Felt energetic and completed core sprints.",
    "submitted_at": "2026-09-17T21:30:00.000Z"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-18",
    "rating": 5,
    "note": "Felt energetic and completed core sprints.",
    "submitted_at": "2026-09-18T21:30:00.000Z"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-19",
    "rating": 5,
    "note": "Felt energetic and completed core sprints.",
    "submitted_at": "2026-09-19T21:30:00.000Z"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-20",
    "rating": 5,
    "note": "Felt energetic and completed core sprints.",
    "submitted_at": "2026-09-20T21:30:00.000Z"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-21",
    "rating": 3,
    "note": "Felt slight attention fragmentation from frequent notifications.",
    "submitted_at": "2026-09-21T21:30:00.000Z"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-22",
    "rating": 4,
    "note": "Felt energetic and completed core sprints.",
    "submitted_at": "2026-09-22T21:30:00.000Z"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-23",
    "rating": 4,
    "note": "Felt energetic and completed core sprints.",
    "submitted_at": "2026-09-23T21:30:00.000Z"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-24",
    "rating": 5,
    "note": "Felt energetic and completed core sprints.",
    "submitted_at": "2026-09-24T21:30:00.000Z"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-26",
    "rating": 3,
    "note": "Felt slight attention fragmentation from frequent notifications.",
    "submitted_at": "2026-09-26T21:30:00.000Z"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-27",
    "rating": 4,
    "note": "Felt energetic and completed core sprints.",
    "submitted_at": "2026-09-27T21:30:00.000Z"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-28",
    "rating": 4,
    "note": "Felt energetic and completed core sprints.",
    "submitted_at": "2026-09-28T21:30:00.000Z"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-29",
    "rating": 5,
    "note": "Felt energetic and completed core sprints.",
    "submitted_at": "2026-09-29T21:30:00.000Z"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-09-30",
    "rating": 4,
    "note": "Felt energetic and completed core sprints.",
    "submitted_at": "2026-09-30T21:30:00.000Z"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-10-01",
    "rating": 5,
    "note": "Felt energetic and completed core sprints.",
    "submitted_at": "2026-10-01T21:30:00.000Z"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-10-02",
    "rating": 5,
    "note": "Felt energetic and completed core sprints.",
    "submitted_at": "2026-10-02T21:30:00.000Z"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-10-04",
    "rating": 5,
    "note": "Felt energetic and completed core sprints.",
    "submitted_at": "2026-10-04T21:30:00.000Z"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-10-05",
    "rating": 5,
    "note": "Felt energetic and completed core sprints.",
    "submitted_at": "2026-10-05T21:30:00.000Z"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-10-07",
    "rating": 5,
    "note": "Felt energetic and completed core sprints.",
    "submitted_at": "2026-10-07T21:30:00.000Z"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-10-09",
    "rating": 5,
    "note": "Felt energetic and completed core sprints.",
    "submitted_at": "2026-10-09T21:30:00.000Z"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-10-10",
    "rating": 5,
    "note": "Felt energetic and completed core sprints.",
    "submitted_at": "2026-10-10T21:30:00.000Z"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-10-11",
    "rating": 5,
    "note": "Felt energetic and completed core sprints.",
    "submitted_at": "2026-10-11T21:30:00.000Z"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-10-12",
    "rating": 4,
    "note": "Felt energetic and completed core sprints.",
    "submitted_at": "2026-10-12T21:30:00.000Z"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-10-13",
    "rating": 4,
    "note": "Felt energetic and completed core sprints.",
    "submitted_at": "2026-10-13T21:30:00.000Z"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-10-14",
    "rating": 4,
    "note": "Felt energetic and completed core sprints.",
    "submitted_at": "2026-10-14T21:30:00.000Z"
  },
  {
    "user_id": "a1000000-0000-0000-0000-000000000001",
    "date": "2026-10-15",
    "rating": 4,
    "note": "Felt energetic and completed core sprints.",
    "submitted_at": "2026-10-15T21:30:00.000Z"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-01",
    "rating": 4,
    "note": "Got into flow in the afternoon.",
    "submitted_at": "2026-09-01T21:30:00.000Z"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-02",
    "rating": 4,
    "note": "Got into flow in the afternoon.",
    "submitted_at": "2026-09-02T21:30:00.000Z"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-03",
    "rating": 4,
    "note": "Got into flow in the afternoon.",
    "submitted_at": "2026-09-03T21:30:00.000Z"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-04",
    "rating": 4,
    "note": "Got into flow in the afternoon.",
    "submitted_at": "2026-09-04T21:30:00.000Z"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-05",
    "rating": 2,
    "note": "Felt groggy in the morning after 2am screen browsing.",
    "submitted_at": "2026-09-05T21:30:00.000Z"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-06",
    "rating": 3,
    "note": "Felt groggy in the morning after 2am screen browsing.",
    "submitted_at": "2026-09-06T21:30:00.000Z"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-09",
    "rating": 4,
    "note": "Got into flow in the afternoon.",
    "submitted_at": "2026-09-09T21:30:00.000Z"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-11",
    "rating": 4,
    "note": "Got into flow in the afternoon.",
    "submitted_at": "2026-09-11T21:30:00.000Z"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-13",
    "rating": 4,
    "note": "Got into flow in the afternoon.",
    "submitted_at": "2026-09-13T21:30:00.000Z"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-14",
    "rating": 2,
    "note": "Felt groggy in the morning after 2am screen browsing.",
    "submitted_at": "2026-09-14T21:30:00.000Z"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-15",
    "rating": 4,
    "note": "Got into flow in the afternoon.",
    "submitted_at": "2026-09-15T21:30:00.000Z"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-16",
    "rating": 2,
    "note": "Felt groggy in the morning after 2am screen browsing.",
    "submitted_at": "2026-09-16T21:30:00.000Z"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-17",
    "rating": 2,
    "note": "Felt groggy in the morning after 2am screen browsing.",
    "submitted_at": "2026-09-17T21:30:00.000Z"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-18",
    "rating": 3,
    "note": "Felt groggy in the morning after 2am screen browsing.",
    "submitted_at": "2026-09-18T21:30:00.000Z"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-20",
    "rating": 3,
    "note": "Felt groggy in the morning after 2am screen browsing.",
    "submitted_at": "2026-09-20T21:30:00.000Z"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-22",
    "rating": 2,
    "note": "Felt groggy in the morning after 2am screen browsing.",
    "submitted_at": "2026-09-22T21:30:00.000Z"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-23",
    "rating": 2,
    "note": "Felt groggy in the morning after 2am screen browsing.",
    "submitted_at": "2026-09-23T21:30:00.000Z"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-25",
    "rating": 3,
    "note": "Felt groggy in the morning after 2am screen browsing.",
    "submitted_at": "2026-09-25T21:30:00.000Z"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-26",
    "rating": 4,
    "note": "Got into flow in the afternoon.",
    "submitted_at": "2026-09-26T21:30:00.000Z"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-27",
    "rating": 3,
    "note": "Felt groggy in the morning after 2am screen browsing.",
    "submitted_at": "2026-09-27T21:30:00.000Z"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-28",
    "rating": 2,
    "note": "Felt groggy in the morning after 2am screen browsing.",
    "submitted_at": "2026-09-28T21:30:00.000Z"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-29",
    "rating": 4,
    "note": "Got into flow in the afternoon.",
    "submitted_at": "2026-09-29T21:30:00.000Z"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-09-30",
    "rating": 3,
    "note": "Felt groggy in the morning after 2am screen browsing.",
    "submitted_at": "2026-09-30T21:30:00.000Z"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-10-01",
    "rating": 2,
    "note": "Felt groggy in the morning after 2am screen browsing.",
    "submitted_at": "2026-10-01T21:30:00.000Z"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-10-03",
    "rating": 2,
    "note": "Felt groggy in the morning after 2am screen browsing.",
    "submitted_at": "2026-10-03T21:30:00.000Z"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-10-04",
    "rating": 3,
    "note": "Felt groggy in the morning after 2am screen browsing.",
    "submitted_at": "2026-10-04T21:30:00.000Z"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-10-06",
    "rating": 4,
    "note": "Got into flow in the afternoon.",
    "submitted_at": "2026-10-06T21:30:00.000Z"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-10-09",
    "rating": 4,
    "note": "Got into flow in the afternoon.",
    "submitted_at": "2026-10-09T21:30:00.000Z"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-10-10",
    "rating": 3,
    "note": "Felt groggy in the morning after 2am screen browsing.",
    "submitted_at": "2026-10-10T21:30:00.000Z"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-10-12",
    "rating": 2,
    "note": "Felt groggy in the morning after 2am screen browsing.",
    "submitted_at": "2026-10-12T21:30:00.000Z"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-10-13",
    "rating": 2,
    "note": "Felt groggy in the morning after 2am screen browsing.",
    "submitted_at": "2026-10-13T21:30:00.000Z"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-10-14",
    "rating": 3,
    "note": "Felt groggy in the morning after 2am screen browsing.",
    "submitted_at": "2026-10-14T21:30:00.000Z"
  },
  {
    "user_id": "a2000000-0000-0000-0000-000000000002",
    "date": "2026-10-15",
    "rating": 4,
    "note": "Got into flow in the afternoon.",
    "submitted_at": "2026-10-15T21:30:00.000Z"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-01",
    "rating": 3,
    "note": "Solid productive weekday.",
    "submitted_at": "2026-09-01T21:30:00.000Z"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-02",
    "rating": 4,
    "note": "Solid productive weekday.",
    "submitted_at": "2026-09-02T21:30:00.000Z"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-04",
    "rating": 5,
    "note": "Solid productive weekday.",
    "submitted_at": "2026-09-04T21:30:00.000Z"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-07",
    "rating": 3,
    "note": "Solid productive weekday.",
    "submitted_at": "2026-09-07T21:30:00.000Z"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-09",
    "rating": 3,
    "note": "Solid productive weekday.",
    "submitted_at": "2026-09-09T21:30:00.000Z"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-10",
    "rating": 5,
    "note": "Solid productive weekday.",
    "submitted_at": "2026-09-10T21:30:00.000Z"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-11",
    "rating": 5,
    "note": "Solid productive weekday.",
    "submitted_at": "2026-09-11T21:30:00.000Z"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-12",
    "rating": 4,
    "note": "Active weekend outdoors despite late sleep.",
    "submitted_at": "2026-09-12T21:30:00.000Z"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-13",
    "rating": 4,
    "note": "Active weekend outdoors despite late sleep.",
    "submitted_at": "2026-09-13T21:30:00.000Z"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-15",
    "rating": 5,
    "note": "Solid productive weekday.",
    "submitted_at": "2026-09-15T21:30:00.000Z"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-17",
    "rating": 5,
    "note": "Solid productive weekday.",
    "submitted_at": "2026-09-17T21:30:00.000Z"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-18",
    "rating": 3,
    "note": "Solid productive weekday.",
    "submitted_at": "2026-09-18T21:30:00.000Z"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-19",
    "rating": 4,
    "note": "Active weekend outdoors despite late sleep.",
    "submitted_at": "2026-09-19T21:30:00.000Z"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-20",
    "rating": 4,
    "note": "Active weekend outdoors despite late sleep.",
    "submitted_at": "2026-09-20T21:30:00.000Z"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-21",
    "rating": 3,
    "note": "Solid productive weekday.",
    "submitted_at": "2026-09-21T21:30:00.000Z"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-23",
    "rating": 5,
    "note": "Solid productive weekday.",
    "submitted_at": "2026-09-23T21:30:00.000Z"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-25",
    "rating": 3,
    "note": "Solid productive weekday.",
    "submitted_at": "2026-09-25T21:30:00.000Z"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-27",
    "rating": 4,
    "note": "Active weekend outdoors despite late sleep.",
    "submitted_at": "2026-09-27T21:30:00.000Z"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-28",
    "rating": 5,
    "note": "Solid productive weekday.",
    "submitted_at": "2026-09-28T21:30:00.000Z"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-29",
    "rating": 3,
    "note": "Solid productive weekday.",
    "submitted_at": "2026-09-29T21:30:00.000Z"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-09-30",
    "rating": 4,
    "note": "Solid productive weekday.",
    "submitted_at": "2026-09-30T21:30:00.000Z"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-10-01",
    "rating": 5,
    "note": "Solid productive weekday.",
    "submitted_at": "2026-10-01T21:30:00.000Z"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-10-02",
    "rating": 3,
    "note": "Solid productive weekday.",
    "submitted_at": "2026-10-02T21:30:00.000Z"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-10-03",
    "rating": 4,
    "note": "Active weekend outdoors despite late sleep.",
    "submitted_at": "2026-10-03T21:30:00.000Z"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-10-04",
    "rating": 5,
    "note": "Active weekend outdoors despite late sleep.",
    "submitted_at": "2026-10-04T21:30:00.000Z"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-10-05",
    "rating": 4,
    "note": "Solid productive weekday.",
    "submitted_at": "2026-10-05T21:30:00.000Z"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-10-06",
    "rating": 4,
    "note": "Solid productive weekday.",
    "submitted_at": "2026-10-06T21:30:00.000Z"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-10-07",
    "rating": 3,
    "note": "Solid productive weekday.",
    "submitted_at": "2026-10-07T21:30:00.000Z"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-10-10",
    "rating": 4,
    "note": "Active weekend outdoors despite late sleep.",
    "submitted_at": "2026-10-10T21:30:00.000Z"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-10-11",
    "rating": 5,
    "note": "Active weekend outdoors despite late sleep.",
    "submitted_at": "2026-10-11T21:30:00.000Z"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-10-12",
    "rating": 4,
    "note": "Solid productive weekday.",
    "submitted_at": "2026-10-12T21:30:00.000Z"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-10-13",
    "rating": 5,
    "note": "Solid productive weekday.",
    "submitted_at": "2026-10-13T21:30:00.000Z"
  },
  {
    "user_id": "a3000000-0000-0000-0000-000000000003",
    "date": "2026-10-14",
    "rating": 4,
    "note": "Solid productive weekday.",
    "submitted_at": "2026-10-14T21:30:00.000Z"
  }
];
