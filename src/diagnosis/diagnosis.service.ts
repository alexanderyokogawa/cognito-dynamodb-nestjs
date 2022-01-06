import { Injectable } from '@nestjs/common';
import { CreateDiagnosisDto } from './dto/create-diagnosis.dto';
import { UpdateDiagnosisDto } from './dto/update-diagnosis.dto';
import { DiagnosisRepository } from './repository/diagnosis.repository';
import SQS from '../common/connectors/sqs';

const { env } = process;

@Injectable()
export class DiagnosisService {
  constructor(
    private readonly diagnosisRepository: DiagnosisRepository,
    private queueUrl: string,
  ) {
    this.queueUrl = `${env.QUEUE_URL}${env.QUEUE_TW_SQS}`;
  }

  async create(createDiagnosisDto: CreateDiagnosisDto) {
    try {
      const diagnosis = await this.diagnosisRepository.create(
        createDiagnosisDto,
      );
      await SQS.sendToQueue(diagnosis, this.queueUrl);
      return diagnosis;
    } catch (error) {
      throw new Error(error.message);
    }
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
