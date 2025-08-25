import { ComponentProps } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type IconName = ComponentProps<typeof MaterialIcons>["name"];
type IconPack =
  | "MaterialIcons"
  | "Ionicons"
  | "AntDesign"
  | "FontAwsome"
  | "MaterialCommunityIcons"
  | "FontAwesome5"
  | "Feather";

export type { IconName, IconPack };
