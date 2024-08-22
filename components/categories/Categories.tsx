"use client";
import {
  useCategoryById,
  usePostsByCategoryId,
} from "@/server/queries/categoryQueries";
import { Loader2 } from "lucide-react";
import PostItem from "../post/PostItem";
import { Pagination } from "../ui/pagination";

interface Props {
  categoryId: string;
  page: string;
}

const Categories = ({ categoryId, page }: Props) => {
  const limit = 8;
  const pageNumber = +page - 1 || 0;
  const { data: categoryPosts, isLoading } = usePostsByCategoryId(
    pageNumber,
    limit,
    categoryId
  );
  const { data: category } = useCategoryById(categoryId);

  if (isLoading) {
    return (
      <div className="flex mx-auto mt-10 items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  if (!categoryPosts) {
    return (
      <div className="flex mx-auto mt-10 items-center justify-center">
        <h1 className="text-3xl font-semibold">
          No posts found for {category ? category.name : "unknown"}
        </h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-semibold">{category?.name}, posts</h1>

      <div className="flex gap-5 flex-wrap">
        {categoryPosts?.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>

      {/* pagination */}
    </div>
  );
};
export default Categories;
