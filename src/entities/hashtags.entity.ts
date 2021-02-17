import { Column, Entity, ManyToOne } from 'typeorm';
import { _BaseEntity } from './base.entity';
import { Project } from './project.entity';

@Entity()
export class HashTag extends _BaseEntity {
  @Column({
    type: 'varchar',
    length: 25,
    nullable: false,
  })
  tag: string;

  @ManyToOne(() => Project, (project) => project.tags)
  project: Project;
}
