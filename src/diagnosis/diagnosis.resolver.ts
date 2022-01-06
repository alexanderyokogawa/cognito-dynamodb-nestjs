import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Diagnosis } from './entities/diagnosis.entity';
import { DiagnosisService } from './diagnosis.service';
import { GetInDiagnosisDto } from './dto/get-in-diagnosis.dto';
import { CreateDiagnosisInput } from './dto/create-diagnosis-input.dto';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Diagnosis)
@UseGuards(GqlAuthGuard)
export class DiagnosisResolver {
  constructor(private diagnosisService: DiagnosisService) {}

  @Query(() => [Diagnosis])
  async diagnosis(): Promise<Diagnosis[]> {
    const diagnosisReturn = await this.diagnosisService.findAll();

    return diagnosisReturn?.Items;
  }

  @Query(() => Diagnosis)
  async diagnostic(@Args('id') id: string): Promise<Diagnosis> {
    return await this.diagnosisService.findById(id);
  }

  @Query(() => [Diagnosis])
  async diagnosisIdIn(
    @Args('groupId', { type: () => [String] }) groupId: GetInDiagnosisDto,
  ) {
    const diagnosisReturn = await this.diagnosisService.findInId({
      items: groupId,
    });

    return diagnosisReturn?.Items;
  }

  @Mutation(() => Diagnosis)
  async createDiagnostic(
    @Args('createDiagnosisInput')
    createDiagnosisInput: CreateDiagnosisInput,
  ) {
    return this.diagnosisService.create(createDiagnosisInput);
  }
}
