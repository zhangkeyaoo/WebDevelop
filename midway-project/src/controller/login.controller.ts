import { Controller, Post, Body, Inject , Provide} from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { AppDataSource } from '../db';
import { User } from '../entity/user';
import { Repository } from 'typeorm';

@Provide()
@Controller('/api')
export class LoginController {
  private userRepository: Repository<User>;
  
  @Inject()
  ctx: Context;

  @Post('/login')
  async login(@Body() body: any) {
    const { userId, password } = body;
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  this.userRepository = AppDataSource.getRepository(User);
  // 查找用户
  const user = await this.userRepository.findOneBy({ id: userId });

  if (!user) {
    this.ctx.status = 404;
    this.ctx.body = { success: false, message: 'User not found' };
    return;
  }

    // 验证密码
    if (user.password !== password) {
      this.ctx.status = 401;
      this.ctx.body = { success: false, message: 'Invalid password' };
      return;
    }

    // 登录成功
    this.ctx.body = { success: true, message: 'Login successful', user,userID:user.id,username:user.username };
  }
}