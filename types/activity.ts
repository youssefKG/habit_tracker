export type Activity = {
  date: string;
  count: number;
  level: number;
};

export type DayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Sunday, 1 = Monday etc.
export type DayName = "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";
