import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseEntity } from './entities/base.entity';
import { Comment } from './entities/comment.entity';
import { Image } from './entities/image.entity';
import { User } from './entities/user.entity';
import { Vote } from './entities/vote.entity';
import { Project } from './entities/project.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'projecthunt',
      username: 'hotshot_dev',
      password: 'passwd',
      entities: [BaseEntity, Comment, Image, User, Vote, Project], //TODO: document the entity relations.
      //TODO: Hashtag entity discussion.
      synchronize: true,
      logging: true,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
