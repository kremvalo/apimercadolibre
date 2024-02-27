import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/api/items')
  async getListItems(
    @Query('limit') limit: number, 
    @Query('q') query: string
  ): Promise<any> {
    try {
      const result = await this.appService.getListItems(limit, query);
      return result;
    } catch (error) {
      return { error: error };
    }
  }

  @Get('/api/items/:idItem')
  async getItem(
    @Param('idItem') idItem: string, 
  ): Promise<any> {
    try {
      const result = await this.appService.getItem(idItem);
      return result;
    } catch (error) {
      return { error: error };
    }
  }
}
