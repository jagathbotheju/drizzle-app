import { useQuery } from "@tanstack/react-query";
import {
  getCategoryById,
  getPostsByCategoryId,
} from "../actions/categoryActions";

export const usePostsByCategoryId = (
  page: number,
  limit: number,
  categoryId: string
) => {
  return useQuery({
    queryKey: ["posts-by-category", page, limit, categoryId],
    queryFn: () => getPostsByCategoryId(page, limit, categoryId),
  });
};

export const useCategoryById = (categoryId: string) => {
  return useQuery({
    queryKey: ["category-by-id", categoryId],
    queryFn: () => getCategoryById(categoryId),
  });
};
