import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
class LabelGroup {
  @Field({ nullable: true })
  es_mx?: string;
  @Field({ nullable: true })
  pt_br?: string;
  @Field({ nullable: true })
  en_us?: string;
}

@ObjectType()
export class Diagnosis {
  @Field()
  id: string;
  @Field({ nullable: true })
  group: string;
  @Field({ nullable: true })
  kind: string;
  @Field((type) => LabelGroup, { nullable: true })
  label?: LabelGroup;
  @Field({ nullable: true })
  createdAt?: string;
  @Field({ nullable: true })
  updatedAt?: string;
}
