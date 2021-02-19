import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class _BaseEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  // Randomized UUID generation will be safer
  // TODO: Please look at these: https://typeorm.io/#/entities/column-types-for-postgres
  //                            https://typeorm.io/#/entities/enum-column-type
  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
