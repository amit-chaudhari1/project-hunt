import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Comment } from 'src/entities/comment.entity';
import { getRepository } from 'typeorm';
import { UserRepository } from '../users/user.repository';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto, createProjectDto } from './createProject.dto';
import { User } from 'src/entities/user.entity';
import { Vote } from 'src/entities/vote.entity';
import { getConnection } from 'typeorm';
import { ProjectRepository } from './projects.repository';
import { Project } from 'src/entities/project.entity';

@Injectable()
export class ProjectsService {
  @InjectRepository(ProjectRepository)
  private projectRepository: ProjectRepository;
  @InjectRepository(UserRepository)
  private userRepository: UserRepository;
  @InjectRepository(CommentRepository)
  private commentRepository: CommentRepository;

  async createProject(createProjectDto: createProjectDto) {
    const createdProject = await this.projectRepository
      .create(createProjectDto)
      .save();
    return createdProject;
  }
  async getProjectById(id: string) {
    return await this.projectRepository.findOne(id, {
      relations: ['users'],
    });
  }
  async getSortBy(option: string) {
    switch (option) {
      case 'createdAt':
        return await this.projectRepository
          .createQueryBuilder('project')
          .orderBy('project.createdAt', 'DESC')
          .execute();
      case 'popular':
        //TODO : Query to sort as per votes
        break;
    }
  }
  async upvote(userid: number, projectid: number) {
    try {
      await getConnection()
        .createQueryBuilder()
        .select('vote')
        .from(Vote, 'vote')
        .where('vote.user = :user AND vote.project = :project', {
          user: userid,
          project: projectid,
        })
        .getOne();
      return 'Already upvoted!!!';
    } catch (e) {
      //the user never upvoted...
      //register the upvote and update the counts
      const user = await getConnection()
        .getRepository(User)
        .createQueryBuilder('user')
        .where('user.id = :id', { id: userid })
        .getOne();
      const project = await getConnection()
        .getRepository(Project)
        .createQueryBuilder('project')
        .where('project.id = :id', { id: projectid })
        .getOne();
      getConnection()
        .createQueryBuilder()
        .insert()
        .into(Vote)
        .values([{ user: user, project: project }])
        .execute();
      return 'Upvotes!';
    } finally {
    }
  }

  // async getVotes(id: number): Promise<number> {
  //   const query = await this.projectRepository.findOne(id, {
  //     relations: ['voteCount'],
  //   });
  //   const voteCount = query.voteCount;
  //   return voteCount;
  // }

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

  async getCommentsByProjectId(projectId: number, options: IPaginationOptions) {
    const commentsQuery = getRepository(Comment)
      .createQueryBuilder('comment')
      .where(`comment.project = ${projectId}`);

    return await paginate(commentsQuery, options);
  }
}
