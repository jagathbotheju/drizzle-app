"use client";
import { usePosts, usePostsCount } from "@/server/queries/postQueries";
import { Loader2 } from "lucide-react";
import PostItem from "./PostItem";
import { useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
  page?: number;
  limit?: number;
  searchTerm?: string;
}

const PostList = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? 0;
  const limit = searchParams.get("limit") ?? 4;
  const searchTerm = searchParams.get("searchTerm") ?? "";
  // const [page, setPage] = useState(searchParams.get("page") ?? 0);

  const { data: posts, isLoading } = usePosts({ page: +page, limit: +limit });
  const { data: postsCount } = usePostsCount(searchTerm);

  console.log("page", page);

  if (isLoading) {
    <div className="flex items-center justify-center">
      <Loader2 className="h-6 w-6 animate-spin" />
    </div>;
  }

  if (!posts) {
    <div className="flex items-center justify-center">
      <h1 className="text-3xl font-semibold text-center">No Posts Found</h1>
    </div>;
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex gap-5 flex-wrap">
        {posts?.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>

      <div className="flex mt-8 self-end">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>

            <PaginationItem>
              <PaginationLink href="#">{+page + 1}</PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>

            <PaginationItem>
              <PaginationNext href={`/posts/?limit=10&page=${+page + 1}`} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};
export default PostList;
