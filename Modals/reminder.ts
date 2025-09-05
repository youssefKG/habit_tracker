import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Reminder {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  time!: string;

  @Column({ type: "integer", generated: "increment" })
  index!: number;
}
