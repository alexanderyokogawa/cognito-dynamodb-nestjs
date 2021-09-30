import { Args, Query, Resolver } from '@nestjs/graphql';
import { Diagnosis } from './entities/diagnosis.entity';
import { DiagnosisService } from './diagnosis.service';

@Resolver((of) => Diagnosis)
export class DiagnosisResolver {
  constructor(private diagnosisService: DiagnosisService) {}

  @Query((returns) => [Diagnosis])
  async diagnosis(): Promise<Diagnosis[]> {
    const diagnosisReturn = await this.diagnosisService.findAll();

    console.log(diagnosisReturn);
    return diagnosisReturn?.Items;
  }

  @Query((returns) => Diagnosis)
  async diagnostic(@Args('id') id: string): Promise<Diagnosis> {
    return await this.diagnosisService.findById(id);
  }
}
