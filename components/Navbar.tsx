import Image from "next/image";
import Link from "next/link";
import AuthButton from "./AuthButton";
import { auth } from "@/lib/auth";
import { User } from "@/server/db/schema/user";

const Navbar = async () => {
  const session = await auth();
  const user = session?.user as User;

  // console.log("user**************", user);

  return (
    <header className="container mx-auto max-w-7xl py-6">
      <nav>
        <ul className="flex justify-between items-center">
          <li>
            <Link href="/" className="relative flex gap-2 items-center">
              <h1 className="text-center bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-3xl font-bold text-transparent">
                My Blog
              </h1>
            </Link>
          </li>
          <li>
            <AuthButton user={user} />
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Navbar;
