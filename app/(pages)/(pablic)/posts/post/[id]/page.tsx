import PostDetails from "@/components/post/PostDetails";
import { auth } from "@/lib/auth";
import { User } from "@/server/db/schema/user";

interface Props {
  params: {
    id: string;
  };
}

const PostDetailsPage = async ({ params }: Props) => {
  const session = await auth();
  const user = session?.user as User;

  return <PostDetails postId={params.id} user={user} />;
};
export default PostDetailsPage;
