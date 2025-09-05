import { Habit } from "@/Modals";
import { NewHabit } from "@/types/habit.type";
import { DataSource, Repository } from "typeorm";

class HabitRepository {
  private ormRepositroy: Repository<Habit>;
  constructor(connection: DataSource) {
    this.ormRepositroy = connection.getRepository(Habit);
  }

  public async createHabit(newHabit: Omit<Habit, "id">) {
    const habit = this.ormRepositroy.create(newHabit);
    await this.ormRepositroy.save(habit);
    return habit;
  }

  public async getAll() {}

  public async delete(habitId: number) {}

  public async update() {}
}

export default HabitRepository;
