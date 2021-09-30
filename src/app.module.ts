import { Module } from '@nestjs/common';
import { DiagnosisModule } from './diagnosis/diagnosis.module';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'src/graphql/schema.gql',
      debug: true,
      playground: true,
    }),
    DiagnosisModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
