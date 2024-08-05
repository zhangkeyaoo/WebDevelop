import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { User } from './user';

@Entity()
export class Circle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string='';
  
  @Column({ default: false })
  isDefault: boolean = false;

  @ManyToMany(() => User, user => user.circles)
  users: User[];
}