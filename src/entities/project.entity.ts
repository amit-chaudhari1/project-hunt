import { Column, Entity, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Image } from './image.entity';
// import { Image } from './image.entity';
// import { User } from './user.entity';

@Entity()
export class Project extends BaseEntity {
  @Column()
  title: string;
  @Column()
  tagline: string;
  @Column()
  description: string;
  //TODO: create another entity for project images and assign it many to one relation here...
  @OneToOne(() => Image)
  images: Image;
  @Column()
  wesite: string;
  @Column()
  github_link: string;
  @Column()
  YT_link: string;
  @Column()
  user: string;
  @Column()
  tags: string;
  //TODO: come up with a better way to implement hashtags
  //TODO: provide suitable constraint's to the entities. eg: not more than 10 hashtags, not more than 1000 char title. etc
}
