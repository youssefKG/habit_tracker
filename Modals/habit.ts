import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

enum Frequency {
  NONE = "none",
  DAILY = "daily",
  MONTHLY = "monthly",
  WEEK = "week",
}

@Entity()
export class Habit {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  color!: string;

  @Column({
    type: "enum",
    enum: Frequency,
    default: Frequency.NONE,
  })
  frequency!: string;
}
