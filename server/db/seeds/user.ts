import { DB } from "@/server/db";
import { user } from "@/server/db/schema";
import { UserSchema } from "@/server/db/schema/user";
import { faker } from "@faker-js/faker";

const mock = () => {
  const data: Omit<Extract<UserSchema, { mode: "signUp" }>, "mode">[] = [];

  for (let i = 0; i < 20; i++) {
    data.push({
      name: faker.person.fullName(),
      password: faker.internet.password({ memorable: true, length: 4 }),
      email: faker.internet.email(),
    });
  }

  return data;
};

export async function seed(db: DB) {
  await db.insert(user).values(mock());
}