import { FC } from "react";
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
import { LinearGradient } from "expo-linear-gradient";

interface CreateBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
}

const CreateHabitBottomSheet: FC<CreateBottomSheetProps> = ({
  isVisible,
  onClose,
}) => {
  return (
    <BottomSheet
      borderRadius={20}
      height={0.9}
      onClose={onClose}
      isVisible={isVisible}
      backgroundColor="#212529"
    >
      <View className="flex flex-1 relative">
        <ScrollView>
          <View className="flex p-4 flex-row items-center gap-8">
            <TouchableOpacity className="">
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
            <Text className="font-medium text-xl text-white">New Habit</Text>
          </View>
          <View className="flex gap-3 p-4">
            <View className="flex gap-2">
              <Text className="text-white font-medium">Nom</Text>
              <TextInput className="bg-black p-2 rounded" />
            </View>
            <View className="flex gap-1">
              <Text className="text-white">Descriptin</Text>
              <TextInput className="bg-black p-2 rounded" />
            </View>
            <HabitColors />
          </View>
          <View className="flex gap-2 relative items-center flex-row mx-auto max-w-[80%]">
            <LinearGradient
              // gradient direction: left → right
              colors={["#8B5CF6", "#EC4899", "#EF4444"]} // purple → pink → red
              style={{ height: 2, width: "100%" }}
            />
            <Text className="text-white">Advanced setting</Text>
            <LinearGradient
              // gradient direction: left → right
              colors={["#8B5CF6", "#EC4899", "#EF4444"]} // purple → pink → red
              style={{ height: 2, width: "100%" }}
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

export default CreateHabitBottomSheet;
