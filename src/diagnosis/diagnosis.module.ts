import { Module } from '@nestjs/common';
import { DiagnosisService } from './diagnosis.service';
import { DiagnosisController } from './diagnosis.controller';
import { DiagnosisRepository } from './repository/diagnosis.repository';
import { DiagnosisResolver } from './diagnosis.resolver';

@Module({
  controllers: [DiagnosisController],
  providers: [DiagnosisService, DiagnosisRepository, DiagnosisResolver],
})
export class DiagnosisModule {}
