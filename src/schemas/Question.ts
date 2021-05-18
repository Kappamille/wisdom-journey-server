import { Field, ID, Int, ObjectType } from "type-graphql";

//  QuestionText(id: serial, qustion_id: integer, lang: string, text: string)

@ObjectType()
export class Question {
  @Field(() => ID)
  id: number;

  @Field(() => Int)
  question_id: number;

  @Field(() => String)
  lang: string;

  @Field(() => String)
  text: string;
}
