import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  await prisma.todo.create({
    data: {
      title: "First todo",
      completed: false,
    },
  });

  await prisma.todo.create({
    data: {
      title: "Second todo",
      completed: false,
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
