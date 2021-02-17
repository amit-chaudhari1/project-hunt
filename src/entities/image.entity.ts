import { Column, Entity, ManyToOne } from 'typeorm';
import { _BaseEntity } from './base.entity';
import { Project } from './project.entity';

@Entity()
export class Image extends _BaseEntity {
  @Column('varchar', { nullable: false })
  url: string;

  @ManyToOne(() => Project, (project) => project.images)
  project: Project;
}
