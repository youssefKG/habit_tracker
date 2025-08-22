import { FC, useEffect, useState } from "react";
import { View } from "react-native";
import { Tabs, TabList, TabTrigger, TabSlot } from "expo-router/ui";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { usePathname } from "expo-router";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

const Layout = () => {
  const pathName = usePathname();
  const [path, setPath] = useState<string>(pathName);

  useEffect(() => {
    setPath(pathName);
    console.log("path name", pathName);
  }, [pathName]);
  return (
    <Tabs>
      <TabSlot />
      <TabList className="absolute z-10 bg-[#343a40] border border-gray-300 rounded-full p-2 px-12  bottom-6 self-center">
        <TabTrigger name="index" href="./index">
          <CustomTab pathName={path} name="/" />
        </TabTrigger>
      </TabList>
    </Tabs>
  );
};

export default Layout;

interface CustomTabProps {
  pathName: string;
  name: string;
}
const CustomTab: FC<CustomTabProps> = ({ pathName, name }) => {
  return (
    <MaterialIcons
      name="checklist"
      size={28}
      color={pathName === name ? "#00b4d8" : "white"}
    />
  );
};
