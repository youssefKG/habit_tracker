import { useState, useEffect, useCallback } from 'react';
import { habitService, Habit, Category, Reminder } from '@/db/habitService';

export interface UseHabitsReturn {
  habits: Habit[];
  categories: Category[];
  loading: boolean;
  error: string | null;
  createHabit: (habit: Omit<Habit, "id" | "created_at">) => Promise<void>;
  updateHabit: (id: number, updates: Partial<Habit>) => Promise<void>;
  deleteHabit: (id: number) => Promise<void>;
  markHabitCompleted: (habitId: number, date?: string) => Promise<void>;
  markHabitIncomplete: (habitId: number, date?: string) => Promise<void>;
  createCategory: (category: Omit<Category, "id">) => Promise<void>;
  refreshHabits: () => Promise<void>;
  refreshCategories: () => Promise<void>;
}

export const useHabits = (): UseHabitsReturn => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize database and load initial data
  useEffect(() => {
    const initializeData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        await habitService.initialize();
        await refreshHabits();
        await refreshCategories();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to initialize data');
        console.error('Failed to initialize habit data:', err);
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, []);

  const refreshHabits = useCallback(async () => {
    try {
      const fetchedHabits = await habitService.getAllHabits();
      setHabits(fetchedHabits);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load habits');
      console.error('Failed to refresh habits:', err);
    }
  }, []);

  const refreshCategories = useCallback(async () => {
    try {
      const fetchedCategories = await habitService.getAllCategories();
      setCategories(fetchedCategories);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load categories');
      console.error('Failed to refresh categories:', err);
    }
  }, []);

  const createHabit = useCallback(async (habit: Omit<Habit, "id" | "created_at">) => {
    try {
      setError(null);
      await habitService.createHabit(habit);
      await refreshHabits();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create habit');
      console.error('Failed to create habit:', err);
      throw err;
    }
  }, [refreshHabits]);

  const updateHabit = useCallback(async (id: number, updates: Partial<Habit>) => {
    try {
      setError(null);
      await habitService.updateHabit(id, updates);
      await refreshHabits();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update habit');
      console.error('Failed to update habit:', err);
      throw err;
    }
  }, [refreshHabits]);

  const deleteHabit = useCallback(async (id: number) => {
    try {
      setError(null);
      await habitService.deleteHabit(id);
      await refreshHabits();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete habit');
      console.error('Failed to delete habit:', err);
      throw err;
    }
  }, [refreshHabits]);

  const markHabitCompleted = useCallback(async (habitId: number, date?: string) => {
    try {
      setError(null);
      await habitService.markHabitCompleted(habitId, date);
      await refreshHabits();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to mark habit as completed');
      console.error('Failed to mark habit as completed:', err);
      throw err;
    }
  }, [refreshHabits]);

  const markHabitIncomplete = useCallback(async (habitId: number, date?: string) => {
    try {
      setError(null);
      await habitService.markHabitIncomplete(habitId, date);
      await refreshHabits();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to mark habit as incomplete');
      console.error('Failed to mark habit as incomplete:', err);
      throw err;
    }
  }, [refreshHabits]);

  const createCategory = useCallback(async (category: Omit<Category, "id">) => {
    try {
      setError(null);
      await habitService.createCategory(category);
      await refreshCategories();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create category');
      console.error('Failed to create category:', err);
      throw err;
    }
  }, [refreshCategories]);

  return {
    habits,
    categories,
    loading,
    error,
    createHabit,
    updateHabit,
    deleteHabit,
    markHabitCompleted,
    markHabitIncomplete,
    createCategory,
    refreshHabits,
    refreshCategories,
  };
};
