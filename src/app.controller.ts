import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): { message: string; version: string } {
    return {
      message: 'checklist api',
      version: '0.0.1',
    };
  }
}
