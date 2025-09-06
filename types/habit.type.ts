type FrequencyType = "none" | "daily" | "week" | "monthly";

type ReminderDateType = {
  days: string[];
  time: Date;
};

type NewHabit = {
  name: string;
  description: string;
  color: string;
  frequency: FrequencyType;
  reminders: Reminder[];
  categories: number[];
  targetPerDay: number;
};

interface Reminder {
  id: number;
  time: Date;
  days: string[];
}

type NewHabitKeys = keyof NewHabit;

export type {
  NewHabit,
  FrequencyType,
  ReminderDateType,
  Reminder,
  NewHabitKeys,
};
