import { Module } from '@nestjs/common';
import { DiagnosisModule } from './diagnosis/diagnosis.module';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    AuthModule,
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
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
