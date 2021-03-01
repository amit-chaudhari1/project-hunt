import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { _BaseEntity } from './entities/base.entity';
import { Comment } from './entities/comment.entity';
import { Image } from './entities/image.entity';
import { User } from './entities/user.entity';
import { Vote } from './entities/vote.entity';
import { Project } from './entities/project.entity';
import { ProjectsModule } from './modules/projects/projects.module';
import { HashTag } from './entities/hashtags.entity';
import { HashtagModule } from './modules/hashtag/hashtag.module';
import { Activity } from './entities/activity.entity';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { UsersService } from './modules/users/users.service';
import { UserRepository } from './modules/users/user.repository';
import { Session } from './entities/session.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'projecthunt',
      username: 'hotshot_dev',
      password: 'passwd',
      entities: [
        _BaseEntity,
        Comment,
        Image,
        User,
        Vote,
        Project,
        HashTag,
        Activity,
        Session,
      ],
      //TODO: document the entity relations.
      //TODO: Hashtag entity discussion.
      synchronize: true,
      logging: true,
    }),
    UsersModule,
    ProjectsModule,
    HashtagModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, UsersService, UserRepository],
})
export class AppModule {}
