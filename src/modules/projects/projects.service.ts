import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/entities/comment.entity';
import { UserRepository } from '../users/user.repository';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto, createProjectDto } from './createProject.dto';
import { ProjectRepository } from './projects.repository';

@Injectable()
export class ProjectsService {
  @InjectRepository(ProjectRepository)
  private projectRepository: ProjectRepository;
  @InjectRepository(UserRepository)
  private userRepository: UserRepository;
  @InjectRepository(CommentRepository)
  private commentRepository: CommentRepository;

  async createProject(createProjectDto: createProjectDto) {
    console.log(createProjectDto);
    const createdProject = await this.projectRepository
      .create(createProjectDto)
      .save();
    return createdProject;
  }
  async getProjectById(id: string) {
    return await this.projectRepository.findOne(id, { relations: ['users'] });
  }
  async getSortBy(option: string) {
    switch (option) {
      case 'createdAt':
        return await this.projectRepository
          .createQueryBuilder('project')
          .orderBy('project.createdAt', 'DESC')
          .execute();
        break;
      case 'popular':
        //TODO : Query to sort as per votes
        break;
    }
  }
  async createComment(projectId: number, comment: CreateCommentDto) {
    const project = await this.projectRepository.findOne(projectId);
    const user = await this.userRepository.findOne(comment.user);
    console.log(this.userRepository);
    console.log({ user });
    const newComment = new Comment();
    newComment.title = comment.title;
    newComment.body = comment.body;
    newComment.user = user;
    newComment.project = project;
    return await this.commentRepository
      .createQueryBuilder('comment')
      .insert()
      .values(newComment)
      .execute();
  }
}
