import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  OneToMany,
} from "typeorm";
import { Habit } from "./habit";

@Entity()
export class Category {
  @PrimaryGeneratedColumn({ type: "int" })
  id!: number;

  @Column({ type: "varchar" })
  name!: string;

  @Column({ type: "varchar" })
  icon!: string;

  @Column({ type: "varchar" })
  library!: string;

  @OneToMany(() => Habit, (habit) => habit.categories)
  habits!: Habit[];
}
