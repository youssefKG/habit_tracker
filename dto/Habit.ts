import { Habit } from "@/Modals";

type NewHabit = Omit<Habit, "id">;

export type { NewHabit };
