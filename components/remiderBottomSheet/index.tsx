import { FC, Ref } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import RenderIcon from "../RenderIcon";

interface ReminderBottomSheetProps {
  ref: Ref<BottomSheetModal>;
}

const daysOfWeek = ["Mon", "Tues", "Wed", "Thu", "Friy", "Sat", "Sun"];

const ReminderBottomSheet: FC<ReminderBottomSheetProps> = ({ ref }) => {
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
      snapPoints={["60%"]}
      stackBehavior="push"
      ref={ref}
    >
      <BottomSheetView className="flex flex-1 gap-4 h-full p-4 bg-[#161617]">
        <Text className="text-white text-xl">Habit Reminder</Text>
        <View className="flex gap-3">
          <Days />
          <TimePicker />
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default ReminderBottomSheet;

const Days = () => {
  return (
    <View className="flex gap-2 bg-black p-2 rounded-lg border border-gray-600">
      <Text className="text-white text-xl">Days</Text>
      <View className="flex flex-row gap-1 ">
        {daysOfWeek.map((day: string) => (
          <TouchableOpacity
            style={{
              backgroundColor: day == "Mon" ? "#0077b6" : undefined,
            }}
            className="p-2 flex items-center justify-center flex-1 rounded-lg
            border border-gray-600"
          >
            <Text className="flex font-semibold text-white text-center">
              {day}{" "}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        className="flex items-center justify-center w-full
      bg-[#161617] flex-row rounded-xl border border-gray-700"
      >
        <View className="flex p-2 gap-2 items-center flex-row">
          <RenderIcon
            library="AntDesign"
            size={30}
            name="clockcircleo"
            color="white"
          />
          <Text className="text-white truncate text-2xl font-extrabold">
            10:10
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const TimePicker = () => {
  return (
    <View>
      <Text className="text-white">Time picker</Text>
    </View>
  );
};

const AddReminder = () => {
  return (
    <View>
      <Text>Add Reminder</Text>
    </View>
  );
};
