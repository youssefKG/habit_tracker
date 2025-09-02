import { FC } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { IconPack } from "@/types/icon";

interface RenderIconsProps {
  library: IconPack;
  name: string;
  size?: number;
  color?: string;
}

const RenderIcon: FC<RenderIconsProps> = ({
  library,
  name,
  size = 28,
  color = "white",
}) => {
  switch (library) {
    case "MaterialIcons":
      return <MaterialIcons name={name as any} size={size} color={color} />;
    case "Ionicons":
      return <Ionicons name={name as any} size={size} color={color} />;
    case "AntDesign":
      return <AntDesign name={name as any} size={size} color={color} />;
    case "FontAwsome":
      return <FontAwesome name={name as any} size={size} color={color} />;
    case "MaterialCommunityIcons":
      return (
        <MaterialCommunityIcons name={name as any} size={size} color={color} />
      );
    case "FontAwesome5":
      <FontAwesome5 name={name as any} size={size} color={color} />;
    case "Feather":
      <Feather name={name as any} size={size} color={color} />;
    default:
      return null;
  }
};

export default RenderIcon;
