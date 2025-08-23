import { FC, Ref } from "react";
import { View } from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

interface ReminderBottomSheetProps {
  ref: Ref<BottomSheetModal>;
}

const ReminderBottomSheet: FC<ReminderBottomSheetProps> = ({ ref }) => {
  return (
    <BottomSheetModal
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          appearsOnIndex={1}
          disappearsOnIndex={-1}
          pressBehavior="close"
          {...props}
        />
      )}
    >
      <BottomSheetView>
        <View>Hello from reminder bottom Sheet</View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default ReminderBottomSheet;
