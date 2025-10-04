const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  
  // Add seed data here if needed
  const user = await prisma.user.upsert({
    where: { email: 'admin@alazie.express' },
    update: {},
    create: {
      email: 'admin@alazie.express',
      name: 'Admin User',
    },
  });

  console.log('Seed data created:', user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
