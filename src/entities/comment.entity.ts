import { Column, Entity, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Project } from './project.entity';
import { User } from './user.entity';

@Entity()
export class Comment extends BaseEntity {
  //TODO: Future Feature Implement MultiLevel Comment structure...
  /**
   * Currently we will support only a single level comment threads.
   */
  @OneToOne(() => User)
  from_user: User;
  @OneToOne(() => Project)
  on_project: Project;
  @Column()
  title: string;
  @Column()
  body: string;
  @Column()
  tag: string;
  //TODO: constraints
}
