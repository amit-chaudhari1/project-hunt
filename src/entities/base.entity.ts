import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  // TODO: Please look at these: https://typeorm.io/#/entities/column-types-for-postgres
  //                            https://typeorm.io/#/entities/enum-column-type
  @Column('date')
  createdAt: Date;

  @Column('date')
  deletedAt: string;

  @Column('date')
  updatedAt: string;
}
