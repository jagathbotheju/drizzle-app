"use client";

import { usePosts, usePostsCount } from "@/server/queries/postQueries";
import { Loader2 } from "lucide-react";

interface Props {
  page: string;
  searchTerm: string;
}

const Search = ({ page, searchTerm }: Props) => {
  const limit = 8;
  const pageNumber = +page - 1 || 0;

  const { data: posts, isLoading } = usePosts({
    page: pageNumber,
    limit,
    searchTerm,
  });
  const { data: postsCount } = usePostsCount(searchTerm);

  if (isLoading) {
    return (
      <div className="flex mx-auto w-full mt-10">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!postsCount) {
    return (
      <div className="flex mx-auto w-full mt-10">
        <h1 className="text-3xl font-semibold">No posts found!</h1>
      </div>
    );
  }

  return <div className="flex mx-auto w-full">Search</div>;
};
export default Search;
