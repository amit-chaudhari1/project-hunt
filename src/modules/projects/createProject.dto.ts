import { HashTag } from 'src/entities/hashtags.entity';
import { Image } from 'src/entities/image.entity';
import { User } from 'src/entities/user.entity';

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
