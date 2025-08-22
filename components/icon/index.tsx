import { ComponentProps, FC } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type IconName = ComponentProps<typeof MaterialIcons>["name"];

interface IconProps {
  name: IconName;
  color?: string;
  size?: number;
}

const Icon: FC<IconProps> = ({ name, size = 28, color = "white" }) => {
  return <MaterialIcons name={name} size={size} color={color} />;
};

export default Icon;
