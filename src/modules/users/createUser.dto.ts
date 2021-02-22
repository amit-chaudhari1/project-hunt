import { Image } from './../../entities/image.entity';
import { Project } from './../../entities/project.entity';

export class createUserDto {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  avatar: Image;
  bio: string;
  linkedin: string;
  twitter: string;
  github: string;
  youtube: string;
  facebook: string;
  project: Project[];
}
