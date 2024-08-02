import { AppDataSource } from '../db';
import { User } from '../entity/user';
import { IRouterContext } from 'koa-router';

interface LoginRequestBody {
    username: string;
    password: string;
  }
  

export class LoginController {
  async login(ctx: IRouterContext): Promise<void> {
    const { username, password } = ctx.request.body as LoginRequestBody;

    try {
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({ where: { username, password } });

      if (user) {
        ctx.body = { success: true, message: '登录成功' };
      } else {
        ctx.status = 401;
        ctx.body = { success: false, message: '用户名或密码错误' };
      }
    } catch (error) {
      console.error('Error during user login:', error);
      ctx.status = 500;
      ctx.body = { success: false, message: '服务器错误' };
    }
  }
}