import { Ref, FC } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { Category } from "@/Modals";
import RenderIcon from "../RenderIcon";

interface CategoriesBottomSheetProps {
  ref: Ref<BottomSheetModal>;
  openAddNewCategoryBottomSheet: () => void;
  categories: Category[];
}

const CategoriesBottomSheet: FC<CategoriesBottomSheetProps> = ({
  ref,
  openAddNewCategoryBottomSheet,
  categories,
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
      <BottomSheetScrollView
        className="h-full bg-[#161617]"
        style={{ flex: 1 }}
      >
        <View className="flex gap-4 flex-1 h-full p-4">
          <View className="flex gap-2">
            <Text className="text-white font-bold">Categories</Text>
            <Text className="text-gray-400">
              Select the category that fits your habit
            </Text>
          </View>
          <View className="flex flex-row gap-2 flex-wrap items-center">
            {categories.map((cat) => (
              <CategoryButton
                key={cat.id}
                name={cat.name}
                library={cat.library}
                icon={cat.icon}
                id={cat.id}
                onPress={() => {}}
              />
            ))}
            <CategoryButton
              onPress={openAddNewCategoryBottomSheet}
              id={1245}
              name="add new one"
              library="AntDesign"
              icon="plus"
            />
          </View>
        </View>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};

interface CategoryButton {
  id: number;
  name: string;
  library: string;
  icon: string;
  onPress: () => void;
}

const CategoryButton: FC<CategoryButton> = ({
  name,
  id,
  onPress,
  library,
  icon,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="p-px flex flex-row rounded-3xl items-center gap-1 px-4 border border-gray-600"
    >
      <RenderIcon library={library as any} name={icon} size={15} />
      <Text className="text-gray-400">{name}</Text>
    </TouchableOpacity>
  );
};

export default CategoriesBottomSheet;
