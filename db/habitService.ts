import * as SQLite from "expo-sqlite";
import { habitsMigrationQuery, habitLogsMigrationQuery, categoriesMigrationQuery, remindersMigrationQuery } from "./querys";

export interface Habit {
  id?: number;
  name: string;
  description?: string;
  color: string;
  goal: number;
  frequency: "daily" | "weekly" | "monthly";
  reminder_time?: string;
  icon?: string;
  priority: boolean;
  archived: boolean;
  last_completed?: string;
  streak_count: number;
  category?: string;
  created_at?: string;
}

export interface HabitLog {
  id?: number;
  habit_id: number;
  date: string;
  completed: boolean;
  duration?: number;
  quantity?: number;
}

export interface Category {
  id?: number;
  name: string;
  color?: string;
}

export interface Reminder {
  id?: number;
  habit_id: number;
  time: string;
  repeat: "daily" | "weekly" | "custom";
  enabled: boolean;
}

class HabitService {
  private db: SQLite.SQLiteDatabase | null = null;

  async initialize() {
    try {
      this.db = await SQLite.openDatabaseAsync("habit_tracker.db");
      
      // Run migrations
      await this.db.execAsync(habitsMigrationQuery);
      await this.db.execAsync(habitLogsMigrationQuery);
      await this.db.execAsync(categoriesMigrationQuery);
      await this.db.execAsync(remindersMigrationQuery);
      
      console.log("Database initialized successfully");
    } catch (error) {
      console.error("Failed to initialize database:", error);
      throw error;
    }
  }

