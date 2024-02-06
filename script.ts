import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const post = await prisma.post.create({
    data: {
      title: 'Hello, World!',
    },
  });
  const user = await prisma.user.create({
    data: {
      postId: post.id,
    },
  });
  const users = await prisma.user.findMany({
    include: {
      post: true,
    },
  });
  console.log(users);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
