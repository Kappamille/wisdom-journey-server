import { Arg, Query, Resolver } from "type-graphql";
import { PrismaClient } from "@prisma/client";
import { Question } from "../schemas/Question";
const prisma = new PrismaClient();

@Resolver()
export class QuestionResolver {
  @Query(() => String)
  hello() {
    return "world";
  }

  @Query(() => [Question])
  async questions() {
    return prisma.question.findMany();
  }

  @Query(() => Question)
  async question(@Arg("id") id: number) {
    return prisma.question.findUnique({ where: { id } });
  }

  @Query(() => [Question])
  async question_lang(@Arg("lang") lang: string) {
    return prisma.question.findMany({ where: { lang } });
  }

  //question_id
  @Query(() => [Question])
  async question_id(@Arg("question_id") question_id: number) {
    return prisma.question.findMany({ where: { question_id } });
  }
}
