import { FC } from "react";
import { View, ScrollView } from "react-native";
import { handleBoxStyle } from "@/utils/handleBoxColor";

interface ChartBoxesProps {
  color: string;
  is_completed: boolean;
}

const ChartBoxes: FC<ChartBoxesProps> = ({ color }) => {
  return (
    <ScrollView horizontal={true}>
      {Array(52)
        .fill(0)
        .map((_, index) => (
          <WeekBoxes color={color} key={index} />
        ))}
    </ScrollView>
  );
};

interface WeekBoxesProps {
  color: string;
}

const WeekBoxes: FC<WeekBoxesProps> = ({ color }) => {
  return (
    <View className="h-fit">
      {Array(7)
        .fill(0)
        .map((_, index: number) => (
          <Box color={color} is_completed key={index} index={index} />
        ))}
      <View />
    </View>
  );
};

interface BoxProps {
  index: number;
  is_completed: boolean;
  color: string;
}

const Box: FC<BoxProps> = ({ index, color }) => {
  return (
    <View
      style={{
        ...handleBoxStyle(index % 2 == 0, color),
      }}
      className="w-3 bg-green-600 rounded-sm h-3 m-px"
      key={index}
    />
  );
};

export default ChartBoxes;
