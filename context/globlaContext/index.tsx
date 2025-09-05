import { FC } from "react";
import { PropsWithChildren } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import HabitProvider from "../habitContext";
import DbProvider from "../dbContext";

const GlobalContextProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <GestureHandlerRootView>
      <DbProvider>
        <BottomSheetModalProvider>
          <HabitProvider>{children}</HabitProvider>
        </BottomSheetModalProvider>
      </DbProvider>
    </GestureHandlerRootView>
  );
};

export default GlobalContextProvider;
