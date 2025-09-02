import { FC } from "react";
import { PropsWithChildren } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import HabitProvider from "../habitContext";

const GlobalContextProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <HabitProvider>{children}</HabitProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default GlobalContextProvider;
