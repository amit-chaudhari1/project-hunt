import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';
import { _BaseEntity } from './base.entity';
import { Project } from './project.entity';

@Entity()
export class HashTag extends _BaseEntity {
  @Column({
    type: 'varchar',
    length: 25,
    nullable: false,
    unique: true,
  })
  tag: string;

  @ManyToMany(() => Project, (project) => project.tags)
  projects: Project[];
}
