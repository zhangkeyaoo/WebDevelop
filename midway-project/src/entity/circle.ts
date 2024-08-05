import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { User } from './user';

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
  @JoinTable()
  users: User[];
  
}