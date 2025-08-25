import { IconPack } from "@/types/icon";

type CatIconsType = {
  name: string;
  icons: {
    name: string;
    library: IconPack;
  }[];
};

export const categoriesIconsData: CatIconsType[] = [
  {
    name: "Work",
    icons: [
      { name: "briefcase-outline", library: "MaterialCommunityIcons" },
      { name: "laptop", library: "Ionicons" }, // Ionicons laptop-outline doesn't exist
      { name: "folder-open", library: "MaterialIcons" },
      { name: "cloud-outline", library: "MaterialCommunityIcons" },
      { name: "paperclip", library: "Feather" },
      { name: "mail-outline", library: "Ionicons" },
      { name: "send", library: "Feather" },
      { name: "calendar-outline", library: "Ionicons" },
      { name: "bell-outline", library: "MaterialCommunityIcons" }, // Ionicons bell-outline not available
      { name: "users", library: "Feather" },
      { name: "lightbulb-outline", library: "MaterialCommunityIcons" },
    ],
  },
  {
    name: "Fitness",
    icons: [
      { name: "dumbbell", library: "FontAwesome5" },
      { name: "run", library: "MaterialCommunityIcons" },
      { name: "bicycle", library: "Feather" },
      { name: "walk", library: "MaterialCommunityIcons" }, // no walk-outline
      { name: "yoga", library: "MaterialCommunityIcons" }, // meditation replaced with yoga
      { name: "heart-outline", library: "MaterialCommunityIcons" },
      { name: "stopwatch", library: "Feather" },
      { name: "trophy-outline", library: "MaterialCommunityIcons" },
    ],
  },
  {
    name: "Health",
    icons: [
      { name: "heart-outline", library: "MaterialCommunityIcons" },
      { name: "stethoscope", library: "FontAwesome5" },
      { name: "medkit-outline", library: "Ionicons" },
      { name: "bandage", library: "MaterialCommunityIcons" }, // fixed
      { name: "tooth-outline", library: "MaterialCommunityIcons" },
      { name: "eye-outline", library: "Ionicons" },
      { name: "water-outline", library: "MaterialCommunityIcons" },
      { name: "nutrition", library: "MaterialCommunityIcons" }, // no nutrition-outline
      { name: "leaf-outline", library: "Ionicons" },
    ],
  },
  {
    name: "Study",
    icons: [
      { name: "book-outline", library: "Ionicons" },
      { name: "school-outline", library: "MaterialCommunityIcons" }, // not in Ionicons
      { name: "edit-3", library: "Feather" }, // pencil alternative
      { name: "file-text", library: "Feather" },
      { name: "clipboard-text-outline", library: "MaterialCommunityIcons" }, // clipboard-outline doesn't exist
      { name: "calculator", library: "Feather" },
      { name: "lightbulb-on-outline", library: "MaterialCommunityIcons" },
      { name: "brain", library: "MaterialCommunityIcons" },
      { name: "laptop", library: "Feather" },
    ],
  },
  {
    name: "Finance",
    icons: [
      { name: "wallet-outline", library: "MaterialCommunityIcons" }, // Ionicons version missing
      { name: "credit-card-outline", library: "MaterialCommunityIcons" },
      { name: "dollar-sign", library: "Feather" },
      { name: "bar-chart-2", library: "Feather" },
      { name: "chart-pie", library: "MaterialCommunityIcons" }, // pie-chart-outline missing
      { name: "shopping-cart", library: "Feather" },
      { name: "cash", library: "MaterialCommunityIcons" }, // no cash-outline
      { name: "trending-up", library: "Feather" },
      { name: "receipt-outline", library: "MaterialCommunityIcons" },
    ],
  },
];
