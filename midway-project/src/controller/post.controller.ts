import { Provide, Controller, Post, Body, Inject } from '@midwayjs/decorator';
import { Context } from '@midwayjs/web';
import { Repository } from 'typeorm';
import { Post as PostEntity } from '../entity/post';
import { Circle } from '../entity/circle';
import { User } from '../entity/user';
import { AppDataSource } from '../db';

@Provide()
@Controller('/api')
export class PostController {
  private postRepository: Repository<PostEntity>;
  private circleRepository: Repository<Circle>;
  private userRepository: Repository<User>;

  @Inject()
  ctx: Context;

  @Post('/posts')
  async createPost(@Body() body) {
    try {
      if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
      }
      this.postRepository = AppDataSource.getRepository(PostEntity);
      this.circleRepository = AppDataSource.getRepository(Circle);
      this.userRepository = AppDataSource.getRepository(User);

      const { title, content, images, circleId, userId } = body;

      const circle = await this.circleRepository.findOne({ where: { id: circleId } });
      const user = await this.userRepository.findOne({ where: { id: userId } });

      if (!circle || !user) {
        this.ctx.body = { success: false, message: 'Invalid circle or user' };
        this.ctx.status = 400;
        return;
      }

      const newPost = new PostEntity();
      newPost.title = title;
      newPost.content = content;
      newPost.images = images;
      newPost.circle = circle;
      newPost.user = user;

      const savedPost = await this.postRepository.save(newPost);
      this.ctx.body = { success: true, data: savedPost };
    } catch (error) {
      console.error('Error creating post:', error);
      this.ctx.body = { success: false, message: 'Internal Server Error' };
      this.ctx.status = 500;
    }
  }
}