"use client";

import { useUserPosts } from "@/server/queries/postQueries";
import { Loader2 } from "lucide-react";
import PostItem from "../post/PostItem";
import { useUserById } from "@/server/queries/userQueries";

interface Props {
  userId: string;
  page: string;
}

const UserProfile = ({ userId, page }: Props) => {
  const limit = 8;
  const pageNumber = +page - 1 || 0;
  const { data: userPosts, isLoading } = useUserPosts({
    limit,
    page: pageNumber,
    userId,
  });
  const { data: user } = useUserById(userId);

  if (isLoading) {
    return (
      <div className="flex mt-10 mx-auto w-full">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!userPosts) {
    return (
      <div className="flex mt-10 mx-auto w-full">
        <h3 className="text-3xl font-semibold">No Posts Found!</h3>
      </div>
    );
  }

  return (
    <div className="flex flex-col mx-auto w-full">
      <h1 className="text-3xl font-bold">{user?.name},Posts</h1>

      <div className="flex gap-5 flex-wrap mt-8">
        {userPosts?.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};
export default UserProfile;
