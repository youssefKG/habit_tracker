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
  category: string;
};

interface Reminder {
  id: number;
  time: Date;
  days: string[];
}

export type { NewHabit, FrequencyType, ReminderDateType, Reminder };
