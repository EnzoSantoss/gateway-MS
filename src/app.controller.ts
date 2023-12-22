import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  createMessage(@Body() data: any) {
    this.appService.createMessage(data);
  }

  @Get()
  getMessages() {
    return this.appService.messages();
  }

  // @Get()
  // getProducts() {

  //   return this.appService.messages();
  // }
}
