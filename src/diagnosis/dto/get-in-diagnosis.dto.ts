import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class GetInDiagnosisDto {
  @Field(() => [String])
  groupId: string[];
}
