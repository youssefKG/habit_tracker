import { FC, Ref } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import RenderIcon from "../RenderIcon";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { NewHabit, Reminder } from "@/types/habit.type";
import Animated, { FadeIn, Layout } from "react-native-reanimated";
import { ScrollView } from "react-native-gesture-handler";

interface ReminderBottomSheetProps {
  timePickerDate: Date;
  ref: Ref<BottomSheetModal>;
  newHabit: NewHabit;
  newReminders: Reminder[];
  isTimePickerOpen: boolean;
  addNewReminder: () => void;
  onChangeNewReminderTime: (
    _: DateTimePickerEvent,
    selectedDate?: Date,
  ) => void;
  onSave: () => void;
  onClose: () => void;
  toggleNewReminderDay: (day: string, reminderId: number) => void;
  deleteNewReminder: (NewReminderId: number) => void;
  openTimePicker: () => void;
}

const daysOfWeek = ["Mon", "Tues", "Wed", "Thu", "Friy", "Sat", "Sun"];
const ReminderBottomSheet: FC<ReminderBottomSheetProps> = ({
  ref,
  newReminders,
  timePickerDate,
  newHabit,
  isTimePickerOpen,
  onChangeNewReminderTime,
  onClose,
  openTimePicker,
  onSave,
  toggleNewReminderDay,
  deleteNewReminder,
  addNewReminder,
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
      snapPoints={["60%"]}
      stackBehavior="push"
      enablePanDownToClose={true}
      onDismiss={onClose}
      ref={ref}
    >
      <BottomSheetView className="flex relative flex-1 w-full gap-4 h-full p-4 bg-[#161617]">
        <ScrollView>
          <View className="flex gap-4 mb-20 ">
            <Text className="text-white text-xl">Habit Reminder</Text>
            <Animated.View
              entering={FadeIn.duration(300)}
              exiting={FadeIn.duration(200)}
              className="flex gap-3"
              layout={Layout.springify()}
            >
              <View className="flex gap-2">
                {newReminders.map((newReminder: Reminder, index: number) => (
                  <NewReminder
                    toggleDay={toggleNewReminderDay}
                    habitColor={newHabit.color}
                    key={index}
                    newReminder={newReminder}
                    openTimePicker={openTimePicker}
                    deleteNewReminder={deleteNewReminder}
                  />
                ))}
              </View>
            </Animated.View>
            {isTimePickerOpen && (
              <DateTimePicker
                style={{
                  backgroundColor: "black",
                }}
                themeVariant="dark"
                is24Hour={true}
                mode="time"
                testID="datetimepicker"
                value={timePickerDate}
                onChange={onChangeNewReminderTime}
              />
            )}
            <TouchableOpacity
              style={{ backgroundColor: newHabit.color }}
              onPress={addNewReminder}
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
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={onSave}
          className="flex  w-3/4 self-center absolute bottom-3 justify-self-end  items-center bg-[#343a40] mt-6 rounded justify-center border border-gray-500 p-2"
        >
          <Text className="text-white text-xl">Save</Text>
        </TouchableOpacity>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default ReminderBottomSheet;

interface NewReminderProps {
  openTimePicker: () => void;
  habitColor: string;
  deleteNewReminder: (reminderId: number) => void;
  newReminder: Reminder;
  toggleDay: (day: string, reminderId: number) => void;
}

const NewReminder: FC<NewReminderProps> = ({
  openTimePicker,
  habitColor,
  deleteNewReminder,
  newReminder,
  toggleDay,
}) => {
  return (
    <View className="flex gap-3 bg-black p-2 rounded-lg border border-gray-600">
      <View className="flex items-center flex-row justify-between">
        <Text className="text-gray-400">Reminder {newReminder.id}</Text>
        <TouchableOpacity
          onPress={() => deleteNewReminder(newReminder.id)}
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
        {daysOfWeek.map((day: string) => (
          <TouchableOpacity
            onPress={() => toggleDay(day, newReminder.id)}
            key={day}
            style={{
              backgroundColor: newReminder.days.includes(day)
                ? habitColor
                : undefined,
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
        onPress={openTimePicker}
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
