import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
} from "typeorm";
import { Icon } from "./icon";
import { Habit } from "./habit";

@Entity()
export class Category {
  @PrimaryGeneratedColumn({ type: "int" })
  id!: number;

  @Column({ type: "varchar" })
  name!: string;

  @ManyToOne(() => Icon, (icon) => icon.categories)
  icon!: Icon;

  @ManyToMany(() => Habit, (habit) => habit.categories)
  habits!: Habit[];
}
