import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { _BaseEntity } from './base.entity';
import { Project } from './project.entity';
import { User } from './user.entity';

@Entity()
export class Vote extends _BaseEntity {
  @OneToOne(() => User)
  @JoinColumn({ name: 'user' })
  user: User;

  @OneToOne(() => Project)
  @JoinColumn({ name: 'project' })
  project: Project;

  //TODO: single votes!!!
  //this might be a reason to future troubles...
}
