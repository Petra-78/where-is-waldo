import { prisma } from "./lib/prisma.js";

async function main() {
  await prisma.$executeRawUnsafe(
    `TRUNCATE TABLE "Characters" RESTART IDENTITY CASCADE`,
    `TRUNCATE TABLE "Game" RESTART IDENTITY CASCADE`,
    `TRUNCATE TABLE "FoundCharacter" RESTART IDENTITY CASCADE`,
  );

  const character = await prisma.characters.createMany({
    data: [
      { name: "Mary", xMin: 0.24, xMax: 0.27, yMin: 0.05, yMax: 0.08 },
      { name: "Bob", xMin: 0.36, xMax: 0.39, yMin: 0.04, yMax: 0.07 },
      { name: "Stewart", xMin: 0.35, xMax: 0.38, yMin: 0.14, yMax: 0.18 },
      { name: "Vilma", xMin: 0.66, xMax: 0.69, yMin: 0.33, yMax: 0.36 },
      { name: "KenuGuy", xMin: 0.78, xMax: 0.82, yMin: 0.79, yMax: 0.82 },
      { name: "Musician", xMin: 0.47, xMax: 0.51, yMin: 0.55, yMax: 0.59 },
      { name: "Owl", xMin: 0.37, xMax: 0.44, yMin: 0.56, yMax: 0.58 },
      { name: "Dumbledore", xMin: 0.67, xMax: 0.71, yMin: 0.23, yMax: 0.26 },
      { name: "Gary", xMin: 0.66, xMax: 0.71, yMin: 0.59, yMax: 0.62 },
      { name: "Alex", xMin: 0.05, xMax: 0.08, yMin: 0.92, yMax: 0.96 },
      { name: "Henry", xMin: 0.34, xMax: 0.37, yMin: 0.27, yMax: 0.29 },
      { name: "Sharon", xMin: 0.85, xMax: 0.89, yMin: 0.43, yMax: 0.45 },
      { name: "Sarah", xMin: 0.01, xMax: 0.04, yMin: 0.62, yMax: 0.65 },
      { name: "Miles", xMin: 0.33, xMax: 0.36, yMin: 0.37, yMax: 0.41 },
      { name: "Monica", xMin: 0.52, xMax: 0.56, yMin: 0.04, yMax: 0.07 },
      { name: "Noah", xMin: 0.91, xMax: 0.96, yMin: 0.53, yMax: 0.56 },
      { name: "Charlotte", xMin: 0.33, xMax: 0.36, yMin: 0.76, yMax: 0.79 },
      { name: "Edward", xMin: 0.21, xMax: 0.25, yMin: 0.44, yMax: 0.47 },
      { name: "Gigi", xMin: 0.19, xMax: 0.23, yMin: 0.91, yMax: 0.93 },
      { name: "Couple", xMin: 0.44, xMax: 0.49, yMin: 0.61, yMax: 0.65 },
      { name: "Ivan", xMin: 0.18, xMax: 0.21, yMin: 0.27, yMax: 0.3 },
      { name: "Monkey", xMin: 0.62, xMax: 0.67, yMin: 0.67, yMax: 0.7 },
      { name: "Eepy", xMin: 0.72, xMax: 0.77, yMin: 0.63, yMax: 0.65 },
      { name: "Hungy", xMin: 0.01, xMax: 0.04, yMin: 0.28, yMax: 0.3 },
      { name: "Goat", xMin: 0.23, xMax: 0.27, yMin: 0.18, yMax: 0.21 },
      { name: "Cat", xMin: 0.53, xMax: 0.56, yMin: 0.52, yMax: 0.54 },
      { name: "Turtle", xMin: 0.13, xMax: 0.17, yMin: 0.92, yMax: 0.94 },
      { name: "Violent Squid", xMin: 0.24, xMax: 0.28, yMin: 0.75, yMax: 0.79 },
      { name: "Little Red", xMin: 0.92, xMax: 0.96, yMin: 0.0, yMax: 0.03 },
      { name: "Raccoon", xMin: 0.46, xMax: 0.49, yMin: 0.28, yMax: 0.31 },
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
