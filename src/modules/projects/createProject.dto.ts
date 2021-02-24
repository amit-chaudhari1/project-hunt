import { Project } from 'src/entities/project.entity';
import { Vote } from 'src/entities/vote.entity';
import { HashTag } from './../../entities/hashtags.entity';
import { Image } from './../../entities/image.entity';
import { User } from './../../entities/user.entity';

export class createProjectDto {
  title: string;
  tagline: string;
  description: string;
  image: Image[];
  website: string;
  github: string;
  youtube: string;
  users: User[];
  tags: HashTag[];
  vote: number;
}

export class createCommentDto {
  title: string;
  body: string;
  project: string;
  user: string;
}