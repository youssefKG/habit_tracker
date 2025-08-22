import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Component, ComponentProps } from "react";

type IconName = ComponentProps<typeof MaterialIcons>["name"];

export type { IconName };
