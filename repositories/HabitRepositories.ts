import { Habit } from "@/Modals";
import { NewHabit } from "@/types/habit.type";
import { DataSource, DeepPartial, Repository } from "typeorm";

class HabitRepository {
  private ormRepositroy: Repository<Habit>;
  constructor(connection: DataSource) {
    this.ormRepositroy = connection.getRepository(Habit);
  }

  public async create(newHabit: DeepPartial<Habit>) {
    const habit = this.ormRepositroy.create(newHabit);
    await this.ormRepositroy.save(habit);
    return habit;
  }

  public async getAll() {
    const habits = await this.ormRepositroy.find();
    return habits;
  }

  public async delete(habitId: number) {
    const findHabit = await this.ormRepositroy.findOneBy({
      id: habitId,
    });

    if (findHabit) {
      await this.ormRepositroy.delete(findHabit);
    }
  }

  public async update() {}
}

export default HabitRepository;
