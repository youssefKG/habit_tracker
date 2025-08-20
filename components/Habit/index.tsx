import { FC } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import ChartBoxes from "../ChartBoxs";

interface HabitProps {
  name: string;
  description: string;
  is_completed: boolean;
  color: string;
  openHabitDetailBottomSheet: () => void;
}

const Habit: FC<HabitProps> = ({
  name,
  is_completed,
  color,
  openHabitDetailBottomSheet,
}) => {
  return (
    <TouchableOpacity
      onPress={openHabitDetailBottomSheet}
      className="flex gap-1 p-2 bg-[#343a40] rounded-lg"
    >
      <View className="flex flex-row items-center justify-between">
        <Text className="text-white text-lg">{name}</Text>
        <TouchableOpacity
          style={{
            backgroundColor: color,
            opacity: is_completed ? 1 : 0.5,
          }}
          className="flex items-center justify-center rounded-lg p-2"
        >
          <MaterialIcons name="done" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <ChartBoxes color={color} is_completed={is_completed} />
    </TouchableOpacity>
  );
};

export default Habit;
