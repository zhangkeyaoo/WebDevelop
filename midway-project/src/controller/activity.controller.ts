import { Provide, Controller, Post, Body, Inject, Get, Param } from '@midwayjs/decorator';
import { Context } from 'egg';
import { Repository } from 'typeorm';
import { Activity } from '../entity/activity';
import { User } from '../entity/user';
import { Circle } from '../entity/circle';
import { AppDataSource } from '../db';

@Provide()
@Controller('/api')
export class ActivityController {
  @Inject()
  ctx: Context;

  private activityRepository: Repository<Activity>;
  private userRepository: Repository<User>;
  private circleRepository: Repository<Circle>;

  @Post('/activities')
  async addActivity(@Body() body) {
    try {
      if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
      }
      this.activityRepository = AppDataSource.getRepository(Activity);
      this.userRepository = AppDataSource.getRepository(User);
      this.circleRepository = AppDataSource.getRepository(Circle);

      const user = await this.userRepository.findOne({ where: { id: body.userId } });
      const circle = await this.circleRepository.findOne({ where: { id: body.circleId } });

      if (!user || !circle) {
        this.ctx.body = { success: false, message: 'User or Circle not found' };
        return;
      }

      const newActivity = new Activity();
      newActivity.user = user;
      newActivity.circle = circle;
      newActivity.postCount = body.postCount;
      newActivity.commentCount = body.commentCount;
      // newActivity.likeCount = body.likeCount; // 如果需要

      await this.activityRepository.save(newActivity);

      this.ctx.body = { success: true, data: newActivity };
    } catch (error) {
      console.error('Error adding activity:', error);
      this.ctx.body = { success: false, message: 'Internal Server Error' };
      this.ctx.status = 500;
    }
  }

  @Get('/circles/:circleId/activities')
  async getCircleActivities(@Param('circleId') circleId: number) {
    try {
      if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
      }
      console.log('Fetching activities for circleId:', circleId);
      this.activityRepository = AppDataSource.getRepository(Activity);
      this.circleRepository = AppDataSource.getRepository(Circle);

      const circle = await this.circleRepository.findOne({ where: { id: circleId }, relations: ['activities', 'activities.user'] });
      console.log('circle', circle);    

      if (!circle) {
        console.error('Circle not found'); // 添加日志记录
        this.ctx.body = { success: false, message: 'Circle not found' };
        return;
      }

      if (!circle.activities || circle.activities.length === 0) {
        console.log('No activities found for this circle');
        this.ctx.body = { success: true, data: [] };
        return;
      }
  
      const activities = circle.activities.map(activity => ({
        username: activity.user.username,
        postCount: activity.postCount,
        commentCount: activity.commentCount,
      }));
      console.log('Mapped activities:', activities);

      await this.activityRepository.save(activities);
      console.log('Saved activities:', activities);
      this.ctx.body = { success: true, data: activities };
    } catch (error) {
      console.error('Error fetching circle activities:', error);
      this.ctx.body = { success: false, message: 'Internal Server Error' };
      this.ctx.status = 500;
    }
  }
}