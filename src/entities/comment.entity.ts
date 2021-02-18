import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { _BaseEntity } from './base.entity';
import { Project } from './project.entity';
import { User } from './user.entity';

@Entity()
export class Comment extends _BaseEntity {
  //TODO: Future Feature Implement MultiLevel Comment structure...
  /**
   * Currently we will support only a single level comment threads.
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user' })
  @Column({ nullable: false })
  user: User;

  @ManyToOne(() => Project)
  @JoinColumn({ name: 'project' })
  @Column({ nullable: false })
  project: Project;

  @Column({ type: 'varchar', length: 50, nullable: false })
  title: string;

  @Column({ type: 'varchar', length: 1000, nullable: false })
  body: string;
  //TODO: constraints
}
