import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { _BaseEntity } from './base.entity';
import { Image } from './image.entity';
import { Project } from './project.entity';

@Entity()
export class User extends _BaseEntity {
  @Column({
    unique: true,
    nullable: false,
  })
  username: string;

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 30,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    length: 30,
  })
  lastName: string;

  @OneToOne(() => Image, { nullable: true })
  @JoinColumn({ name: 'avatar' })
  @Column({ nullable: true })
  avatar: Image;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 1000,
  })
  bio: string;

  @Column({
    nullable: true,
  })
  linkedin: string;

  @Column({
    nullable: true,
  })
  twitter: string;

  @Column({
    nullable: true,
  })
  github: string;

  @Column({
    nullable: true,
  })
  youtube: string;

  @Column({
    nullable: true,
  })
  facebook: string;

  @ManyToOne(() => Project, (project) => project.users)
  project: Project;
  //TODO: come up with a better way to implement social_media Links
  //TODO: provide suitable constraint's to the entities. eg: not more than 10 hashtags, not more than 1000 char title. etc
}
