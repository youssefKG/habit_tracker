import { Ref, FC } from "react";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { View, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { categoriesIconsData } from "@/assets/iconsData";
import RenderCategoriesIcons from "../RenderCategoryIcons";

type Icon = {
  icon: string;
  library: string;
};
interface IconsBottomSheetProps {
  ref: Ref<BottomSheetModal>;
  closeIconsBottomSheet: () => void;
  handleSelect: (icon: Icon) => void;
}

const IconsBottomSheet: FC<IconsBottomSheetProps> = ({ ref, handleSelect }) => {
  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={["80%"]}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          appearsOnIndex={1}
          disappearsOnIndex={-1}
          {...props}
        />
      )}
    >
      <BottomSheetScrollView className="flex gap-5 pb-50  bg-[#161617] h-full p-3">
        <View className="flex gap-5">
          <View className="flex gap-1">
            <Text className="font-bold text-xl text-white">Choose an Icon</Text>
            <Text className="text-gray-500">
              Select an icon that best represents your new category. This will
              help you easily identify it later.
            </Text>
          </View>
          <TextInput
            className="border border-gray-400 rounded-xl px-2"
            placeholder="Search for icon"
            placeholderTextColor="gray"
          />
          <View className="flex gap-6 mb-52">
            {categoriesIconsData.map((cat_icons) => (
              <RenderCategoriesIcons
                name={cat_icons.name}
                handleSelect={handleSelect}
                icons={cat_icons.icons}
              />
            ))}
          </View>
        </View>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};

export default IconsBottomSheet;
