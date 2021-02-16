import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';
// import { Project } from './project.entity';
// import { User } from './user.entity';

@Entity()
export class Vote extends BaseEntity {
  @Column()
  from_user: string;
  @Column()
  on_project: string;
  @Column()
  value: number;
  //not sure on how to improve here.
}
