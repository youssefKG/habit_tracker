import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Category } from "./category";

@Entity()
export class Icon {
  @PrimaryGeneratedColumn({ type: "int" })
  id!: number;

  @Column({ type: "varchar" })
  name!: string;

  @Column({ type: "varchar" })
  library!: string;

  @OneToMany(() => Category, (category) => category.icon)
  categories!: Category[];
}
