const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const prisma = new PrismaClient()

async function main() {
  const hashed = await bcrypt.hash('Admin@123456', 12)

  const admin = await prisma.user.upsert({
    where:  { email: 'admin@taskflow.dev' },
    update: {},
    create: { email: 'admin@taskflow.dev', password: hashed, name: 'Admin', role: 'ADMIN' },
  })

  const project = await prisma.project.upsert({
    where:  { slug: 'demo-project' },
    update: {},
    create: {
      name: 'Demo Project', slug: 'demo-project',
      description: 'Dự án demo', ownerId: admin.id,
    },
  })

  await prisma.task.createMany({
    skipDuplicates: true,
    data: [
      { title: 'Setup backend', status: 'DONE',        priority: 'HIGH',   projectId: project.id, creatorId: admin.id },
      { title: 'Setup Docker',  status: 'IN_PROGRESS', priority: 'HIGH',   projectId: project.id, creatorId: admin.id },
      { title: 'Setup K3s',     status: 'TODO',        priority: 'MEDIUM', projectId: project.id, creatorId: admin.id },
    ],
  })

  console.log('Seed done:', admin.email)
}

main().catch(console.error).finally(() => prisma.$disconnect())
