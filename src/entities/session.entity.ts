import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { _BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity()
export class Session extends _BaseEntity {
  //Primary uuid generated column is inherited from baseentity
  //and so are createdat and updated at and deleted at...

  @OneToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  expiresOn: Date;
}
