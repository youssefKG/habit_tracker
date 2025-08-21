import { FC, Ref, ComponentProps, PropsWithChildren } from "react";
import { View, Pressable } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { TabTriggerSlotProps } from "expo-router/ui";

type Icon = ComponentProps<typeof MaterialIcons>["name"];
type TabButtonProps = TabTriggerSlotProps & {
  icon: Icon;
};

const TabButton: FC<TabButtonProps> = ({ isFocused, icon, ...props }) => {
  return (
    <Pressable {...props}>
      <MaterialIcons
        size={28}
        name={icon}
        color={isFocused ? "#0466c8" : "white"}
      />
    </Pressable>
  );
};

export default TabButton;
