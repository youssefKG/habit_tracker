import { useState, useEffect } from "react";
import { NewHabit, Reminder } from "@/types/habit.type";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import useBottomSheetModal from "../useBottomSheet";
import { Category } from "@/types/category";

const newHabitDefaultValues: NewHabit = {
  name: "",
  description: "",
  frequency: "none",
  reminders: [],
  categories: [],
  color: "#FF6B6B",
};

const defaultNewCategory = {
  name: "",
};

const useNewHabit = () => {
  const [newHabit, setNewHabit] = useState<NewHabit>(newHabitDefaultValues);
  const [newReminders, setNewReminders] = useState<Reminder[]>([]);
  const [timePickerDate, setTimePickerDate] = useState<Date>(new Date());
  const [isTimePickerOpen, setIsTimePickerOpen] = useState<boolean>(false);
  const [selectedCategories, setSeletectedCategories] = useState<number[]>([]);
  const [newCategory, setNewCategory] = useState<Category>(defaultNewCategory);
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

  // fieldes changes (name, description...)
  const handleNewHabitFieldChange = (key: string, value: string) => {
    setNewHabit((prevNewHabit) => ({ ...prevNewHabit, [key]: value }));
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
      { time, days, id: prevNewReminders.length + 1 },
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
  const selectCategories = (categoryId: number) => {
    setSeletectedCategories([...selectedCategories, categoryId]);
  };

  const onSaveCategoris = () => {
    setNewHabit({ ...newHabit, categories: selectedCategories });
    setSeletectedCategories([]);
    closeCategoriesBottomSheet();
  };

  const onCloseCategoriesBottomSheet = () => {
    setNewCategory(defaultNewCategory);
    setSeletectedCategories([]);
  };

  const addNewCategory = () => {};

  // categories end

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
  };
};
export default useNewHabit;
