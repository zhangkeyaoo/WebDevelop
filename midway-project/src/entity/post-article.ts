import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
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

  @ManyToOne(() => Circle, circle => circle.posts)
  circle: Circle;

  @ManyToOne(() => User, user => user.posts)
  user: User;
}