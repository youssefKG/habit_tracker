import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Icon {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  library!: string;
}
