import { prisma } from "./lib/prisma.js";

async function main() {
  await prisma.$executeRawUnsafe(
    `TRUNCATE TABLE "Characters" RESTART IDENTITY CASCADE`,
  );

  const character = await prisma.characters.createMany({
    data: [
      { name: "Mary", xMin: 0.24, xMax: 0.27, yMin: 0.05, yMax: 0.08 },
      { name: "Bob", xMin: 0.36, xMax: 0.39, yMin: 0.04, yMax: 0.07 },
      { name: "Stewart", xMin: 0.35, xMax: 0.38, yMin: 0.14, yMax: 0.18 },
    ],
  });
  console.log("Created character:", character);

  const allCharacters = await prisma.characters.findMany();
  console.log("All characters:", JSON.stringify(allCharacters, null, 2));
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
