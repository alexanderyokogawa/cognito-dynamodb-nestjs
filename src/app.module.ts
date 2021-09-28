import { Module } from '@nestjs/common';
import { DiagnosisModule } from './diagnosis/diagnosis.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DiagnosisModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
