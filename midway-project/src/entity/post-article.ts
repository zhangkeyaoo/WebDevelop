import { Entity, PrimaryGeneratedColumn, Column, ManyToOne,ManyToMany, JoinTable } from 'typeorm';
import { Circle } from './circle';
import { User } from './user';

@Entity()
export class PostArticle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column('simple-array', { nullable: true })
  images: string[];

  @Column({ type: 'json', nullable: true })
  comments: string[];

  @Column({ default: 0 }) // 添加 likeCount 字段，默认值为 0
  likeCount: number;

  @ManyToOne(() => Circle, circle => circle.posts)
  circle: Circle;

  @ManyToOne(() => User, user => user.posts)
  user: User;

  @ManyToMany(() => User)
  @JoinTable()
  likedUsers: User[];
}