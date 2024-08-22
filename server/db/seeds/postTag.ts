import { DB, db } from "@/server/db";
import { postTag } from "@/server/db/schema";
import { PostTagsSchema } from "@/server/db/schema/postTag";
import { faker } from "@faker-js/faker";

const mock = async () => {
  const [postsData, tagsData] = await Promise.all([
    db.query.post.findMany(),
    db.query.tag.findMany(),
  ]);

  const randomPosts = faker.helpers.arrayElements(postsData);

  const data: PostTagsSchema[] = randomPosts.flatMap((post) => {
    const randomTags = faker.helpers.arrayElements(tagsData);
    return randomTags.map((tag) => ({ postId: post.id, tagId: tag.id }));
  });

  return data;
};

export async function seed(db: DB) {
  const insertData = await mock();
  await db.insert(postTag).values(insertData);
}
