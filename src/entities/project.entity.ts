import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { _BaseEntity } from './base.entity';
import { HashTag } from './hashtags.entity';
import { Image } from './image.entity';
import { User } from './user.entity';

@Entity()
export class Project extends _BaseEntity {
  //TODO: create another entity for project images and assign it many to one relation here...
  //TODO: disscuss how should i develop this relation between projects and users, many to many, but what constraints.
  //TODO: come up with a better way to implement hashtags
  //TODO: provide suitable constraint's to the entities. eg: not more than 10 hashtags, not more than 1000 char title. etc
  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
  })
  title: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 240,
  })
  tagline: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 2000,
  })
  description: string;

  @OneToMany(() => Image, (image) => image.project)
  @JoinColumn({ name: 'images' })
  @Column('int', { array: true, nullable: true })
  images: Image[];

  @Column({
    type: 'varchar',
    nullable: true,
  })
  website: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  github: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  youtube: string;

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];

  @OneToMany(() => HashTag, (hashTag) => hashTag.project)
  @JoinColumn({ name: 'tags' })
  @Column('int', { array: true, nullable: true })
  tags: HashTag[];
  //TODO: Implement limit upto 3 users

  @Column({ type: 'int', default: 0, nullable: false })
  voteCount: number;
}
