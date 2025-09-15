import { FC } from "react";
import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Activity } from "@/types/activity";
import { groupsByWeeks } from "@/lib/calendar";

interface HabitStatsProps {
  name: string;
}

const HabitStats: FC<HabitStatsProps> = ({ name }) => {
  return (
    <View className="flex bg-gray-800 p-2 gap-2 rounded border border-gray-700 ">
      <View className="flex flex-row items-center justify-between">
        <View>
          <Text className="text-white text-lg font-light tracking-wider">
            {name}
          </Text>
        </View>
      </View>
      <ScrollView horizontal={true}>
        <RenderBoxs />
      </ScrollView>
    </View>
  );
};

const RenderCalendar = () => {
  return <View></View>;
};

const RenderWeekDays = () => {
  return <View>j</View>;
};

const RenderMonths = () => {
  return <View></View>;
};

const RenderBoxs = () => {
  return (
    <View className="flex flex-row gap-1">
      {groupsByWeeks(activities, 0).map((week) => (
        <View className="flex gap-1">
          {week.map((d) => (
            <View
              style={{
                backgroundColor: d?.level !== 0 ? "#386641" : "#38664120",
              }}
              className="w-5 h-5 rounded bg-red-800"
            />
          ))}
        </View>
      ))}
    </View>
  );
};
export const activities: Activity[] = [
  { date: "2025-05-01", count: 2, level: 1 },
  { date: "2025-09-02", count: 5, level: 2 },
  { date: "2025-09-03", count: 0, level: 0 },
  { date: "2025-09-04", count: 3, level: 2 },
  { date: "2025-09-05", count: 7, level: 3 },
  { date: "2025-09-06", count: 7, level: 3 },
  { date: "2025-09-08", count: 7, level: 3 },
  { date: "2025-09-09", count: 7, level: 3 },
  { date: "2025-09-10", count: 7, level: 3 },
  { date: "2025-09-11", count: 7, level: 3 },
  { date: "2025-10-06", count: 1, level: 1 },
  { date: "2025-11-09", count: 1, level: 1 },
  { date: "2025-11-06", count: 1, level: 1 },
  { date: "2025-12-30", count: 6, level: 3 },
];

export default HabitStats;
