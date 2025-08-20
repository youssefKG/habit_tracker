import { FC, PropsWithChildren } from "react";
import { Modal, View, Dimensions, Pressable } from "react-native";

interface BottomSheetProps extends PropsWithChildren {
  isVisible: boolean;
  height: number;
  onClose: () => void;
  backgroundColor?: string;
  borderRadius?: number;
}

const screenHeight = Dimensions.get("window").height;

const BottomSheet: FC<BottomSheetProps> = ({
  isVisible,
  children,
  height,
  onClose,
  backgroundColor,
  borderRadius,
}) => {
  return (
    <Modal
      transparent={false}
      backdropColor="rgba(0, 0, 0,  0.3)"
      animationType="slide"
      visible={isVisible}
      onRequestClose={onClose}
      className="h-screen"
    >
      <Pressable className="flex-1" onPress={onClose}></Pressable>
      <View
        className="absolute bottom-0 bg-white w-full"
        style={{
          height: screenHeight * height,
          backgroundColor: backgroundColor,
          borderRadius: borderRadius,
        }}
      >
        {children}
      </View>
    </Modal>
  );
};

export default BottomSheet;
