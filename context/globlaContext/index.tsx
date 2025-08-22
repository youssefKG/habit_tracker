import { FC } from "react";
import { PropsWithChildren } from "react";
import DbContextProvider from "../dbContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

const GlobalContextProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <DbContextProvider>{children}</DbContextProvider>;
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default GlobalContextProvider;
