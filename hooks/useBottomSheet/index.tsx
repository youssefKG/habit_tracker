import { useRef, Ref } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

type UseBottomSheetModalType = [
  Ref<BottomSheetModal>, // index 0 → ref
  () => void, // index 1 → open fn
  () => void, // index 2 → close fn
];

const useBottomSheetModal = (): UseBottomSheetModalType => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const openBottomSheetModal = () => {
    bottomSheetRef.current?.present();
  };

  const closeBottomSheetModal = () => {
    bottomSheetRef.current?.close();
  };

  return [bottomSheetRef, openBottomSheetModal, closeBottomSheetModal];
};

export default useBottomSheetModal;
