import { Ref, FC } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { IconName } from "@/types/icon";
import Icon from "../icon";
import categoriesData from "@/assets/categoriesData";

interface CategoriesBottomSheetProps {
  ref: Ref<BottomSheetModal>;
  openAddNewCategoryBottomSheet: () => void;
}

const CategoriesBottomSheet: FC<CategoriesBottomSheetProps> = ({
  ref,
  openAddNewCategoryBottomSheet,
}) => {
  return (
    <BottomSheetModal
      snapPoints={["60%"]}
      index={1}
      ref={ref}
      stackBehavior="push"
      enablePanDownToClose={true}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={1}
          pressBehavior="close"
          disappearsOnIndex={-1}
        />
      )}
    >
      <BottomSheetScrollView className="h-full bg-black" style={{ flex: 1 }}>
        <View className="bg-black flex gap-4 flex-1 h-full p-4">
          <View className="flex gap-2">
            <Text className="text-white font-bold">Categories</Text>
            <Text className="text-gray-400">
              Select the category that fits your habit
            </Text>
          </View>
          <View className="flex flex-row gap-2 flex-wrap items-center">
            {categoriesData.map((cat) => (
              <CategoryButton
                key={cat.id}
                icon={cat.icon as IconName}
                name={cat.name}
                id={cat.id}
                onPress={() => {}}
              />
            ))}
            <CategoryButton
              onPress={openAddNewCategoryBottomSheet}
              id={12341}
              name="Add new one"
              icon="add"
            />
          </View>
        </View>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};

interface CategoryButton {
  name: string;
  id: number;
  icon: IconName;
  onPress: () => void;
}

const CategoryButton: FC<CategoryButton> = ({ name, id, icon, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="p-px flex flex-row rounded-3xl items-center gap-1 px-4 border border-gray-600"
    >
      <Icon name={icon} size={15} />
      <Text className="text-gray-400">{name}</Text>
    </TouchableOpacity>
  );
};

export default CategoriesBottomSheet;
