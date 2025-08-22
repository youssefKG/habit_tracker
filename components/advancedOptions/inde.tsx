import { FC } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import Animated, { FadeIn, FadeOut, Easing } from "react-native-reanimated";

interface AdvancedOptionsProps {
  isOpen: boolean;
  toogleAdvancedOptions: () => void;
  openCategoriesBottomSheet: () => void;
  openFrequencyBottomSheet: () => void;
}

const AdvancedOptions: FC<AdvancedOptionsProps> = ({
  isOpen,
  toogleAdvancedOptions,
  openCategoriesBottomSheet,
  openFrequencyBottomSheet,
}) => {
  return (
    <View className="flex gap-2 mt-6">
      <View className="flex gap-2 mx-9 relative items-center flex-row">
        <View className="h-px w-full bg-gray-600 bg-gradient-to-r flex-1" />
        <TouchableOpacity
          onPress={toogleAdvancedOptions}
          className="flex gap-1 items-center flex-row"
        >
          <Text className="text-gray-300">Advanced Options</Text>
          {isOpen ? (
            <Entypo name="chevron-small-down" size={24} color="#adb5bd" />
          ) : (
            <Entypo name="chevron-small-up" size={24} color="#adb5bd" />
          )}
        </TouchableOpacity>
        <View className="h-px w-full bg-gray-600 bg-gradient-to-r flex-1" />
      </View>
      {isOpen && (
        <Animated.View
          entering={FadeIn.duration(300).easing(Easing.inOut(Easing.quad))}
          exiting={FadeOut}
          className="flex gap-2"
        >
          <View className="flex flex-row gap-2">
            <View className="flex flex-1 gap-2">
              <Text className="text-gray-300">Frequency</Text>
              <TouchableOpacity
                onPress={openFrequencyBottomSheet}
                className="rounded-xl flex flex-row justify-between items-center p-3 bg-black border border-gray-600"
              >
                <Text className="text-gray-300">None</Text>
                <Entypo name="chevron-small-right" size={24} color="white" />
              </TouchableOpacity>
            </View>
            <View className="flex flex-1 gap-2">
              <Text className="text-gray-300 ">Reminder</Text>
              <TouchableOpacity className="rounded-xl flex flex-row justify-between items-center p-3 bg-black border border-gray-600">
                <Text className="text-gray-300">None</Text>
                <Entypo name="chevron-small-right" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex flex-1 gap-2">
            <Text className="text-gray-300">Category</Text>
            <TouchableOpacity
              onPress={openCategoriesBottomSheet}
              className="rounded-xl flex flex-row justify-between items-center p-3 bg-black border border-gray-600"
            >
              <Text className="text-gray-300">None</Text>
              <Entypo name="chevron-small-right" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

export default AdvancedOptions;
