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
import { ctx, QuestionResolver } from "./src/resolvers/QuestionResolver";
//import { context } from "./context";

//const prisma = new PrismaClient();
/*const results: string[] = [];

fs.createReadStream(__dirname + "/resources/base_questions.csv")
  .pipe(csv())
  .on("data", (data) => results.push(data))
  .on("end", () => {
    //console.log(results); // see results
  });*/

async function main() {
  //const allQuestions = await prisma.question.findMany();
  //console.log(allQuestions);

  const schema = await buildSchema({
    resolvers: [QuestionResolver],
  });

  const server = new ApolloServer({
    schema: schema,
    context: ctx,
  });
  console.log("🚀 Server ready at: https://localhost:4000");
  return server.listen(4000);
}

main().catch((e) => {
  throw e;
});
