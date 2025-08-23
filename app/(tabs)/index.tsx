import { useState } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Habit from "@/components/Habit";
import HabitHeader from "@/components/HabitHeader";
import CreateHabitBottomSheet from "@/components/createHabitBottomSheet";
import CategoriesBottomSheet from "@/components/categoriesBottomSheet";
import useBottomSheetModal from "@/hooks/useBottomSheet";
import FrequencyBottomSheet from "@/components/frequencyBottomSheet";
import AddNewCategoryBottomSheet from "@/components/addCategoryBottomSheet";
import IconsBottomSheet from "@/components/IconsBottomSheet";

type CreateNewHabit = {
  name: string;
  description: string;
  color: string;
  reminder_time: string;
  icon: string;
  priority: boolean;
  catgory: string;
  frequency: "daily" | "weekly" | "monthly";
  goal: number;
};

export default function TabOneScreen() {
  const [isHabitDetailOpen, setIsHabitDetailOpen] = useState<boolean>(false);

  const [
    categoriesBottomSheetRef,
    openCategoriesBottomSheet,
    closeCategoriesBottomSheet,
  ] = useBottomSheetModal();
  const [
    createHabitBottomSheetRef,
    openCreateHabitBottomSheet,
    closeCreateHabitBottomSheet,
  ] = useBottomSheetModal();
  const [
    reminderBottomSheet,
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
  const [iconsBottomSheetRef, openIconsBottomSheet, closeIconsBottomSheetR] =
    useBottomSheetModal();

  const openHabitDetailBottomSheet = () => {
    setIsHabitDetailOpen(true);
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="bg-[#161617] flex gap-2 flex-1">
        <HabitHeader openCreateHabitBottomSheet={openCreateHabitBottomSheet} />
        <View className="flex flex-col gap-2 p-4">
          <Habit
            openHabitDetailBottomSheet={openHabitDetailBottomSheet}
            color="#d90429"
            is_completed
            description="the task is about ..."
            name="Reading"
          />
          <Habit
            openHabitDetailBottomSheet={openHabitDetailBottomSheet}
            color="#16db65"
            is_completed
            description="the task is about ..."
            name="Running"
          />
        </View>
        <Text className="text-white">hello world</Text>
      </View>

      <CreateHabitBottomSheet
        onClose={closeCreateHabitBottomSheet}
        createHabitBottomSheetRef={createHabitBottomSheetRef}
        openCategoriesBottomSheet={openCategoriesBottomSheet}
        closeCategoriesBottomSheet={closeCategoriesBottomSheet}
        openFrequencyBottomSheet={openFrequencyBottomSheet}
      />
      <CategoriesBottomSheet
        openAddNewCategoryBottomSheet={openAddNewCategoryBottomSheet}
        ref={categoriesBottomSheetRef}
      />
      <FrequencyBottomSheet
        close={closeFrequencyBottomSheet}
        ref={frequencyBottomSheetRef}
      />
      <IconsBottomSheet ref={iconsBottomSheetRef} />
      <AddNewCategoryBottomSheet ref={addNewCategoryBottomSheetRef} />
    </SafeAreaView>
  );
}
