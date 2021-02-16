import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Image } from './image.entity';
import { Project } from './project.entity';

@Entity()
export class User extends BaseEntity {
  @Column()
  username: string;
  @Column()
  password: string;
  //This is an unidirectional relation.
  @OneToOne(() => Image)
  @JoinColumn()
  avatar: Image;
  @Column()
  linkedin: string;
  @Column()
  twitter: string;
  @Column()
  github: string;
  @Column()
  youtube: string;
  @Column()
  facebook: string;
  //TODO: come up with a better way to implement social_media Links
  //TODO: provide suitable constraint's to the entities. eg: not more than 10 hashtags, not more than 1000 char title. etc
  @ManyToMany(() => Project)
  @JoinTable()
  projects: Project[];
}
