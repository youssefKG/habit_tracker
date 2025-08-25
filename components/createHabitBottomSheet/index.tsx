import { FC, useCallback, useRef, useState, useMemo, Ref } from "react";
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

interface CreateBottomSheetProps {
  onClose: (_: number) => void;
  createHabitBottomSheetRef: Ref<BottomSheetModal>;
  openCategoriesBottomSheet: () => void;
  closeCategoriesBottomSheet: () => void;
  openFrequencyBottomSheet: () => void;
}

const CreateHabitBottomSheet: FC<CreateBottomSheetProps> = ({
  onClose,
  openCategoriesBottomSheet,
  openFrequencyBottomSheet,
  createHabitBottomSheetRef,
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
                <TextInput className="bg-black p-2 rounded-xl border border-gray-600" />
              </View>
              <View className="flex gap-1">
                <Text className="text-gray-300">Descriptin</Text>
                <TextInput className="bg-black p-2 rounded-xl border border-gray-600" />
              </View>
              <HabitColors />
              <AdvancedOptions
                toogleAdvancedOptions={toogleAdvancesOptions}
                isOpen={isAdvancedOptionsOpen}
                openCategoriesBottomSheet={openCategoriesBottomSheet}
                openFrequencyBottomSheet={openFrequencyBottomSheet}
              />
            </View>
          </ScrollView>
          <TouchableOpacity className="bg-blue-500 shadow-cyan-600 border border-gray-400 p-2 absolute bottom-6 w-[60%] self-center rounded">
            <Text className="text-white text-xl text-center font-medium">
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default CreateHabitBottomSheet;
