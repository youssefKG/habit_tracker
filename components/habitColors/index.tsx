import { FC } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Animated, { FadeIn, FadeOut, Easing } from "react-native-reanimated";

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

interface HabitColorsProps {
  handleColorChange: (color: string) => void;
  pickedColor: string;
}

const HabitColors: FC<HabitColorsProps> = ({
  pickedColor,
  handleColorChange,
}) => {
  return (
    <View className="flex gap-2">
      <Text className="text-white font-medium">Colors</Text>
      <View className="flex flex-row gap-4 flex-wrap">
        {habitColors.map((color: string, index: number) => (
          <TouchableOpacity
            key={index}
            style={{ backgroundColor: color }}
            className="flex items-center justify-center w-9 h-9 rounded-lg"
            onPress={() => handleColorChange(color)}
          >
            {pickedColor === color && (
              <Animated.View
                entering={FadeIn.duration(600).easing(
                  Easing.inOut(Easing.quad),
                )}
                exiting={FadeOut}
                className="w-5 h-5 rounded-full bg-black"
              />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default HabitColors;
