import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  createdBy: string;

  @Column()
  deletedAt: string;

  @Column()
  updatedAt: string;
}
