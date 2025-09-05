import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Habit } from "./habit";

@Entity()
export class Log {
  @PrimaryGeneratedColumn({ type: "int" })
  id!: number;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  logedAt!: Date;

  @Column({ type: "boolean", default: false })
  isCompleted!: boolean;

  @ManyToOne(() => Habit, (habit) => habit.logs, {
    onDelete: "CASCADE",
    cascade: true,
  })
  habit!: Habit;
}
