import { Controller, Get, Post,Inject, Provide,Body } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { AppDataSource } from '../db';
import { Circle } from '../entity/circle';
import { Repository } from 'typeorm';

@Provide()
@Controller('/api')
export class CircleController {
  private circleRepository: Repository<Circle>;

  @Inject()
  ctx: Context;

  @Get('/circles')
  async getCircles() {
    try {
      console.log('Received request for /api/circles');
      if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
      }
      this.circleRepository = AppDataSource.getRepository(Circle);

      const circles = await this.circleRepository.find();
      console.log('Fetched circles:', circles);
      this.ctx.body = { success: true, data: circles };
    } catch (error) {
      console.error('Error fetching circles:', error);

      if (error instanceof TypeError) {
        this.ctx.body = { success: false, message: 'Invalid data format' };
        this.ctx.status = 400;
      } else {
        this.ctx.body = { success: false, message: 'Internal Server Error' };
        this.ctx.status = 500;
      }
    }
  }
  @Post('/circles')
  async createCircle(@Body() body) {
    try {
      console.log('Received request to create circle:', body);
      if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
      }
      this.circleRepository = AppDataSource.getRepository(Circle);

      const newCircle = new Circle();
      newCircle.name = body.name;
      newCircle.isDefault = body.isDefault;

      const savedCircle = await this.circleRepository.save(newCircle);
      console.log('Created new circle:', savedCircle);
      this.ctx.body = { success: true, data: savedCircle };
    } catch (error) {
      console.error('Error creating circle:', error);
      this.ctx.body = { success: false, message: 'Internal Server Error' };
      this.ctx.status = 500;
    }
  }
}