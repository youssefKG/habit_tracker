import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { Reminder } from "@/types/habit.type";
import { useEffect, useState } from "react";

const daysOfWeek = ["Mon", "Tues", "Wed", "Thu", "Friy", "Sat", "Sun"];

const useNewReminders = (
  oldReminders: Reminder[],
  handleSaveNewReminders: (newReminders: Reminder[]) => void,
) => {
  const [newReminders, setNewReminders] = useState<Reminder[]>([]);
  const [timePickerDate, setTimePickerDate] = useState<Date>(new Date());
  const [isTimePickerOpen, setIsTimePickerOpen] = useState<boolean>(false);

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
    setNewReminders(oldReminders);
  }, []);
  return {
    newReminders,
    onChangeNewReminderTime,
    deleteNewReminder,
    addNewReminder,
    toggleNewReminderDay,
    openTimePicker,
    timePickerDate,
    isTimePickerOpen,
    clearNewReminders,
  };
};

export default useNewReminders;

export { daysOfWeek };
