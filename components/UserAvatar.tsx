import { User } from "@/server/db/schema/user";
import { Avatar, AvatarFallback } from "./ui/avatar";
import Link from "next/link";

interface Props {
  user: Pick<User, "name" | "email" | "id">;
}

const UserAvatar = ({ user }: Props) => {
  return (
    <Link
      href={`/posts/user/${user.id}`}
      className="flex items-center gap-4 my-5"
    >
      <Avatar>
        <AvatarFallback className="font-semibold">
          {user.name.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-1 text-xs">
        <p>{user.name}</p>
        <p>{user.email}</p>
      </div>
    </Link>
  );
};
export default UserAvatar;
