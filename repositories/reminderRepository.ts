import { Reminder } from "@/Modals";
import { DataSource, Repository } from "typeorm";

interface ReminderRepositoryI {
  create: (reminder: Omit<Reminder, "id">) => Promise<Reminder>;
  update: (newReminder: Reminder) => Promise<Reminder | null>;
  delete: (remiderId: number) => Promise<void>;
  getAll: () => Promise<Reminder[]>;
}

class ReminderRepository implements ReminderRepositoryI {
  private ormReminder: Repository<Reminder>;

  constructor(dataSource: DataSource) {
    this.ormReminder = dataSource.getRepository(Reminder);
  }

  async getAll(): Promise<Reminder[]> {
    const reminders = await this.ormReminder.find();
    return reminders;
  }

  async update(newReminder: Reminder) {
    const updatedReminder = await this.ormReminder.findOneBy({
      id: newReminder.id,
    });

    if (updatedReminder) {
      updatedReminder.days = newReminder.days;
      updatedReminder.time = newReminder.time;
      updatedReminder.index = newReminder.index;
      await this.ormReminder.save(updatedReminder);
    }
    return updatedReminder;
  }

  async create(reminder: Omit<Reminder, "id">) {
    const newReminder = this.ormReminder.create(reminder);
    await this.ormReminder.save(newReminder);
    return newReminder;
  }

  async delete(reminderId: number) {
    const deletedReminders = await this.ormReminder.delete(reminderId);
  }

  public async saveMany(reminders: Reminder[]) {
    const insertedReminders = await this.ormReminder.save(reminders);
    return insertedReminders;
  }
}

export default ReminderRepository;
