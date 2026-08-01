import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';
dotenv.config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const data = JSON.parse(fs.readFileSync('dump.json', 'utf-8'));

  console.log('Migrating users...');
  for (const user of data.users) {
    await prisma.user.create({
      data: {
        id: user.id,
        email: user.email,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        role: user.role,
        cvUrl: user.cvUrl,
        createdAt: new Date(user.createdAt),
        updatedAt: new Date(user.updatedAt),
      }
    });
  }
  console.log(`Migrated ${data.users.length} users.`);

  console.log('Migrating jobs...');
  for (const job of data.jobs) {
    await prisma.job.create({
      data: {
        id: job.id,
        title: job.title,
        titleDe: job.titleDe,
        sector: job.sector,
        location: job.location,
        type: job.type,
        description: job.description,
        descriptionDe: job.descriptionDe,
        shortDesc: job.shortDesc,
        shortDescDe: job.shortDescDe,
        isActive: job.isActive === 1,
        imageUrl: job.imageUrl,
        createdAt: new Date(job.createdAt),
        updatedAt: new Date(job.updatedAt),
      }
    });
  }
  console.log(`Migrated ${data.jobs.length} jobs.`);

  console.log('Migrating applications...');
  for (const app of data.applications) {
    await prisma.application.create({
      data: {
        id: app.id,
        status: app.status,
        coverNote: app.coverNote,
        userId: app.userId,
        jobId: app.jobId,
        createdAt: new Date(app.createdAt),
        updatedAt: new Date(app.updatedAt),
      }
    });
  }
  console.log(`Migrated ${data.applications.length} applications.`);

  console.log('Migration completed successfully!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
