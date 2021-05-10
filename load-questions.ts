import csv from "csv-parser";
import fs from "fs";
import "reflect-metadata";
import { PrismaClient } from "@prisma/client";

//const csv = require('csv-parser')
const results: string[] = [];

fs.createReadStream(__dirname + "/resources/base_questions.csv")
  .pipe(csv())
  .on("data", (data) => results.push(data))
  .on("end", () => {
    //console.log(results); // see results
  });

const prisma = new PrismaClient();

async function main() {
  // remove previous questions
  const deleteQuestions = await prisma.question.deleteMany({});

  for (var i = 0; i < results.length; i++) {
    //console.log(results[i]);
    //question.text = Object.values(results[i]).toString();
    const question = await prisma.question.create({
      data: {
        text: Object.values(results[i]).toString(),
      },
    });
  }

  //const addingQuestions = await prisma.question.createMany({
  //  data: [{ results[0] }, { text: results[1].toString() }],
  //});

  console.log("Loaded questions:");
  const allQuestions = await prisma.question.findMany();
  console.log(allQuestions);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
