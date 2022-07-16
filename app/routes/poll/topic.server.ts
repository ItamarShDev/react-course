import { prisma } from "~/db.server";

export function getTopics() {
  return prisma.topic.findMany();
}

export function addTopicToUser(userId: number, topicId: string) {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      topics: {
        connect: {
          id: topicId,
        },
      },
    },
  });
}
