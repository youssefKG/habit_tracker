import { FC } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { IconPack } from "@/types/icon";
import RenderIcon from "../RenderIcon";

type Icon = {
  name: string;
  library: IconPack;
  size?: number;
  color?: string;
};

interface RenderCatIconsProps {
  icons: Icon[];
  name: string;
}

const RenderCategoriesIcons: FC<RenderCatIconsProps> = ({ name, icons }) => {
  return (
    <View className="flex gap-4">
      <Text className="font-medium text-gray-300">{name}</Text>
      <View className="h-px w-full bg-gray-600" />
      <View className="flex gap-2 flex-row flex-wrap items-center">
        {icons.map((icon, index: number) => (
          <TouchableOpacity
            className="flex items-center justify-center
          rounded-xl w-12 h-12 border border-gray-500"
          >
            <RenderIcon key={index} {...icon} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default RenderCategoriesIcons;
