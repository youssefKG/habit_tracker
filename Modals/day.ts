import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from "typeorm";
import { Reminder } from "./reminder";

// enum DayOfWeek {
//   MONDAY = "monday",
//   TUESDAY = "tuesday",
//   WEDNESDAY = "wednesday",
//   THURSDAY = "thursday",
//   FRIDAY = "friday",
//   SATURDAY = "saturday",
//   SUNDAY = "sunday",
// }

@Entity()
export class Day {
  @PrimaryGeneratedColumn({ type: "int" })
  id!: number;

  @Column({ type: "varchar" })
  day!: string;

  @ManyToOne(() => Reminder, (reminder) => reminder.days, {
    onDelete: "CASCADE",
  })
  reminder!: Reminder;
}
