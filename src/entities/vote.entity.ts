import { Entity, ManyToOne } from 'typeorm';
import { Activity } from './activity.entity';
import { _BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity()
export class Vote extends _BaseEntity {
  @ManyToOne(() => User, (user) => user.votes)
  user: User;

  @ManyToOne(() => Activity, (activity) => activity.votes)
  activity: Activity;
  //Project's activity == activity/
}
