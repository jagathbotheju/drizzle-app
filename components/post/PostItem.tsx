import { Post } from "@/server/db/schema/post";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";

interface Props {
  post: Post;
}

const PostItem = ({ post }: Props) => {
  return (
    <Link href={`/posts/post/${post.id}`}>
      <Card className="w-[300px] h-[150px]">
        <CardHeader>
          <CardTitle className="line-clamp-1">{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-2">{post.shortDescription}</p>
        </CardContent>
      </Card>
    </Link>
  );
};
export default PostItem;
