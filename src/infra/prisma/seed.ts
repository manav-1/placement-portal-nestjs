import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function seed() {
  const email = 'manav81101@gmail.com';
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });
  const hashedPassword = await bcrypt.hash('manav123', 10);

  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name: 'Manav',
      userRole: 'SUPER_ADMIN',
      mobile: '8745007937',
    },
  });
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
