import { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import RenderIcon from "../RenderIcon";

interface HabitHeaderProps {
  openNewHabitBottomSheet: () => void;
}

const HabitHeader: FC<HabitHeaderProps> = ({ openNewHabitBottomSheet }) => {
  return (
    <View className="flex bg-[#343a40] items-center flex-row p-3 justify-between">
      <View className="flex flex-row gap-6 items-center">
        <TouchableOpacity className="flex items-center justify-center">
          <RenderIcon library="Ionicons" name="settings-outline" size={22} />
        </TouchableOpacity>
        <Text className="text-white tracking-[1px] font-light text-xl">
          Habit
          <Text className="text-[#00b4d8]">Tracker</Text>
        </Text>
      </View>
      <TouchableOpacity
        onPress={openNewHabitBottomSheet}
        className="flex items-center justify-center"
      >
        <RenderIcon name="plus" library="EvilIcons" size={30} />
      </TouchableOpacity>
    </View>
  );
};

export default HabitHeader;
