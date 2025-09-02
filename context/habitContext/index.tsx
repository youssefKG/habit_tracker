import { createContext, FC, PropsWithChildren, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HabitHeader from "@/components/HabitHeader";
import useBottomSheetModal from "@/hooks/useBottomSheet";
import CreateHabitBottomSheet from "@/components/createHabitBottomSheet";
import CategoriesBottomSheet from "@/components/categoriesBottomSheet";
import FrequencyBottomSheet from "@/components/frequencyBottomSheet";
import IconsBottomSheet from "@/components/IconsBottomSheet";
import AddNewCategoryBottomSheet from "@/components/addCategoryBottomSheet";
import { FrequencyType, NewHabit } from "@/types/habit.type";
import ReminderBottomSheet from "@/components/remiderBottomSheet";

interface HabitContextI {}

const HabitContext = createContext<HabitContextI>({} as HabitContextI);

const HabitProvider: FC<PropsWithChildren> = ({ children }) => {
  const [newHabit, setNewHabit] = useState<NewHabit>({
    name: "",
    description: "",
    color: "#FF6B6B",
    frequency: "none",
    reminder: "none",
    category: "none",
  });

  const handleChange = (name: string, value: string) => {
    setNewHabit({ ...newHabit, [name]: value });
    console.log(newHabit);
  };

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
    reminderBottomSheetRef,
    openReminderBottomSheet,
    closeReminderBottomSheet,
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

  return (
    <HabitContext.Provider value={{}}>
      <SafeAreaView style={{ flex: 1 }}>
        <HabitHeader openCreateHabitBottomSheet={openCreateHabitBottomSheet} />
        {children}
        <CreateHabitBottomSheet
          newHabit={newHabit}
          handleChange={handleChange}
          onClose={closeCreateHabitBottomSheet}
          createHabitBottomSheetRef={createHabitBottomSheetRef}
          openCategoriesBottomSheet={openCategoriesBottomSheet}
          closeCategoriesBottomSheet={closeCategoriesBottomSheet}
          openFrequencyBottomSheet={openFrequencyBottomSheet}
          openReminderBottomSheet={openReminderBottomSheet}
        />
        <CategoriesBottomSheet
          openAddNewCategoryBottomSheet={openAddNewCategoryBottomSheet}
          ref={categoriesBottomSheetRef}
        />
        <FrequencyBottomSheet
          handleChangeFrenquency={(value: FrequencyType) =>
            handleChange("frequency", value)
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
        <ReminderBottomSheet ref={reminderBottomSheetRef} />
      </SafeAreaView>
    </HabitContext.Provider>
  );
};

export default HabitProvider;
