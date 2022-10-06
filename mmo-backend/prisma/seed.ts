import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.user.deleteMany()
  await prisma.post.deleteMany()

  console.log('Seeding...')

  const user1 = await prisma.user.create({
    data: {
      username: 'lisa@simpson.com',
      firstname: 'Lisa',
      lastname: 'Simpson',
      password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
      posts: {
        create: {
          title: 'Join us for Prisma Day 2019 in Berlin',
          content: 'https://www.prisma.io/day/',
          published: true,
        },
      },
    },
  })
  const user2 = await prisma.user.create({
    data: {
      username: 'bart@simpson.com',
      firstname: 'Bart',
      lastname: 'Simpson',
      password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
      posts: {
        create: [
          {
            title: 'Subscribe to GraphQL Weekly for community news',
            content: 'https://graphqlweekly.com/',
            published: true,
          },
          {
            title: 'Follow Prisma on Twitter',
            content: 'https://twitter.com/prisma',
            published: false,
          },
        ],
      },
    },
  })

  const user3 = await prisma.user.create({
    data: {
      username: 'bangvc@simpson.com',
      firstname: 'bang',
      lastname: 'vu',
      password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
      posts: {
        create: [
          {
            title: 'zzzzzzzzzzzzzzzzzzzzzzzzzzzzzz',
            content: 'https://graphqlweekly.com/',
            published: true,
          },
          {
            title: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxx',
            content: 'https://twitter.com/prisma',
            published: false,
          },
          {
            title: 'zzzzzzzzzzzzzzzzzzzzzzzzzzzzzz',
            content: 'https://graphqlweekly.com/',
            published: true,
          },
          {
            title: 'lllllllllllllllllllllll',
            content: 'https://twitter.com/prisma',
            published: false,
          },
          {
            title: 'bbbbbbbbbbbbbbbbbbbbbbbbbb',
            content: 'https://graphqlweekly.com/',
            published: true,
          },
          {
            title: 'kkkkkkkkkkkkkkkkkkkkkkkk',
            content: 'https://twitter.com/prisma',
            published: false,
          },
          {
            title: 'gggggggggggggggggggggggggg',
            content: 'https://graphqlweekly.com/',
            published: true,
          },
          {
            title: 'yyyyyyyyyyyyyyyyyyyyyyyyyyyyyy',
            content: 'https://twitter.com/prisma',
            published: false,
          },
        ],
      },
    },
  })

  console.log({ user1, user2, user3 })
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
