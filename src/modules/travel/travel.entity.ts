import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Travel {
  @Field()
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  employeeName: string;

  @Field()
  departure: string;

  @Field()
  destination: string;

  @Field((type) => Float)
  price: number;

  @Field()
  companyId: string;
}
