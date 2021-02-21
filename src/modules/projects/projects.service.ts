import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Vote } from 'src/entities/vote.entity';
import { getConnection } from 'typeorm';
import { createProjectDto } from './createProject.dto';
import { ProjectRepository } from './projects.repository';
import { Project } from 'src/entities/project.entity';
@Injectable()
export class ProjectsService {
  @InjectRepository(ProjectRepository)
  private projectRepository: ProjectRepository;

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
        .getOneOrFail();
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
}
