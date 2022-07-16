import invariant from "tiny-invariant";
import { prisma } from "~/db.server";

export async function isUserExist(email?: string) {
  invariant(email, "email is required");
  return (
    (await prisma.user.count({
      where: {
        email,
      },
    })) > 0
  );
}

export function createUser(email: string) {
  return prisma.user.create({
    data: {
      email,
    },
  });
}

export function getUser(email: string) {
  return prisma.user.findFirst({
    where: {
      email,
    },
    include: { topics: true },
  });
}
export function getUsers() {
  return prisma.user.findMany({ include: { topics: true } });
}
export function createOrUpdateUserWithTopics(
  email: string,
  topicIds: string[]
) {
  return prisma.user.upsert({
    where: {
      email,
    },
    update: { topics: { set: topicIds.map((topic) => ({ id: topic })) } },
    create: {
      email,
      topics: { connect: topicIds.map((topic) => ({ id: topic })) },
    },
  });
}
