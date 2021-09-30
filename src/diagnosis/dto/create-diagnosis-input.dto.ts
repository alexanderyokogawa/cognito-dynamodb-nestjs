import { Field, InputType } from '@nestjs/graphql';

@InputType()
class LabelGroupInput {
  @Field({ nullable: true })
  es_mx?: string;
  @Field({ nullable: true })
  pt_br?: string;
  @Field({ nullable: true })
  en_us?: string;
}

@InputType()
export class CreateDiagnosisInput {
  @Field({ nullable: true })
  group: string;
  @Field({ nullable: true })
  kind: string;
  @Field((type) => LabelGroupInput, { nullable: true })
  label?: LabelGroupInput;
  @Field({ nullable: true })
  createdAt?: string;
  @Field({ nullable: true })
  updatedAt?: string;
}
