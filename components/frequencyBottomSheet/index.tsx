import { FC, Ref } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { View, Text } from "react-native";

interface FrequencyBottomSheetProps {
  ref: Ref<BottomSheetModal>;
  close: () => void;
}
const FrequencyBottomSheet: FC<FrequencyBottomSheetProps> = ({ ref }) => {
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
      <BottomSheetView className="flex-1 p-4 h-full bg-black">
        <View>
          <Text className="text-white">hello from frequency Bottom sheet</Text>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default FrequencyBottomSheet;
