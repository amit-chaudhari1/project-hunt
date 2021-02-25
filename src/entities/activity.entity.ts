import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { _BaseEntity } from './base.entity';
import { Project } from './project.entity';
import { Vote } from './vote.entity';

@Entity()
export class Activity extends _BaseEntity {
  @OneToOne(() => Project, (project) => project.activity)
  @JoinColumn()
  project: Project;

  @OneToMany(() => Vote, (vote) => vote.activity)
  votes: Vote[];

  @Column({ default: 0 })
  voteCount: number;
}
