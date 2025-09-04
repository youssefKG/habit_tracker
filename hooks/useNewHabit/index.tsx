import { useState, useEffect } from "react";
import { NewHabit, Reminder } from "@/types/habit.type";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import useBottomSheetModal from "../useBottomSheet";

const newHabitDefaultValues: NewHabit = {
  name: "",
  description: "",
  frequency: "none",
  reminders: [],
  category: "",
  color: "#FF6B6B",
};

const useNewHabit = () => {
  const [newHabit, setNewHabit] = useState<NewHabit>(newHabitDefaultValues);
  const [newReminders, setNewReminders] = useState<Reminder[]>([]);
  const [timePickerDate, setTimePickerDate] = useState<Date>(new Date());
  const [isTimePickerOpen, setIsTimePickerOpen] = useState<boolean>(false);
  const [
    reminderBottomSheetRef,
    openReminderBottomSheet,
    closeReminderBottomSheet,
  ] = useBottomSheetModal();

  const openTimePicker = () => {
    setIsTimePickerOpen(true);
  };

  const onChangeNewReminderTime = (
    _: DateTimePickerEvent,
    selectedData?: Date,
  ) => {
    const currentDate: Date = selectedData ?? new Date();
    setTimePickerDate(currentDate);
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

  useEffect(() => {
    // setNewReminders(newHabit);
  }, []);

  const handleNewHabitFieldChange = (key: string, value: string) => {
    setNewHabit((prevNewHabit) => ({ ...prevNewHabit, [key]: value }));
  };

  const onSaveNewReminders = (newReminders: Reminder[]) => {
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
    setTimePickerDate(new Date());
  };

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
