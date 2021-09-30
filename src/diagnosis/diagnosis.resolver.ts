import { Args, Query, Resolver } from '@nestjs/graphql';
import { Diagnosis } from './entities/diagnosis.entity';
import { DiagnosisService } from './diagnosis.service';
import { GetInDiagnosisDto } from './dto/get-in-diagnosis.dto';

@Resolver((of) => Diagnosis)
export class DiagnosisResolver {
  constructor(private diagnosisService: DiagnosisService) {}

  @Query((returns) => [Diagnosis])
  async diagnosis(): Promise<Diagnosis[]> {
    const diagnosisReturn = await this.diagnosisService.findAll();

    return diagnosisReturn?.Items;
  }

  @Query((returns) => Diagnosis)
  async diagnostic(@Args('id') id: string): Promise<Diagnosis> {
    return await this.diagnosisService.findById(id);
  }

  @Query((returns) => [Diagnosis])
  async diagnosisIdIn(
    @Args('groupId', { type: () => [String] }) groupId: GetInDiagnosisDto,
  ) {
    const diagnosisReturn = await this.diagnosisService.findInId({
      items: groupId,
    });

    return diagnosisReturn?.Items;
  }
}
