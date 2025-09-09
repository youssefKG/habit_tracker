import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class HabitCategory {
  @PrimaryGeneratedColumn({ type: "integer" })
  id: number;
}
