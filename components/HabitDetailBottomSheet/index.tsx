import { FC } from "react";
import { View, Text } from "react-native";
import BottomSheet from "../common/BottomSheet";

interface HabitDetailProps {
  isVisible: boolean;
  onClose: () => void;
}

const HabitDetail: FC<HabitDetailProps> = ({ isVisible, onClose }) => {
  return (
    <BottomSheet
      backgroundColor="#495057"
      isVisible={isVisible}
      onClose={onClose}
      height={0.9}
      borderRadius={12}
    >
      <View className="">
        <Text>hello world</Text>
      </View>
    </BottomSheet>
  );
};

export default HabitDetail;
