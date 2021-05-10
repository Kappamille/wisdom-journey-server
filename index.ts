import { PrismaClient } from "@prisma/client";
import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import {
  ObjectType,
  Field,
  ID,
  buildSchema,
  Resolver,
  Arg,
  Query,
} from "type-graphql";
import fs from "fs";
import csv from "csv-parser";
import { QuestionResolver } from "./src/resolvers/QuestionResolver";

const prisma = new PrismaClient();
const results: string[] = [];

fs.createReadStream(__dirname + "/resources/base_questions.csv")
  .pipe(csv())
  .on("data", (data) => results.push(data))
  .on("end", () => {
    //console.log(results); // see results
  });

async function main() {
  //const allQuestions = await prisma.question.findMany();
  //console.log(allQuestions);

  const schema = await buildSchema({
    resolvers: [QuestionResolver],
  });

  const server = new ApolloServer({ schema });

  return server.listen(4000);
}

main().catch((e) => {
  throw e;
});
