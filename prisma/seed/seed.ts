import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.contact.createMany({
    data: [
      {
        id: 1,
        email: "lorraine@hillvalley.edu",
        phoneNumber: "123456",
        linkedId: null,
        linkPrecedence: "primary",
        createdAt: new Date("2023-04-01T00:00:00Z"),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: 2,
        email: "mcfly@hillvalley.edu",
        phoneNumber: "123456",
        linkedId: 1,
        linkPrecedence: "secondary",
        createdAt: new Date("2023-04-10T00:00:00Z"),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: 3,
        email: "doc@hillvalley.edu",
        phoneNumber: "987654",
        linkedId: null,
        linkPrecedence: "primary",
        createdAt: new Date("2023-04-15T00:00:00Z"),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: 4,
        email: "mcfly@hillvalley.edu",
        phoneNumber: null,
        linkedId: 1,
        linkPrecedence: "secondary",
        createdAt: new Date("2023-04-20T00:00:00Z"),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: 5,
        email: "calvin@hillvalley.edu",
        phoneNumber: "987654",
        linkedId: 3,
        linkPrecedence: "secondary",
        createdAt: new Date("2023-04-25T00:00:00Z"),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: 6,
        email: null,
        phoneNumber: "123456",
        linkedId: 1,
        linkPrecedence: "secondary",
        createdAt: new Date("2023-04-27T00:00:00Z"),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: 7,
        email: "biff@hillvalley.edu",
        phoneNumber: "666666",
        linkedId: null,
        linkPrecedence: "primary",
        createdAt: new Date("2023-05-01T00:00:00Z"),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ],
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
