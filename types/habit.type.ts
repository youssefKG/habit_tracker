type FrequencyType = "none" | "daily" | "week" | "monthly";

type NewHabit = {
  name: string;
  description: string;
  color: string;
  frequency: FrequencyType;
  reminder: Date | "none";
  category: string;
};

export type { NewHabit, FrequencyType };
