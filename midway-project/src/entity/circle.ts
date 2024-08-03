// entity/circle.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Circle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string='';
  
  @Column({ default: false })
  isDefault: boolean = false;
}