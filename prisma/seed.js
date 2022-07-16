const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function seed() {
  await prisma.admin.create({
    data: {
      email: "itamar@imubit.com",
      password: { create: { hash: await bcrypt.hash("123456", 10) } },
    },
  });
  await prisma.topic.create({
    data: {
      title: "React topic 1",
      body: "Hello, world!",
    },
  });
  await prisma.topic.create({
    data: {
      title: "React topic 2",
      body: "Hello, world!",
    },
  });
  await prisma.topic.create({
    data: {
      title: "React topic 3",
      body: "Hello, world!",
    },
  });
  await prisma.topic.create({
    data: {
      title: "React topic 4",
      body: "Hello, world!",
    },
  });
  await prisma.topic.create({
    data: {
      title: "React topic 5",
      body: "Hello, world!",
    },
  });
  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
