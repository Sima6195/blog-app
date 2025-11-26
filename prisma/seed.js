const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
 await prisma.posts.deleteMany();
 await prisma.user.deleteMany();

 const passwordAdminHash = await bcrypt.hash('sima@123', 10);
 const passwordHash = await bcrypt.hash('dineo@123', 10);

 await prisma.user.create({
   data: {

     name: 'Admin User',
     email: 'admin@example.com',
     password: passwordAdminHash,
     role: 'ADMIN',
     Posts: {
       create: [{ title: 'Me and God', content:" When I wrote this code Only me and God knew, now Only God knows" }]
     }
   }
 });


 await prisma.user.create({
   data: {
     name: 'Zaza',
     email: 'zaza@ext.com',
     password: passwordHash,
     role: 'USER',
     Posts: {
       create: [{ title: 'Only God Knows', content: 'When I was doing this only God knew' }]
     }
   }
 });

 console.log('Seed complete');
}

main()
 .catch(e => { console.error(e); process.exit(1); })
 .finally(async () => { await prisma.$disconnect(); });