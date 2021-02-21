import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { _BaseEntity } from './base.entity';
import { Project } from './project.entity';
import { User } from './user.entity';

@Entity()
export class Vote extends _BaseEntity {
  @ManyToOne(() => User, (user) => user.votes)
  user: User;

  @ManyToOne(() => Project, (project) => project.votes)
  project: Project;
}
