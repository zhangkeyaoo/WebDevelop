import { Entity, PrimaryGeneratedColumn, Column,ManyToMany, JoinTable,OneToMany } from 'typeorm';
import { Circle } from './circle';
import { PostArticle } from './post-article';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string = '';

  @Column()
  username: string='';

  @Column()
  password: string='';

  @Column({ default: 'default' })
  avatar: string='';

  @ManyToMany(() => Circle, circle => circle.users)
  @JoinTable()
  circles: Circle[];
  
  @OneToMany(() => PostArticle, post => post.user)
  posts: PostArticle[];
}