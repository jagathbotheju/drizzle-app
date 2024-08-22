import { DB } from "@/server/db";
import { category } from "@/server/db/schema";
import { CategorySchema } from "@/server/db/schema/category";

const mock: CategorySchema[] = [
  {
    name: "Node.js",
  },
  {
    name: "React",
  },
  {
    name: "Python",
  },
  {
    name: "Javascript",
  },
  {
    name: "Algorithms",
  },
  {
    name: "Devops",
  },
  {
    name: "APIs",
  },
];

export async function seed(db: DB) {
  await db.insert(category).values(mock);
}
