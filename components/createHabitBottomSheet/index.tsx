import { FC, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import BottomSheet from "../common/BottomSheet";
import HabitColors from "../habitColors";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import Animated from "react-native-reanimated";
import { FadeIn, FadeOut, Easing } from "react-native-reanimated";

interface CreateBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
}

const CreateHabitBottomSheet: FC<CreateBottomSheetProps> = ({
  isVisible,
  onClose,
}) => {
  const [isAdvancedOptionsOpen, setIsAdvancedOptionsOpen] =
    useState<boolean>(false);

  const toogleAdvancesOptions = () => {
    setIsAdvancedOptionsOpen(!isAdvancedOptionsOpen);
  };

  return (
    <BottomSheet
      borderRadius={20}
      height={0.9}
      onClose={onClose}
      isVisible={isVisible}
      backgroundColor="#212529"
    >
      <View className="flex p-4 flex-1 gap-4 relative">
        <View className="flex flex-row items-center gap-8">
          <TouchableOpacity onPress={onClose} className="">
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>
          <Text className="font-medium text-xl text-white">New Habit</Text>
        </View>
        <ScrollView>
          <View className="flex gap-3">
            <View className="flex gap-2">
              <Text className="text-white font-medium">Nom</Text>
              <TextInput className="bg-black p-2 rounded" />
            </View>
            <View className="flex gap-1">
              <Text className="text-white">Descriptin</Text>
              <TextInput className="bg-black p-2 rounded" />
            </View>
            <HabitColors />
            <AdvancedOptions
              toogleAdvancedOptions={toogleAdvancesOptions}
              isOpen={isAdvancedOptionsOpen}
            />
          </View>
        </ScrollView>
        <TouchableOpacity className="bg-blue-500 shadow-cyan-600 p-2 absolute bottom-6 w-[60%] self-center rounded">
          <Text className="text-white text-xl text-center font-medium">
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};

interface AdvancedOptionsProps {
  isOpen: boolean;
  toogleAdvancedOptions: () => void;
}

const AdvancedOptions: FC<AdvancedOptionsProps> = ({
  isOpen,
  toogleAdvancedOptions,
}) => {
  return (
    <View className="flex gap-2">
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
          <View className="flex gap-2">
            <Text className="text-white">hello from animmated view</Text>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

export default CreateHabitBottomSheet;
