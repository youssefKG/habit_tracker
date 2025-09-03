import { FC, useState, Ref } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import HabitColors from "../habitColors";
import Ionicons from "@expo/vector-icons/Ionicons";
import AdvancedOptions from "../advancedOptions/inde";
import { NewHabit } from "@/types/habit.type";

interface CreateBottomSheetProps {
  newHabit: NewHabit;
  createHabitBottomSheetRef: Ref<BottomSheetModal>;
  handleChange: (name: string, value: string) => void;
  onClose: (_: number) => void;
  openCategoriesBottomSheet: () => void;
  closeCategoriesBottomSheet: () => void;
  openFrequencyBottomSheet: () => void;
  openReminderBottomSheet: () => void;
}

const CreateHabitBottomSheet: FC<CreateBottomSheetProps> = ({
  newHabit,
  handleChange,
  onClose,
  openCategoriesBottomSheet,
  openFrequencyBottomSheet,
  createHabitBottomSheetRef,
  openReminderBottomSheet,
}) => {
  const [isAdvancedOptionsOpen, setIsAdvancedOptionsOpen] =
    useState<boolean>(true);

  const toogleAdvancesOptions = () => {
    setIsAdvancedOptionsOpen(!isAdvancedOptionsOpen);
  };
  return (
    <BottomSheetModal
      snapPoints={["90%"]}
      index={1}
      ref={createHabitBottomSheetRef}
      style={{
        flex: 1,
      }}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={1}
          disappearsOnIndex={-1}
          pressBehavior="close"
        />
      )}
    >
      <BottomSheetView className="flex-1 h-full z-40 p-4 bg-[#161617] relative">
        <View className="relative flex-1 z-30">
          <View className="flex flex-row items-center gap-8">
            <TouchableOpacity onPress={() => onClose(-1)} className="">
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
            <Text className="font-medium text-xl text-white">New Habit</Text>
          </View>
          <ScrollView className="mt-4">
            <View className="flex gap-3">
              <View className="flex gap-2">
                <Text className="text-gray-300">Nom</Text>
                <TextInput
                  value={newHabit.name}
                  onChangeText={(value: string) => handleChange("name", value)}
                  className="bg-black p-2 rounded-xl border border-gray-600"
                />
              </View>
              <View className="flex gap-1">
                <Text className="text-gray-300">Descriptin</Text>
                <TextInput
                  value={newHabit.description}
                  onChangeText={(value: string) =>
                    handleChange("description", value)
                  }
                  className="bg-black p-2 rounded-xl border border-gray-600"
                />
              </View>
              <HabitColors
                handleColorChange={(color) => handleChange("color", color)}
                pickedColor={newHabit.color}
              />
              <AdvancedOptions
                toogleAdvancedOptions={toogleAdvancesOptions}
                isOpen={isAdvancedOptionsOpen}
                openCategoriesBottomSheet={openCategoriesBottomSheet}
                openFrequencyBottomSheet={openFrequencyBottomSheet}
                openReminderBottomSheet={openReminderBottomSheet}
              />
            </View>
          </ScrollView>
          <TouchableOpacity
            className="bg-black/40 shadow-cyan-600 border
          border-gray-700 p-2 tracking-[1px] absolute bottom-6 w-[60%] self-center rounded-xl"
          >
            <Text className="text-gray-200 text-xl text-center">Save</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default CreateHabitBottomSheet;
