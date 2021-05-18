import csv from "csv-parser";
import fs from "fs";
import "reflect-metadata";
import { PrismaClient } from "@prisma/client";

//const csv = require('csv-parser')
const results: string[] = [];

fs.createReadStream(__dirname + "/resources/i18n_Questions.csv")
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
    //console.log(results[i]["Français"]);
    //question.text = Object.values(results[i]).toString();

    const questions = await prisma.question.createMany({
      data: [
        {
          question_id: i,
          lang: "fr",
          text: results[i]["Français"],
        },
        {
          question_id: i,
          lang: "en",
          text: results[i]["English"],
        },
        {
          question_id: i,
          lang: "sp",
          text: results[i]["Español"],
        },
        {
          question_id: i,
          lang: "de",
          text: results[i]["Deutsch"],
        },
      ],
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
