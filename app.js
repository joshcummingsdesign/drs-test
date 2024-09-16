const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getUserByEmail(email) {
  const user = await prisma.user.findFirst({
    where: {
      email: email
    }
  });
  return user;
}
