import { Category } from "./category";

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
  category: Category;
  targetPerDay: number;
  requiredLogs: number;
};

interface Reminder {
  id: number;
  time: Date;
  days: string[];
  index: number;
}

type NewHabitKeys = keyof NewHabit;

export type {
  NewHabit,
  FrequencyType,
  ReminderDateType,
  Reminder,
  NewHabitKeys,
};
