import { useState, useEffect } from "react";
import { NewHabit, Reminder } from "@/types/habit.type";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import useBottomSheetModal from "../useBottomSheet";
import { Category } from "@/types/category";
import { CategoryDTO } from "@/dto/category.dto";
import { useDataSource } from "@/context/dbContext";
import { CategoryRepository } from "@/repositories";

const newHabitDefaultValues: NewHabit = {
  name: "youssef",
  description: "the first habit",
  frequency: "none",
  reminders: [],
  category: {
    name: "",
    icon: "",
    library: "",
  },
  color: "#FF6B6B",
  targetPerDay: 1,
  requiredLogs: 1,
};

const defaultNewCategory: Category = {
  name: "",
  icon: "",
  library: "",
};

const useNewHabit = () => {
  const [newHabit, setNewHabit] = useState<NewHabit>(newHabitDefaultValues);
  const [newReminders, setNewReminders] = useState<Reminder[]>([]);
  const [timePickerDate, setTimePickerDate] = useState<Date>(new Date());
  const [isTimePickerOpen, setIsTimePickerOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [newCategory, setNewCategory] = useState<Category>(defaultNewCategory);
  const [categories, setCategories] = useState<CategoryDTO[]>([]);

  // context start
  const {
    habitRebository,
    reminderRepository,
    dayRepository,
    categoryRepositroy,
  } = useDataSource();
  // context end

  // modals  start
  const [
    reminderBottomSheetRef,
    openReminderBottomSheet,
    closeReminderBottomSheet,
  ] = useBottomSheetModal();
  const [
    categoriesBottomSheetRef,
    openCategoriesBottomSheet,
    closeCategoriesBottomSheet,
  ] = useBottomSheetModal();
  const [
    newCateogyBottomSheetRef,
    openNewCategoryBottomSheet,
    closeNewCategoryBottomSheet,
  ] = useBottomSheetModal();
  const [iconsBottomSheetRef, openIconsBottomSheet, closeIconsBottmSheet] =
    useBottomSheetModal();

  const [
    newHabitBottomSheetRef,
    openNewHabitBottomSheet,
    closeNewHabitBottomSheet,
  ] = useBottomSheetModal();

  // new habit
  const onCloseNewHabitBottomSheet = () => {
    setNewHabit(newHabitDefaultValues);
    closeNewHabitBottomSheet();
    closeCategoriesBottomSheet();
    closeReminderBottomSheet();
    closeIconsBottmSheet();
  };

  // fieldes changes (name, description...)
  const handleNewHabitFieldChange = (key: keyof NewHabit, value: string) => {
    if (key === "targetPerDay") {
      if (/^\d*$/.test(value)) {
        setNewHabit((prev) => ({ ...prev, targetPerDay: parseInt(value) }));
      }
    } else {
      setNewHabit((prevNewHabit) => ({ ...prevNewHabit, [key]: value }));
    }
  };

  // reminders  start
  const openTimePicker = () => {
    setIsTimePickerOpen(true);
  };

  const onChangeNewReminderTime = (
    _: DateTimePickerEvent,
    selectedData?: Date,
  ) => {
    const currentDate: Date = selectedData ?? new Date();
    setTimePickerDate(currentDate);
    setIsTimePickerOpen(false);
  };

  const addNewReminder = () => {
    const time = new Date();
    const days = ["Mon", "Tues", "Wed", "Thu", "Friy"];
    setNewReminders((prevNewReminders) => [
      ...prevNewReminders,
      {
        time,
        days,
        id: prevNewReminders.length + 1,
        index: prevNewReminders.length + 1,
      },
    ]);
  };

  const toggleNewReminderDay = (day: string, newReminderId: number) => {
    setNewReminders((prevNewReminders: Reminder[]) => {
      return prevNewReminders.map((newReminder: Reminder) => {
        if (newReminderId === newReminder.id) {
          let days: string[] = [];
          if (newReminder.days.includes(day)) {
            days = newReminder.days.filter((d: string) => d !== day);
          } else {
            days = [...newReminder.days, day];
          }
          return { ...newReminder, days };
        }
        return newReminder;
      });
    });
  };

  const deleteNewReminder = (newReminderId: number) => {
    setNewReminders((prevNewReminders: Reminder[]) =>
      prevNewReminders.filter(
        (reminder: Reminder) => reminder.id !== newReminderId,
      ),
    );
  };

  const clearNewReminders = () => {
    setNewReminders([]);
    setTimePickerDate(new Date());
  };

  const onSaveNewReminders = () => {
    setNewHabit((prevNewHabit: NewHabit) => ({
      ...prevNewHabit,
      reminders: newReminders,
    }));
    closeReminderBottomSheet();
    setNewReminders([]);
  };

  const onOpenReminderBottomSheet = () => {
    setNewReminders(newHabit.reminders);
    openReminderBottomSheet();
  };

  const onCloseReminderBottomSheet = () => {
    setNewReminders([]);
  };
  // reminder end

  // categories start
  const selectCategories = (category: Category) => {
    setSelectedCategory(category);
  };

  const addNewCategory = () => {};
  // categories end

  // completions per day start

  const incrementTargetPerDay = () => {
    if (newHabit.targetPerDay < 10) {
      setNewHabit((prev) => ({
        ...prev,
        targetPerDay: prev.targetPerDay + 1,
      }));
    }
  };
  const decrementTargetPerDay = () => {
    console.log("increment");
    if (newHabit.targetPerDay > 1) {
      setNewHabit((prev) => ({
        ...prev,
        targetPerDay: prev.targetPerDay - 1,
      }));
    }
  };

  const handleChangeTargetPerDay = (value: string) => {
    if (/^\d*$/.test(value)) {
      setNewHabit((prev) => ({ ...prev, targetPerDay: parseInt(value) }));
    }
  };

  const saveNewHabit = async () => {
    console.log(newHabit.targetPerDay);
    // save reminders
    try {
      await habitRebository.create({
        name: newHabit.name,
        description: newHabit.description,
        color: newHabit.color,
        frequency: newHabit.frequency,
        targetPerDay: newHabit.targetPerDay,
        requiredLogs: newHabit.requiredLogs,
        reminders: newHabit.reminders.map((reminder) => ({
          time: reminder.time.getTime().toString(),
          index: reminder.index,
          days: reminder.days.map((d) => ({ day: d })),
        })),
        logs: [],
        category: newHabit.category,
      });
      setNewHabit(newHabitDefaultValues);
      closeNewCategoryBottomSheet();
      closeNewHabitBottomSheet();
      const allHabits = await habitRebository.getAll();
      console.log("all habits ", allHabits);
    } catch (err) {
      console.log("error creating habit", err);
    }
  };
  useEffect(() => {
    const fetchHabit = async () => {
      try {
        const allHabits = await habitRebository.getAll();
        console.log("all habits ", allHabits);
        allHabits.forEach((habit) => console.log(habit));
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchHabit();
  }, []);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories_list = await categoryRepositroy.getAll();
        setCategories(categories_list);
        console.log("categories list: ", categories_list);
      } catch (error) {}
    };
    fetchCategories();
  }, []);
  // completions per day end

  return {
    newHabit,
    handleNewHabitFieldChange,
    onSaveNewReminders,
    clearNewReminders,
    toggleNewReminderDay,
    newReminders,
    isTimePickerOpen,
    openTimePicker,
    deleteNewReminder,
    addNewReminder,
    reminderBottomSheetRef,
    onChangeNewReminderTime,
    timePickerDate,
    onOpenReminderBottomSheet,
    onCloseReminderBottomSheet,
    incrementTargetPerDay,
    decrementTargetPerDay,
    handleChangeTargetPerDay,
    newHabitBottomSheetRef,
    openNewHabitBottomSheet,
    closeNewHabitBottomSheet,
    onCloseNewHabitBottomSheet,
    categories,
    saveNewHabit,
  };
};
export default useNewHabit;
