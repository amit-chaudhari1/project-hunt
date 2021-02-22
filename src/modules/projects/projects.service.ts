import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Comment } from 'src/entities/comment.entity';
import { getManager, getRepository } from 'typeorm';
import { UserRepository } from '../users/user.repository';
import { CommentRepository } from './comment.repository';
import { createCommentDto, createProjectDto } from './createProject.dto';
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

  async getPopularProjects() {
    // ! Is not returning relations. And currently only returning few properties
    const result = await getManager().query(
      `
      SELECT
      PROJECT.id, PROJECT.title, PROJECT.description, PROJECT.tagline,
      COUNT("projectId") AS VoteCount
  FROM
      vote
      Right JOIN PROJECT ON "projectId" = project.id
  GROUP BY
      project.id
  ORDER BY
      VoteCount DESC;
      
      `,
    );
    console.log(result);
    return result;
  }

  async getSortBy(option: string) {
    switch (option) {
      case 'createdAt':
        // ! Not relating Relations
        return await this.projectRepository
          .createQueryBuilder('project')
          .orderBy('project.createdAt', 'DESC')
          .execute();
      case 'popular':
        return this.getPopularProjects();
        break;
    }
  }

  async upvote(userid: string, projectid: string) {
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

    if (!user || !project) {
      return 'undefined user or project';
    } else {
      try {
        await getConnection()
          .createQueryBuilder()
          .select('vote')
          .from(Vote, 'vote')
          .where('vote.user = :user AND vote.project = :project', {
            user: userid,
            project: projectid,
          })
          .getOneOrFail();
        return 'AlreadyUPvoted';
      } catch (e) {
        //the user never upvoted...
        //register the upvote and update the counts
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
  }

  // async getVotes(id: number): Promise<number> {
  //   const query = await this.projectRepository.findOne(id, {
  //     relations: ['voteCount'],
  //   });
  //   const voteCount = query.voteCount;
  //   return voteCount;
  // }

  async createComment(projectId: string, comment: createCommentDto) {
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

  async getCommentsByProjectId(projectId: string, options: IPaginationOptions) {
    const commentsQuery = getRepository(Comment)
      .createQueryBuilder('comment')
      .where('comment.project = :projectId', { projectId: projectId });

    return await paginate(commentsQuery, options);
  }
}
