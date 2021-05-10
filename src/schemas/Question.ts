import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Question {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  text: string;
}
