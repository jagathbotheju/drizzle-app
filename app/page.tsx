import PostList from "@/components/post/PostList";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col w-full gap-5 mx-auto">
      <h1 className="text-3xl font-semibold">Latest Posts</h1>
      <PostList />

      <Link
        href="/posts?limit=10"
        className="flex gap-2 self-end cursor-pointer"
      >
        <p>more...</p>
        <ChevronRight />
      </Link>
    </div>
  );
}
