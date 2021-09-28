import { Injectable } from '@nestjs/common';
import { CreateDiagnosisDto } from './dto/create-diagnosis.dto';
import { UpdateDiagnosisDto } from './dto/update-diagnosis.dto';
import { DiagnosisRepository } from './repository/diagnosis.repository';

@Injectable()
export class DiagnosisService {
  constructor(private readonly diagnosisRepository: DiagnosisRepository) {}

  async create(createDiagnosisDto: CreateDiagnosisDto) {
    return this.diagnosisRepository.create(createDiagnosisDto);
  }

  async findAll() {
    return this.diagnosisRepository.findAll();
  }

  async findById(id: string) {
    return this.diagnosisRepository.findById(id);
  }

  async findInId(groupId: Record<string, any>) {
    return this.diagnosisRepository.findInId(groupId);
  }

  async update(id: string, updateDiagnosisDto: UpdateDiagnosisDto) {
    return this.diagnosisRepository.update(id, updateDiagnosisDto);
  }

  async remove(id: string) {
    return this.diagnosisRepository.remove(id);
  }
}
