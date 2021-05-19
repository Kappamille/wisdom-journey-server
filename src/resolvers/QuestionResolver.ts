import {
  Arg,
  Query,
  Resolver,
  ObjectType,
  Field,
  ID,
  Int,
  FieldResolver,
  Ctx,
} from "type-graphql";
import { prisma, PrismaClient } from "@prisma/client";

@ObjectType()
export class Question {
  @Field(() => ID)
  id: number;

  @Field(() => [QuestionTranslation])
  translations: QuestionTranslation[];
}

@ObjectType()
export class QuestionTranslation {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  lang: string;

  @Field(() => String)
  translation: string;

  @Field(() => Int)
  questionId: number;
}

class QuestionManager {
  constructor(private prisma: PrismaClient) {}

  async allQuestions(): Promise<Question[]> {
    return await this.prisma.question.findMany({
      include: { translations: true },
    });
  }

  /*translations(): Promise<QuestionTranslation[]> {
    return this.prisma.questionText.findMany();
  }*/
}

interface Context {
  qm: QuestionManager;
}
export const ctx = { qm: new QuestionManager(new PrismaClient()) };

/*@Resolver()
export class QuestionResolver {
  @Query(() => [Question])
  async questions() {
    return ctx.prisma.question.findMany();
  }
}*/

//@FieldResolver(() => Question)
@Resolver()
export class QuestionResolver {
  @Query(() => [Question])
  async questions(@Ctx() ctx: Context): Promise<Question[]> {
    return await ctx.qm.allQuestions();
  }

  /*@Query(() => [Question])
  async translations(@Ctx() ctx: Context): Promise<QuestionTranslation[]> {
    return await ctx.qm.translations();
  }*/
}

/*   q: Question, @Arg('lang') lang: String


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
  
  @FieldResolver()
translations(@Root() q: Question, @Ctx() context: Context): Promise<QuestionText[]> {
    return context.prisma...
}
  */
