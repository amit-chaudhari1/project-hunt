import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { _BaseEntity } from './base.entity';
import { Image } from './image.entity';
import { Project } from './project.entity';
import { Vote } from './vote.entity';
import * as bcrypt from 'bcrypt';

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

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }

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

  @ManyToMany(() => Project, (project) => project.users)
  projects: Project[];
  //TODO: come up with a better way to implement social_media Links

  @OneToMany(() => Vote, (vote) => vote.user)
  votes: Vote[];
}
