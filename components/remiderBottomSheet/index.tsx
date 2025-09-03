import { FC, Ref, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import RenderIcon from "../RenderIcon";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Reminder } from "@/types/habit.type";
import Animated, { FadeIn, Layout } from "react-native-reanimated";

interface ReminderBottomSheetProps {
  ref: Ref<BottomSheetModal>;
  reminders: Reminder[];
  habitColor: string;
}

const daysOfWeek = ["Mon", "Tues", "Wed", "Thu", "Friy", "Sat", "Sun"];

const ReminderBottomSheet: FC<ReminderBottomSheetProps> = ({
  ref,
  reminders,
  habitColor,
}) => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [isHabitTimePickerShown, setIsHabitTimePickerShown] =
    useState<boolean>(false);

  const [newReminders, setNewRemindes] = useState<Reminder[]>([]);

  const openHabitTimePicker = () => {
    setIsHabitTimePickerShown(true);
  };

  const onChangeHabitTime = (_, selectedDate?: Date) => {
    const currentDate = selectedDate ? selectedDate : new Date();
    setDate(currentDate);
    setIsHabitTimePickerShown(false);
  };

  const AddNewReminder = (): void => {
    const time = new Date();
    const days = ["Mon", "Tues", "Wed", "Thu", "Friy"];
    setNewRemindes([...newReminders, { time, days, id: reminders.length + 1 }]);
  };

  const deleteNewReminder = (reminderId: number) => {
    setNewRemindes((prevNewReminders: Reminder[]) =>
      prevNewReminders.filter(
        (reminder: Reminder) => reminder.id === reminderId,
      ),
    );
  };

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
      enablePanDownToClose={true}
      ref={ref}
    >
      <BottomSheetScrollView className="flex flex-1 gap-4 h-full p-4 bg-[#161617]">
        <View className="flex gap-4">
          <Text className="text-white text-xl">Habit Reminder</Text>
          <Animated.View
            entering={FadeIn.duration(300)}
            exiting={FadeIn.duration(200)}
            className="flex gap-3"
            layout={Layout.springify()}
          >
            {newReminders.map((reminder: Reminder, index: number) => (
              <NewReminder
                habitColor={habitColor}
                key={index}
                openHabitTimePicker={openHabitTimePicker}
              />
            ))}
            {isHabitTimePickerShown && (
              <DateTimePicker
                style={{
                  backgroundColor: "black",
                }}
                themeVariant="dark"
                is24Hour={true}
                mode="time"
                testID="datetimepicker"
                value={date}
                onChange={onChangeHabitTime}
              />
            )}
          </Animated.View>
          <TouchableOpacity
            style={{ backgroundColor: habitColor }}
            onPress={AddNewReminder}
            className="flex p-2 rounded  justify-center items-center "
          >
            <View className="flex flex-row items-center gap-2">
              <RenderIcon
                library="Ionicons"
                name="notifications-outline"
                size={24}
                color="white"
              />
              <Text className="text-white">Add Reminder</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity className="flex self-end  w-full justify-self-end  items-center bg-[#343a40] mt-6 rounded justify-center border border-gray-500 p-2">
            <Text className="text-white text-xl">Save</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};

export default ReminderBottomSheet;

interface NewReminderProps {
  openHabitTimePicker: () => void;
  habitColor: string;
  deleteNewReminder: (reminderId: number) => void;
}
const NewReminder: FC<NewReminderProps> = ({
  openHabitTimePicker,
  habitColor,
}) => {
  return (
    <View className="flex gap-3 bg-black p-2 rounded-lg border border-gray-600">
      <View className="flex items-center flex-row justify-between">
        <Text className="text-gray-400">Reminder 1</Text>
        <TouchableOpacity
          className="flex items-center justify-center p-px
      self-end bg-gray-800 rounded-full w-8 h-8"
        >
          <RenderIcon
            library="EvilIcons"
            name="close"
            size={22}
            color="white"
          />
        </TouchableOpacity>
      </View>
      <View className="flex flex-row gap-1 ">
        {daysOfWeek.map((day: string, index: number) => (
          <TouchableOpacity
            key={day}
            style={{
              backgroundColor: index < 3 ? habitColor : undefined,
            }}
            className="p-2 flex items-center justify-center flex-1 rounded-lg
            border border-gray-600"
          >
            <Text className="flex font-semibold text-white text-center">
              {day}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        onPress={openHabitTimePicker}
        className="flex items-center justify-center w-full
      bg-[#161617] flex-row rounded-xl border border-gray-700"
      >
        <View className="flex p-2 gap-2 items-center flex-row">
          <RenderIcon
            library="AntDesign"
            size={23}
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
