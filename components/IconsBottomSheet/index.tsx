import { Ref, FC } from "react";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { View } from "react-native";

interface IconsBottomSheetProps {
  ref: Ref<BottomSheetModal>;
}

const IconsBottomSheet: FC<IconsBottomSheetProps> = ({ ref }) => {
  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={["90%"]}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          appearsOnIndex={1}
          disappearsOnIndex={-1}
          {...props}
        />
      )}
    >
      <BottomSheetView>
        <View className="flex flex-row flex-wrap"></View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default IconsBottomSheet;
