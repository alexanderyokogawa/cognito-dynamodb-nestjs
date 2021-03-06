import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { DiagnosisService } from './diagnosis.service';
import { CreateDiagnosisDto } from './dto/create-diagnosis.dto';
import { UpdateDiagnosisDto } from './dto/update-diagnosis.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('diagnosis')
@UseGuards(JwtAuthGuard)
export class DiagnosisController {
  constructor(private readonly diagnosisService: DiagnosisService) {}

  @Post()
  create(@Body() createDiagnosisDto: CreateDiagnosisDto) {
    return this.diagnosisService.create(createDiagnosisDto);
  }

  @Get()
  findAll() {
    return this.diagnosisService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.diagnosisService.findById(id);
  }

  @Post('/findin')
  findInId(@Body() groupId: Record<string, any>) {
    return this.diagnosisService.findInId(groupId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDiagnosisDto: UpdateDiagnosisDto,
  ) {
    return this.diagnosisService.update(id, updateDiagnosisDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.diagnosisService.remove(id);
  }
}
