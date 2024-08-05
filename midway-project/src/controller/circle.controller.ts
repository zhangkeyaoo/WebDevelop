import { Controller, Get, Post,Inject, Provide,Body,Param } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { AppDataSource } from '../db';
import { Circle } from '../entity/circle';
import { User } from '../entity/user';
import { Repository } from 'typeorm';

@Provide()
@Controller('/api')
export class CircleController {
  private circleRepository: Repository<Circle>;
  private userRepository: Repository<User>;

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
  @Get('/user/:userId/circles')
  async getUserCircles(@Param('userId') userId: string) {
    try {
      if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
      }
      this.userRepository = AppDataSource.getRepository(User);

      const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['circles'] });
      if (!user) {
        this.ctx.body = { success: false, message: 'User not found' };
        this.ctx.status = 404;
        return;
      }

      this.ctx.body = { success: true, data: user.circles };
    } catch (error) {
      console.error('Error fetching user circles:', error);
      this.ctx.body = { success: false, message: 'Internal Server Error' };
      this.ctx.status = 500;
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

      // 检查圈子是否已经存在
      const existingCircle = await this.circleRepository.findOne({ where: { name: body.name } });
      if (existingCircle) {
        this.ctx.body = { success: false, message: 'Circle already exists' };
        this.ctx.status = 400;
        return;
      }

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

  @Post('/circles/follow')
  async followCircle(@Body() body) {
    try {
      const { userId, circleId } = body;
      if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
      }
      this.circleRepository = AppDataSource.getRepository(Circle);
      this.userRepository = AppDataSource.getRepository(User);

      const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['circles'] });
      const circle = await this.circleRepository.findOne({ where: { id: circleId } });

      if (!user || !circle) {
        this.ctx.body = { success: false, message: 'User or Circle not found' };
        this.ctx.status = 404;
        return;
      }

      user.circles.push(circle);
      await this.userRepository.save(user);

      this.ctx.body = { success: true, message: 'Circle followed successfully' };
    } catch (error) {
      console.error('Error following circle:', error);
      this.ctx.body = { success: false, message: 'Internal Server Error' };
      this.ctx.status = 500;
    }
  }
@Post('/circles/unfollow')
  async unfollowCircle(@Body() body) {
    try {
      const { userId, circleId } = body;
      if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
      }
      this.circleRepository = AppDataSource.getRepository(Circle);
      this.userRepository = AppDataSource.getRepository(User);

      const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['circles'] });
      const circle = await this.circleRepository.findOne({ where: { id: circleId } });

      if (!user || !circle) {
        this.ctx.body = { success: false, message: 'User or Circle not found' };
        this.ctx.status = 404;
        return;
      }

      user.circles = user.circles.filter(c => c.id !== circle.id);
      await this.userRepository.save(user);

      this.ctx.body = { success: true, message: 'Circle unfollowed successfully' };
    } catch (error) {
      console.error('Error unfollowing circle:', error);
      this.ctx.body = { success: false, message: 'Internal Server Error' };
      this.ctx.status = 500;
    }
  }
}

