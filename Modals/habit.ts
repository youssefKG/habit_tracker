import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Log } from "./log";
import { Reminder } from "./reminder";
import { Category } from "./category";

// enum Frequency {
//   NONE = "none",
//   DAILY = "daily",
//   MONTHLY = "monthly",
//   WEEK = "week",
// }

@Entity()
export class Habit {
  @PrimaryGeneratedColumn({ type: "int" })
  id!: number;

  @Column({ type: "varchar" })
  name!: string;

  @Column({ type: "varchar" })
  description!: string;

  @Column({ type: "varchar" })
  color!: string;

  @Column({
    type: "varchar",
    default: "none",
  })
  frequency!: string;

  @Column({ type: "integer" })
  targetPerDay!: number;

  @Column({ default: 1, type: "int" })
  requiredLogs!: number;

  @OneToMany(() => Log, (log) => log.habit)
  logs!: Log[];

  @OneToMany(() => Reminder, (reminder) => reminder.habit, { cascade: true })
  reminders!: Reminder[];

  @ManyToMany(() => Category, (category) => category.habits)
  categories!: Category[];
}
