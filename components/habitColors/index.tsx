import { FC } from "react";
import { View, Text } from "react-native";

const habitColors: string[] = [
  "#FF6B6B", // Bright Red
  "#FF8E72", // Coral
  "#FFA500", // Orange
  "#FFB347", // Light Orange
  "#FFD93D", // Yellow
  "#FFF176", // Soft Yellow
  "#6BCB77", // Green
  "#4CAF50", // Medium Green
  "#20C997", // Teal
  "#40E0D0", // Turquoise
  "#4D96FF", // Blue
  "#1E90FF", // Dodger Blue
  "#9D4EDD", // Purple
  "#C77DFF", // Lavender
  "#FF69B4", // Pink
  "#FFB6C1", // Light Pink
  "#E0Aaff", // Soft Violet
  "#795548", // Brown
  "#495057", // Dark Gray
  "#A9A9A9", // Light Gray
];

interface HabitColorsProps {}

const HabitColors: FC<HabitColorsProps> = ({}) => {
  return (
    <View className="flex gap-2">
      <Text className="text-white font-medium">Colors</Text>
      <View className="flex flex-row gap-4 flex-wrap">
        {habitColors.map((color: string, index: number) => (
          <View
            key={index}
            style={{ backgroundColor: color }}
            className="w-9 h-9 rounded"
          />
        ))}
      </View>
    </View>
  );
};

export default HabitColors;
