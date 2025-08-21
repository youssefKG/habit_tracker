import { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

interface HabitHeaderProps {
  openCreateHabitBottomSheet: () => void;
}
const HabitHeader: FC<HabitHeaderProps> = ({ openCreateHabitBottomSheet }) => {
  return (
    <View className="flex bg-[#343a40] items-center flex-row p-3 justify-between">
      <Text className="text-white font-bold text-lg">
        Habit
        <Text className="text-[#00b4d8]">Tracker</Text>
      </Text>
      <TouchableOpacity onPress={openCreateHabitBottomSheet}>
        <Ionicons name="add-circle-outline" size={26} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default HabitHeader;
