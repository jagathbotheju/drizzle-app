import PostList from "@/components/post/PostList";

const PostsPage = () => {
  return (
    <div className="flex flex-col w-full gap-5 mx-auto">
      <h1 className="text-3xl font-semibold">All Posts</h1>

      <PostList />
    </div>
  );
};
export default PostsPage;
