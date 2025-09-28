import { useCallback, useState } from "react";
import { View, ScrollView } from "react-native";
import { useHabitContext } from "@/context/habitContext";
import HabitHeader from "@/components/HabitHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import { Habit } from "@/Modals";
import { useDataSource } from "@/context/dbContext";
import { RefreshControl } from "react-native-gesture-handler";
import HabitStats from "@/components/HabitStats";

export default function TabOneScreen() {
  const { openNewHabitBottomSheet } = useHabitContext();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { habitRebository } = useDataSource();
  const [habits, setHabits] = useState<Habit[]>([]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    const allHabits = await habitRebository.getAll();
    setHabits(allHabits);
    setRefreshing(false);
  }, []);
  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const allHabits = await habitRebository.getAll();
        setHabits(allHabits);
        console.log("habit list: ", allHabits);
      } catch (error) {
        console.log(error);
      }
    };
    if (habitRebository) fetchHabits();
  }, []);
  return (
    <SafeAreaView className="flex-1">
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        className="flex-1"
      >
        <HabitHeader openNewHabitBottomSheet={openNewHabitBottomSheet} />
        <View className="flex-1 p-2  h-screen bg-[#161617]">
          <View className="flex gap-2">
            <HabitStats name="First habit" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
