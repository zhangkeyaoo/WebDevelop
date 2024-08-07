import { Entity, PrimaryGeneratedColumn, Column, ManyToMany,OneToMany } from 'typeorm';
import { User } from './user';
import { Post } from './post';

@Entity()
export class Circle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string='';
  
  @Column({ default: false })
  isDefault: boolean = false;

  @Column({ default: 0 })
  userCount: number = 0; 

  @ManyToMany(() => User, user => user.circles)
  users: User[];
  
  @OneToMany(() => Post, post => post.circle)
  posts: Post[];
}