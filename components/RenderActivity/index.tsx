import { FC } from "react";
import { Activity } from "@/types/activity";
import { View, Text } from "react-native";
import { groupsByWeeks } from "@/lib/calendar";

interface RenderBoxsProps {
  activities: Array<Activity>;
}
const RenderActivies: FC<RenderBoxsProps> = ({ activities }) => {
  return (
    <View className="flex gap-2">
      <RenderBoxs />
    </View>
  );
};

const RenderBoxs = () => {
  return (
    <View className="flex gap-2">
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
      <RenderFooter />
    </View>
  );
};

export const RenderFooter = () => {
  return (
    <View className="flex flex-row gap-2">
      <Text className="text-gray-400">Less</Text>
      <View className="flex flex-row gap-px">
        <View className="w-3 h-3 rounded" />
      </View>
      <Text className="">More</Text>
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
