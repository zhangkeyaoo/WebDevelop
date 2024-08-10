import { Provide, Controller, Post, Get, Body, Param, Inject } from '@midwayjs/decorator';
import { Context } from 'egg';
import { Repository } from 'typeorm';
import { Comment } from '../entity/comment';
import { User } from '../entity/user';
import { PostArticle } from '../entity/post-article';
import { AppDataSource } from '../db';

@Provide()
@Controller('/api')
export class CommentController {
  @Inject()
  ctx: Context;

  private commentRepository: Repository<Comment>;
  private userRepository: Repository<User>;
  private postRepository: Repository<PostArticle>;

  @Post('/posts/:postId/comments')
  async addComment(@Param('postId') postId: number, @Body() body) {
    try {
      if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
      }
      this.commentRepository = AppDataSource.getRepository(Comment);
      this.userRepository = AppDataSource.getRepository(User);
      this.postRepository = AppDataSource.getRepository(PostArticle);

      const post = await this.postRepository.findOne({ where: { id: postId } });
      const user = await this.userRepository.findOne({ where: { id: body.userId } });

      if (!post || !user) {
        this.ctx.body = { success: false, message: 'Post or User not found' };
        return;
      }

      const newComment = new Comment();
      newComment.content = body.content;
      newComment.user = user;
      newComment.post = post;

      await this.commentRepository.save(newComment);

      const savedComment = await this.commentRepository.findOne({
        where: { id: newComment.id },
        relations: ['user'],
      });
      this.ctx.body = { success: true, data: savedComment };
    } catch (error) {
      console.error('Error adding comment:', error);
      this.ctx.body = { success: false, message: 'Internal Server Error' };
      this.ctx.status = 500;
    }
  }

  @Get('/posts/:postId/comments')
  async getComments(@Param('postId') postId: number) {
    try {
      if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
      }
      this.commentRepository = AppDataSource.getRepository(Comment);

      const comments = await this.commentRepository.find({
        where: { post: { id: postId } },
        relations: ['user'],
      });

      console.log('Fetched comments:', comments); // 添加日志
      this.ctx.body = { success: true, data: comments };
    } catch (error) {
      console.error('Error fetching comments:', error);
      this.ctx.body = { success: false, message: 'Internal Server Error' };
      this.ctx.status = 500;
    }
  }
}