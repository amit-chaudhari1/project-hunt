import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { CommentRepository } from './comment.repository';
import { createCommentDto, createProjectDto } from './createProject.dto';
import { getConnection, getManager, getRepository } from 'typeorm';
import { ProjectRepository } from './projects.repository';
import { Comment } from 'src/entities/comment.entity';
import { Project } from 'src/entities/project.entity';
import { User } from 'src/entities/user.entity';
import { Vote } from 'src/entities/vote.entity';
import { Activity } from 'src/entities/activity.entity';

@Injectable()
export class ProjectsService {
  @InjectRepository(ProjectRepository)
  private projectRepository: ProjectRepository;
  @InjectRepository(CommentRepository)
  private commentRepository: CommentRepository;

  async createProject(createProjectDto: createProjectDto) {
    const createdProject = await this.projectRepository
      .create(createProjectDto)
      .save();
    const projectActivity = new Activity();
    projectActivity.project = createdProject;
    await Activity.save(projectActivity);
    this.projectRepository
      .createQueryBuilder()
      .update()
      .set({
        activity: projectActivity,
      })
      .where('id =:id', { id: createdProject.id })
      .execute();
    return createdProject;
  }

  async getProjectById(id: string) {
    return await this.projectRepository.findOne(id, {
      relations: ['users', 'tags'],
    });
  }

  async getPopularProjects() {
    console.log('asdklfjlk');
    const projects = await Activity.find({
      relations: ['project'],
      order: { voteCount: 'DESC' },
    });
    return projects.map((obj) => {
      console.log(obj['project']);
      return obj['project'];
    });
  }

  async getProjects(
    sortBy: string,
    name: string,
    tag: string,
    options: IPaginationOptions,
  ) {
    let getProjectsQuery = getRepository(Project).createQueryBuilder('project');
    if (name) {
      getProjectsQuery = getProjectsQuery.andWhere(
        'LOWER(project.title) LIKE LOWER(:name)',
        {
          name: `%${name}%`,
        },
      );
    }

    if (tag) {
      getProjectsQuery = getProjectsQuery
        .leftJoin('project.tags', 'tags')
        .where('tags.tag = :tag', { tag });
    }
    switch (sortBy) {
      case 'new':
        return await paginate(
          getProjectsQuery.orderBy('project.createdAt', 'DESC'),
          options,
        );
      case 'popular':
        return await this.getPopularProjects();
      case 'trending':
        return await this.getPopularProjects();
    }
  }

  async upvote(userid: string, projectid: string): Promise<string> {
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
    const activity = await Activity.find({
      where: { project: { id: projectid } },
    });
    const id = activity[0]['id'];
    //activity contains array of object
    if (!user || !project) {
      return 'undefined user or project';
    } else {
      try {
        await getConnection()
          .createQueryBuilder()
          .select('vote')
          .from(Vote, 'vote')
          .where('vote.user = :user AND vote.activity = :activity', {
            user: userid,
            activity: id,
          })
          .getOneOrFail();
        //this above query will succeed only if the user has upvoted on the project...
        //if user has upvoted... then remove his upvote...
        getConnection()
          .createQueryBuilder()
          .delete()
          .from(Vote)
          .where([{ user: user, activity: activity[0] }])
          .execute();
        //and decrement the votecount by one...
        const voteCount = (activity[0]['voteCount'] -= 1);
        getConnection()
          .createQueryBuilder()
          .update(Activity)
          .set({
            voteCount: voteCount,
          })
          .where('id =:id', { id: id })
          .execute();
        return 'You removed your vote...';
      } catch (e) {
        //the user never upvoted...
        //register the upvote and update the counts
        //TODO: Might want to refactor later...

        getConnection()
          .createQueryBuilder()
          .insert()
          .into(Vote)
          .values([{ user: user, activity: activity[0] }])
          .execute();
        const voteCount = (activity[0]['voteCount'] += 1);
        getConnection()
          .createQueryBuilder()
          .update(Activity)
          .set({
            voteCount: voteCount,
          })
          .where('id =:id', { id: id })
          .execute();
        return 'Upvotes!';
      } finally {
      }
    }
  }

  // // async getVotes(id: number): Promise<number> {
  // //   const query = await this.projectRepository.findOne(id, {
  // //     relations: ['voteCount'],
  // //   });
  // //   const voteCount = query.voteCount;
  // //   return voteCount;
  // // }

  async createComment(projectId: string, comment: createCommentDto) {
    const project = await this.projectRepository.findOne(projectId);
    const user = await getConnection()
      .getRepository(User)
      .findOne(comment.user);
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

  async getUsersVoted(projectId: string) {
    const users = await Activity.find({
      relations: ['votes'],
      where: { project: { id: projectId } },
    });
    return users[0]['votes'];
  }

  async getVoteOnProject(projectId: string) {
    const voteCount = await Activity.find({
      where: { project: { id: projectId } },
    });
    return voteCount[0]['voteCount'];
  }
}
