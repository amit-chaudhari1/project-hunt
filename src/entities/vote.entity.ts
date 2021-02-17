import { Column, Entity, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Project } from './project.entity';
import { User } from './user.entity';

@Entity()
export class Vote extends BaseEntity {
  @OneToOne(() => User)
  from_user: User;
  @OneToOne(() => Project)
  on_project: Project;
  @Column()
  value: number;
  //TODO: single votes!!!
  //this might be a reason to future troubles...
}
