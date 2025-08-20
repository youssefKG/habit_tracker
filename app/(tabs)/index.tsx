import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Habit from "@/components/Habit";
import HabitDetailBottomSheet from "@/components/HabitDetailBottomSheet";
import HabitHeader from "@/components/HabitHeader";
import CreateHabitBottomSheet from "@/components/createHabitBottomSheet";

export default function TabOneScreen() {
  const [isHabitDetailOpen, setIsHabitDetailOpen] = useState<boolean>(false);
  const [isCreateHabitBottomSheetOpen, setIsCreateHabitBottomSheetOpen] =
    useState<boolean>(true);

  const handleOpenHabitDetailBottomSheet = () => {
    setIsHabitDetailOpen(false);
  };

  const openHabitDetailBottomSheet = () => {
    setIsHabitDetailOpen(true);
  };

  const openCreateHabitBottomSheet = (): void => {
    setIsCreateHabitBottomSheetOpen(true);
  };
  const closeCreateHabitBottomSheet = () => {
    setIsCreateHabitBottomSheetOpen(false);
  };

  return (
    <SafeAreaView>
      <View className="bg-[#161617] flex gap-2 h-screen">
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
        <HabitDetailBottomSheet
          isVisible={isHabitDetailOpen}
          onClose={handleOpenHabitDetailBottomSheet}
        />
        <CreateHabitBottomSheet
          isVisible={isCreateHabitBottomSheetOpen}
          onClose={closeCreateHabitBottomSheet}
        />
      </View>
    </SafeAreaView>
  );
}
