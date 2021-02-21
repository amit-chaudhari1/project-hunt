import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/entities/project.entity';
import { UsersModule } from '../users/users.module';
import { User } from 'src/entities/user.entity';
import { Comment } from 'src/entities/comment.entity';

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
