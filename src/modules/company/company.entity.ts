import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Company {
  @Field()
  id: string;

  @Field()
  createdAt: string;

  @Field()
  name: string;

  @Field()
  parentId: string;

  @Field((type) => Float, { nullable: true })
  cost?: number;

  @Field((type) => [Company])
  children?: Company[];
}
