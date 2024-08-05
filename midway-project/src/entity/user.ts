import { Entity, PrimaryGeneratedColumn, Column,ManyToMany, JoinTable } from 'typeorm';
import { Circle } from './circle';

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
  
}