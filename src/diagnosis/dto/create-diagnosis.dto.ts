import { Diagnosis } from '../entities/diagnosis.entity';
import { OmitType } from '@nestjs/mapped-types';

export class CreateDiagnosisDto extends OmitType(Diagnosis, ['id']) {}
