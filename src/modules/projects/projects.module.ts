import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './../../entities/project.entity';
import { UsersModule } from '../users/users.module';
import { User } from './../../entities/user.entity';
import { Comment } from './../../entities/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project]),
    UsersModule,
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Comment]),
  ],
  providers: [ProjectsService],
  controllers: [ProjectsController],
})
export class ProjectsModule {}
