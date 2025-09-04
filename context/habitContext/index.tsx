import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HabitHeader from "@/components/HabitHeader";
import useBottomSheetModal from "@/hooks/useBottomSheet";
import CreateHabitBottomSheet from "@/components/createHabitBottomSheet";
import CategoriesBottomSheet from "@/components/categoriesBottomSheet";
import FrequencyBottomSheet from "@/components/frequencyBottomSheet";
import IconsBottomSheet from "@/components/IconsBottomSheet";
import AddNewCategoryBottomSheet from "@/components/addCategoryBottomSheet";
import { FrequencyType, NewHabit, Reminder } from "@/types/habit.type";
import ReminderBottomSheet from "@/components/remiderBottomSheet";
import useNewHabit from "@/hooks/useNewHabit";

interface HabitContextI {}

const HabitContext = createContext<HabitContextI>({} as HabitContextI);

const HabitProvider: FC<PropsWithChildren> = ({ children }) => {
  const {
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
  } = useNewHabit();

  const [
    createHabitBottomSheetRef,
    openCreateHabitBottomSheet,
    closeCreateHabitBottomSheet,
  ] = useBottomSheetModal();
  const [
    categoriesBottomSheetRef,
    openCategoriesBottomSheet,
    closeCategoriesBottomSheet,
  ] = useBottomSheetModal();

  const [
    frequencyBottomSheetRef,
    openFrequencyBottomSheet,
    closeFrequencyBottomSheet,
  ] = useBottomSheetModal();

  const [
    addNewCategoryBottomSheetRef,
    openAddNewCategoryBottomSheet,
    closeAddNewCategoryBottomSheet,
  ] = useBottomSheetModal();

  const [iconsBottomSheetRef, openIconsBottomSheet, closeIconsBottomSheet] =
    useBottomSheetModal();

  useEffect(() => {
    console.log("new habit", newHabit);
  }, []);
  return (
    <HabitContext.Provider value={{}}>
      <SafeAreaView style={{ flex: 1 }}>
        <HabitHeader openCreateHabitBottomSheet={openCreateHabitBottomSheet} />
        {children}
        <CreateHabitBottomSheet
          newHabit={newHabit}
          handleChange={handleNewHabitFieldChange}
          onClose={closeCreateHabitBottomSheet}
          createHabitBottomSheetRef={createHabitBottomSheetRef}
          openCategoriesBottomSheet={openCategoriesBottomSheet}
          closeCategoriesBottomSheet={closeCategoriesBottomSheet}
          openFrequencyBottomSheet={openFrequencyBottomSheet}
          openReminderBottomSheet={onOpenReminderBottomSheet}
        />
        <CategoriesBottomSheet
          openAddNewCategoryBottomSheet={openAddNewCategoryBottomSheet}
          ref={categoriesBottomSheetRef}
        />
        <FrequencyBottomSheet
          handleChangeFrenquency={(value: FrequencyType) =>
            handleNewHabitFieldChange("frequency", value)
          }
          frequency={newHabit.frequency}
          close={closeFrequencyBottomSheet}
          ref={frequencyBottomSheetRef}
        />
        <AddNewCategoryBottomSheet
          openIconsBottomSheet={openIconsBottomSheet}
          ref={addNewCategoryBottomSheetRef}
        />
        <IconsBottomSheet
          closeIconsBottomSheet={closeIconsBottomSheet}
          ref={iconsBottomSheetRef}
        />
        <ReminderBottomSheet
          openTimePicker={openTimePicker}
          deleteNewReminder={deleteNewReminder}
          newHabit={newHabit}
          newReminders={newReminders}
          timePickerDate={timePickerDate}
          toggleNewReminderDay={toggleNewReminderDay}
          onChangeNewReminderTime={onChangeNewReminderTime}
          addNewReminder={addNewReminder}
          isTimePickerOpen={isTimePickerOpen}
          ref={reminderBottomSheetRef}
          onClose={onCloseReminderBottomSheet}
          onSave={onSaveNewReminders}
        />
      </SafeAreaView>
    </HabitContext.Provider>
  );
};

export default HabitProvider;
