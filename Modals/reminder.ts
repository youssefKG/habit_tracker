import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Day } from "./day";
import { Habit } from "./habit";

@Entity()
export class Reminder {
  @PrimaryGeneratedColumn({ type: "int" })
  id!: number;

  @Column({ type: "varchar" })
  time!: string;

  @Column({ type: "integer" })
  index!: number;

  @OneToMany(() => Day, (day) => day.reminder, { cascade: true })
  days!: Day[];

  @ManyToOne(() => Habit, (habit) => habit.reminders, { onDelete: "CASCADE" })
  habit!: Habit;
}
