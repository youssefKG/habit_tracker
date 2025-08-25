import { createContext, FC, PropsWithChildren } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HabitHeader from "@/components/HabitHeader";
import useBottomSheetModal from "@/hooks/useBottomSheet";
import CreateHabitBottomSheet from "@/components/createHabitBottomSheet";
import CategoriesBottomSheet from "@/components/categoriesBottomSheet";
import FrequencyBottomSheet from "@/components/frequencyBottomSheet";
import IconsBottomSheet from "@/components/IconsBottomSheet";
import AddNewCategoryBottomSheet from "@/components/addCategoryBottomSheet";

interface HabitContextI {}

const HabitContext = createContext<HabitContextI>({} as HabitContextI);

const HabitProvider: FC<PropsWithChildren> = ({ children }) => {
  const [
    createHabitBottomSheetRef,
    openCreateHabitBottomSheet,
    closeCreateHabitBottomSheet,
  ] = useBottomSheetModal();
  const [
    categoriesBottomSheetRef,
    openCategoriesBottomSheet,
    closeCategoriesBottomSheet,
  ] = useBottomSheetModal();

  const [
    reminderBottomSheet,
    openReminderBottomSheet,
    closeReminderBottomSheet,
  ] = useBottomSheetModal();

  const [
    frequencyBottomSheetRef,
    openFrequencyBottomSheet,
    closeFrequencyBottomSheet,
  ] = useBottomSheetModal();

  const [
    addNewCategoryBottomSheetRef,
    openAddNewCategoryBottomSheet,
    closeAddNewCategoryBottomSheet,
  ] = useBottomSheetModal();

  const [iconsBottomSheetRef, openIconsBottomSheet, closeIconsBottomSheet] =
    useBottomSheetModal();

  return (
    <HabitContext.Provider value={{}}>
      <SafeAreaView style={{ flex: 1 }}>
        <HabitHeader openCreateHabitBottomSheet={openCreateHabitBottomSheet} />
        {children}
        <CreateHabitBottomSheet
          onClose={closeCreateHabitBottomSheet}
          createHabitBottomSheetRef={createHabitBottomSheetRef}
          openCategoriesBottomSheet={openCategoriesBottomSheet}
          closeCategoriesBottomSheet={closeCategoriesBottomSheet}
          openFrequencyBottomSheet={openFrequencyBottomSheet}
        />
        <CategoriesBottomSheet
          openAddNewCategoryBottomSheet={openAddNewCategoryBottomSheet}
          ref={categoriesBottomSheetRef}
        />
        <FrequencyBottomSheet
          close={closeFrequencyBottomSheet}
          ref={frequencyBottomSheetRef}
        />
        <AddNewCategoryBottomSheet
          openIconsBottomSheet={openIconsBottomSheet}
          ref={addNewCategoryBottomSheetRef}
        />
        <IconsBottomSheet
          closeIconsBottomSheet={closeIconsBottomSheet}
          ref={iconsBottomSheetRef}
        />
      </SafeAreaView>
    </HabitContext.Provider>
  );
};

export default HabitProvider;
