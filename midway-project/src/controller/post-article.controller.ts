import { Provide, Controller, Post, Body, Inject,Get,Param } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { Repository } from 'typeorm';
import { PostArticle } from '../entity/post-article';
import { Circle } from '../entity/circle';
import { User } from '../entity/user';
import { AppDataSource } from '../db';

@Provide()
@Controller('/api')
export class PostController {
  @Inject()
  ctx: Context;
  
  private postRepository: Repository<PostArticle>;
  private circleRepository: Repository<Circle>;
  private userRepository: Repository<User>;



  @Post('/postarticles')
  async createPost(@Body() body) {
    try {
      if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
      }
      this.postRepository = AppDataSource.getRepository(PostArticle);
      this.circleRepository = AppDataSource.getRepository(Circle);
      this.userRepository = AppDataSource.getRepository(User);
      console.log('Received request to create post:', body);

      const { title, content, images, circleId, userId } = body;

      const circle = await this.circleRepository.findOne({ where: { id: circleId } });
      const user = await this.userRepository.findOne({ where: { id: userId } });

      if (!circle || !user) {
        this.ctx.body = { success: false, message: 'Invalid circle or user' };
        this.ctx.status = 400;
        console.log('Invalid circle or user');
        return;
      }

      const newPost = new PostArticle();
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

  @Get('/posts/:postId')
  async getPost(@Param('postId') postId: number) {
    try {
      if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
      }
      this.postRepository = AppDataSource.getRepository(PostArticle);

      const post = await this.postRepository.findOne({ where: { id: postId }, relations: ['user'] });

      if (!post) {
        this.ctx.body = { success: false, message: 'Post not found' };
        this.ctx.status = 404;
        return;
      }

      this.ctx.body = { success: true, data: { post } };
    } catch (error) {
      console.error('Error fetching post:', error);
      this.ctx.body = { success: false, message: 'Internal Server Error' };
      this.ctx.status = 500;
    }
  }
  @Post('/posts/:postId/comments')
  async addComment(@Param('postId') postId: number, @Body() body) {
    try {
      if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
      }
      this.postRepository = AppDataSource.getRepository(PostArticle);

      const post = await this.postRepository.findOne({ where: { id: postId } });

      if (!post) {
        this.ctx.body = { success: false, message: 'Post not found' };
        this.ctx.status = 404;
        return;
      }

      // 假设评论内容保存在 post 的 comments 字段中
      post.comments = post.comments ? [...post.comments, body.content] : [body.content];

      const updatedPost = await this.postRepository.save(post);
      this.ctx.body = { success: true, data: updatedPost };
    } catch (error) {
      console.error('Error adding comment:', error);
      this.ctx.body = { success: false, message: 'Internal Server Error' };
      this.ctx.status = 500;
    }
  }

  @Post('/posts/:postId/like')
  async likePost(@Param('postId') postId: number, @Body() body) {
    try {
      if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
      }
      // console.log('Received request to like post:', body);
      this.postRepository = AppDataSource.getRepository(PostArticle);
      this.userRepository = AppDataSource.getRepository(User);

      const post = await this.postRepository.findOne({ where: { id: postId }, relations: ['likedUsers'] });
      const user = await this.userRepository.findOne({ where: { id: body.userId } });
      console.log('Post:', post);
      if (!post || !user) {
        this.ctx.body = { success: false, message: 'Post or user not found' };
        this.ctx.status = 404;
        return;
      }

      if (post.likedUsers.some(likedUser => likedUser.id === user.id)) {
        this.ctx.body = { success: false, message: 'User has already liked this post' };
        this.ctx.status = 400;
        return;
      }

      post.likeCount += 1; // 点赞数加一
      post.likedUsers.push(user); // 添加点赞用户
      await this.postRepository.save(post);
      this.ctx.body = { success: true, data: post};
    } catch (error) {
      console.error('Error liking post:', error);
      this.ctx.body = { success: false, message: 'Internal Server Error' };
      this.ctx.status = 500;
    }
  }

}