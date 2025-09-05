import { useState, useEffect } from "react";
import { Category } from "@/types/category";
import categoriesData from "@/assets/categoriesData";

const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    setCategories(categoriesData);
  }, []);
  return {};
};

export default useCategories;
