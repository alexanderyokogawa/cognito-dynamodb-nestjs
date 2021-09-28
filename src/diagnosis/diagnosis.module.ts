import { Module } from '@nestjs/common';
import { DiagnosisService } from './diagnosis.service';
import { DiagnosisController } from './diagnosis.controller';
import { DiagnosisRepository } from './repository/diagnosis.repository';

@Module({
  controllers: [DiagnosisController],
  providers: [DiagnosisService, DiagnosisRepository],
})
export class DiagnosisModule {}
