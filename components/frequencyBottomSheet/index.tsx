import { FC, Ref } from "react";
import { View, Text } from "react-native";
import Checkbox from "expo-checkbox";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { FrequencyType } from "@/types/habit.type";

interface FrequencyBottomSheetProps {
  ref: Ref<BottomSheetModal>;
  close: () => void;
  handleChangeFrenquency: (value: FrequencyType) => void;
  frequency: FrequencyType;
}

type Frequencies = {
  name: string;
  value: FrequencyType;
};

const frequencies: Frequencies[] = [
  {
    name: "None ",
    value: "none",
  },
  {
    name: "Daily",
    value: "daily",
  },
  {
    name: "Week",
    value: "week",
  },
  {
    name: "Monthly",
    value: "monthly",
  },
];

const FrequencyBottomSheet: FC<FrequencyBottomSheetProps> = ({
  ref,
  frequency,
  handleChangeFrenquency,
}) => {
  return (
    <BottomSheetModal
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={1}
          disappearsOnIndex={-1}
          pressBehavior="close"
        />
      )}
      index={1}
      snapPoints={["80%"]}
      stackBehavior="push"
      ref={ref}
    >
      <BottomSheetView className="flex-1 flex gap-3 p-4 h-full bg-[#161617]">
        <View className="flex gap-1">
          <Text className="font-bold text-xl text-white">Frequency</Text>
          <Text className="text-gray-300">
            Choose how often you want to repeat this habit.
          </Text>
        </View>
        <View className="flex gap-2">
          {frequencies.map((freq) => (
            <View className="flex flex-row items-center gap-2">
              <Checkbox
                onValueChange={() => handleChangeFrenquency(freq.value)}
                value={freq.value == frequency}
              />
              <Text className="text-white text-md tracking-wider">
                {freq.name}
              </Text>
            </View>
          ))}
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default FrequencyBottomSheet;
