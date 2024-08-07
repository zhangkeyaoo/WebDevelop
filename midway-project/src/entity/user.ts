import { Entity, PrimaryGeneratedColumn, Column,ManyToMany, JoinTable,OneToMany } from 'typeorm';
import { Circle } from './circle';
import { Post } from './post';

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
  
  @OneToMany(() => Post, post => post.user)
  posts: Post[];
}