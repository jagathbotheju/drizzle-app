import { useQuery } from "@tanstack/react-query";
import {
  getAllPosts,
  getPostById,
  getPosts,
  getPostsCount,
  getRelatedPostsByCategoryId,
  getUserPosts,
  getUserPostsCount,
} from "../actions/postActions";

export const useUserPosts = ({
  limit,
  page,
  userId,
}: {
  limit: number;
  page: number;
  userId: string;
}) => {
  return useQuery({
    queryKey: ["user-posts", limit, page, userId],
    queryFn: () =>
      getUserPosts({
        limit,
        page,
        userId,
      }),
  });
};

export const usePostUserCount = (userId: string) => {
  return useQuery({
    queryKey: ["post-user-count", userId],
    queryFn: () => getUserPostsCount(userId),
  });
};

export const usePostsCount = (searchTerm?: string) => {
  return useQuery({
    queryKey: ["posts-count", searchTerm],
    queryFn: () => getPostsCount(searchTerm),
  });
};

export const useRelatedPostByCategoryId = (categoryId?: string) => {
  return useQuery({
    queryKey: ["related-posts", categoryId],
    queryFn: () => getRelatedPostsByCategoryId(categoryId),
    enabled: !!categoryId,
  });
};

export const usePostById = (postId: string) => {
  return useQuery({
    queryKey: ["post-id", postId],
    queryFn: () => getPostById(postId),
  });
};

export const usePosts = ({
  page,
  limit,
  searchTerm,
}: {
  page: number;
  limit: number;
  searchTerm?: string;
}) => {
  return useQuery({
    queryKey: ["posts", page, limit],
    queryFn: () =>
      getPosts({
        page,
        limit,
      }),
  });
};
