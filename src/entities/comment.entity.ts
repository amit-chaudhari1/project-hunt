import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';
// import { Project } from './project.entity';
// import { User } from './user.entity';

@Entity()
export class Comment extends BaseEntity {
  @Column()
  user: string;
  @Column()
  project: string;
  //TODO:change
  @Column()
  title: string;
  @Column()
  body: string;
  @Column()
  tag: string;
  //TODO: constraints
}
