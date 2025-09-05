import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";

enum DayOfWeek {
  MONDAY = "monday",
  TUESDAY = "tuesday",
  WEDNESDAY = "wednesday",
  THURSDAY = "thursday",
  FRIDAY = "friday",
  SATURDAY = "saturday",
  SUNDAY = "sunday",
}

@Entity()
export class Day {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "enum", enum: DayOfWeek })
  day!: DayOfWeek;
}
