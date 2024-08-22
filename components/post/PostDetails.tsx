"use client";

import {
  usePostById,
  useRelatedPostByCategoryId,
} from "@/server/queries/postQueries";
import { Loader2 } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import Link from "next/link";
import parser from "html-react-parser";
import PostItem from "./PostItem";
import { Card, CardContent, CardHeader } from "../ui/card";
import UserAvatar from "../UserAvatar";
import { User } from "@/server/db/schema/user";
import CommentReplyForm from "../comment/CommentReplyForm";

interface Props {
  postId: string;
  user: User | undefined;
}

const PostDetails = ({ postId, user }: Props) => {
  const { data: postData, isLoading: isLoadingPost } = usePostById(postId);
  const { data: relatedPostData, isLoading: isLoadingRelated } =
    useRelatedPostByCategoryId(postData?.categoryId);

  if (isLoadingPost || isLoadingRelated) {
    return (
      <div className="flex w-full justify-center mt-10">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!postData) {
    return (
      <div className="flex w-full p-10 mt-10">
        <h1 className="font-semibold text-3xl">No post found</h1>
      </div>
    );
  }

  // console.log("post data", postData);
  // console.log("user PostDetails", user);

  return (
    <div className="flex flex-col gap-3 mb-10">
      {/* title */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold">{postData.title}</h1>
        <Link
          href={`/categories/${postData.categoryId}`}
          className="text-xl font-semibold text-amber-500"
        >
          {postData.category.name}
        </Link>
      </div>

      {/* avatar */}
      <UserAvatar user={postData.user} />

      {/* content */}
      <div className="max-w-5xl break-words text-justify mt-5">
        {parser(postData.content)}
      </div>

      {/* comments */}
      {postData.comments
        .filter((comment) => !comment.parentId)
        .map((comment) => (
          <Card key={comment.id} className="mt-8 p-4">
            {/* <CardHeader className="p-1">
              <UserAvatar user={comment.user} />
            </CardHeader> */}
            <CardContent className="">
              <div className="flex flex-col gap-2 border rounded p-4">
                <UserAvatar user={comment.user} />
                <p className="">{comment.content}</p>
                {user && user.id && (
                  <div className="ml-8">
                    <CommentReplyForm
                      userName={user.name}
                      defaultValues={{
                        postId: postData.id,
                        userId: user.id,
                        content: "",
                        parentId: null,
                      }}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

      {/* related posts */}
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold mt-8 text-amber-500">
          Related Posts
        </h3>
        <div className="flex gap-5 flex-wrap">
          {relatedPostData &&
            relatedPostData.map((post) => (
              <PostItem key={post.id} post={post} />
            ))}
        </div>
      </div>
    </div>
  );
};
export default PostDetails;
