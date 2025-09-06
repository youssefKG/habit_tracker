import { FC } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import RenderIcon from "../RenderIcon";

interface TargetPerDayProps {
  target: number;
  habitColor: string;
  increment: () => void;
  decrement: () => void;
  handleChange: (target: string) => void;
}

const TargetPerDay: FC<TargetPerDayProps> = ({
  habitColor,
  increment,
  decrement,
  target,
  handleChange,
}) => {
  return (
    <View className="flex gap-2">
      <View className="flex items-center flex-row justify-between">
        <Text className="text-gray-200">Completion per day</Text>
        <View className="flex flex-row gap-2 items-center">
          <View
            style={{ backgroundColor: habitColor + 70 }}
            className="w-4 h-4 rounded"
          />
          <View
            style={{ backgroundColor: habitColor }}
            className="w-4 h-4 rounded"
          />
        </View>
      </View>

      <View className="flex flex-row flex-1 gap-1">
        <View className="flex px-2 border border-gray-700 rounded-lg flex-1 flex-row items-center gap-2 bg-black">
          <TextInput
            keyboardType="numeric"
            onChangeText={handleChange}
            className="text-white font-medium flex-1"
            value={target.toString()}
            inputMode="numeric"
          />
          <Text className="text-gray-200 font-medium">/ Day</Text>
        </View>
        <View className="flex flex-row gap-1">
          <TouchableOpacity
            onPress={increment}
            className="flex items-center rounded-lg border border-gray-600
          justify-center p-2 bg-black"
          >
            <RenderIcon name="plus" library="AntDesign" size={28} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={decrement}
            className="flex items-center rounded-lg border border-gray-600
          justify-center p-2 bg-black"
          >
            <RenderIcon name="minus" library="AntDesign" size={28} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TargetPerDay;