  // Habit CRUD operations
  async createHabit(habit: Omit<Habit, "id" | "created_at">): Promise<number> {
    if (!this.db) throw new Error("Database not initialized");
    
    const result = await this.db.runAsync(`
      INSERT INTO habit (name, description, color, goal, frequency, reminder_time, icon, priority, archived, streak_count, category)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      habit.name,
      habit.description,
      habit.color,
      habit.goal,
      habit.frequency,
      habit.reminder_time,
      habit.icon,
      habit.priority ? 1 : 0,
      habit.archived ? 1 : 0,
      habit.streak_count,
      habit.category
    ]);
    
    return result.lastInsertRowId;
  }

  async getAllHabits(): Promise<Habit[]> {
    if (!this.db) throw new Error("Database not initialized");
    
    const habits = await this.db.getAllAsync<Habit>(`
      SELECT * FROM habit WHERE archived = 0 ORDER BY priority DESC, created_at DESC
    `);
    
    return habits.map(habit => ({
      ...habit,
      priority: Boolean(habit.priority),
      archived: Boolean(habit.archived)
    }));
  }

  async getHabitById(id: number): Promise<Habit | null> {
    if (!this.db) throw new Error("Database not initialized");
    
    const habit = await this.db.getFirstAsync<Habit>(`
      SELECT * FROM habit WHERE id = ?
    `, id);
    
    if (!habit) return null;
    
    return {
      ...habit,
      priority: Boolean(habit.priority),
      archived: Boolean(habit.archived)
    };
  }

  async updateHabit(id: number, updates: Partial<Habit>): Promise<void> {
    if (!this.db) throw new Error("Database not initialized");
    
    const fields = Object.keys(updates).filter(key => key !== "id" && key !== "created_at");
    const values = fields.map(field => updates[field as keyof Habit]);
    
    if (fields.length === 0) return;
    
    const query = `
      UPDATE habit SET ${fields.map(field => `${field} = ?`).join(", ")}
      WHERE id = ?
    `;
    
    await this.db.runAsync(query, ...values, id);
  }

  async deleteHabit(id: number): Promise<void> {
    if (!this.db) throw new Error("Database not initialized");
    
    await this.db.runAsync("DELETE FROM habit WHERE id = ?", id);
    await this.db.runAsync("DELETE FROM habit_logs WHERE habit_id = ?", id);
    await this.db.runAsync("DELETE FROM reminders WHERE habit_id = ?", id);
  }

  // Habit completion tracking
  async markHabitCompleted(habitId: number, date: string = new Date().toISOString().split('T')[0]): Promise<void> {
    if (!this.db) throw new Error("Database not initialized");
    
    // Check if already completed for this date
    const existing = await this.db.getFirstAsync<HabitLog>(`
      SELECT * FROM habit_logs WHERE habit_id = ? AND date = ?
    `, habitId, date);
    
    if (existing) {
      await this.db.runAsync(`
        UPDATE habit_logs SET completed = 1 WHERE habit_id = ? AND date = ?
      `, habitId, date);
    } else {
      await this.db.runAsync(`
        INSERT INTO habit_logs (habit_id, date, completed) VALUES (?, ?, 1)
      `, habitId, date);
    }
    
    // Update habit streak and last completed
    await this.updateHabitStreak(habitId);
  }

  async markHabitIncomplete(habitId: number, date: string = new Date().toISOString().split('T')[0]): Promise<void> {
    if (!this.db) throw new Error("Database not initialized");
    
    await this.db.runAsync(`
      UPDATE habit_logs SET completed = 0 WHERE habit_id = ? AND date = ?
    `, habitId, date);
    
    await this.updateHabitStreak(habitId);
  }

  private async updateHabitStreak(habitId: number): Promise<void> {
    if (!this.db) throw new Error("Database not initialized");
    
    // Calculate current streak
    const logs = await this.db.getAllAsync<HabitLog>(`
      SELECT * FROM habit_logs 
      WHERE habit_id = ? AND completed = 1 
      ORDER BY date DESC
    `, habitId);
    
    let streak = 0;
    const today = new Date();
    
    for (const log of logs) {
      const logDate = new Date(log.date);
      const daysDiff = Math.floor((today.getTime() - logDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === streak) {
        streak++;
      } else {
        break;
      }
    }
    
    // Update habit with new streak and last completed
    const lastCompleted = logs.length > 0 ? logs[0].date : null;
    await this.updateHabit(habitId, {
      streak_count: streak,
      last_completed: lastCompleted
    });
  }

  // Analytics and reporting
  async getHabitStats(habitId: number, days: number = 30): Promise<{
    totalCompletions: number;
    completionRate: number;
    currentStreak: number;
    longestStreak: number;
    weeklyProgress: { [key: string]: number };
  }> {
    if (!this.db) throw new Error("Database not initialized");
    
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    const logs = await this.db.getAllAsync<HabitLog>(`
      SELECT * FROM habit_logs 
      WHERE habit_id = ? AND date >= ? AND completed = 1
      ORDER BY date
    `, habitId, startDate.toISOString().split('T')[0]);
    
    const totalCompletions = logs.length;
    const completionRate = (totalCompletions / days) * 100;
    
    const habit = await this.getHabitById(habitId);
    const currentStreak = habit?.streak_count || 0;
    
    // Calculate weekly progress
    const weeklyProgress: { [key: string]: number } = {};
    logs.forEach(log => {
      const week = this.getWeekNumber(new Date(log.date));
      weeklyProgress[week] = (weeklyProgress[week] || 0) + 1;
    });
    
    return {
      totalCompletions,
      completionRate,
      currentStreak,
      longestStreak: currentStreak, // Simplified - could be enhanced
      weeklyProgress
    };
  }

  private getWeekNumber(date: Date): string {
    const year = date.getFullYear();
    const week = Math.ceil((date.getTime() - new Date(year, 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000));
    return `${year}-W${week}`;
  }

  // Category operations
  async createCategory(category: Omit<Category, "id">): Promise<number> {
    if (!this.db) throw new Error("Database not initialized");
    
    const result = await this.db.runAsync(`
      INSERT INTO categories (name, color) VALUES (?, ?)
    `, category.name, category.color);
    
    return result.lastInsertRowId;
  }

  async getAllCategories(): Promise<Category[]> {
    if (!this.db) throw new Error("Database not initialized");
    
    return await this.db.getAllAsync<Category>("SELECT * FROM categories ORDER BY name");
  }

  // Reminder operations
  async createReminder(reminder: Omit<Reminder, "id">): Promise<number> {
    if (!this.db) throw new Error("Database not initialized");
    
    const result = await this.db.runAsync(`
      INSERT INTO reminders (habit_id, time, repeat, enabled)
      VALUES (?, ?, ?, ?)
    `, reminder.habit_id, reminder.time, reminder.repeat, reminder.enabled ? 1 : 0);
    
    return result.lastInsertRowId;
  }

  async getRemindersForHabit(habitId: number): Promise<Reminder[]> {
    if (!this.db) throw new Error("Database not initialized");
    
    const reminders = await this.db.getAllAsync<Reminder>(`
      SELECT * FROM reminders WHERE habit_id = ? AND enabled = 1
    `, habitId);
    
    return reminders.map(reminder => ({
      ...reminder,
      enabled: Boolean(reminder.enabled)
    }));
  }
}

export const habitService = new HabitService();
