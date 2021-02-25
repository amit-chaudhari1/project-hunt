import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { createUserDto } from './createUser.dto';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { getManager, getRepository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { Comment } from 'src/entities/comment.entity';
import { Vote } from 'src/entities/vote.entity';
import { Activity } from 'src/entities/activity.entity';
import { Project } from 'src/entities/project.entity';
//TODO:solve the relative path problem
@Injectable()
export class UsersService {
  @InjectRepository(UserRepository)
  private userRepository: UserRepository;
  //DONE:###################################

  async getAllUser(
    options: IPaginationOptions,
    orderBy: string,
  ): Promise<Pagination<User>> {
    const findusers = this.userRepository.createQueryBuilder('user');
    findusers.orderBy('user.' + orderBy, 'ASC');
    return paginate<User>(findusers, options);
  }

  async findUserById(id: string) {
    return await this.userRepository.find({ where: { id: id } });
  }

  //TODO:Future Feature for search implemtation
  async findUserByName(firstname: string, lastname: string) {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.firstName= like %:fname% OR user.lastName = %:lname%', {
        fname: firstname,
        lname: lastname,
      })
      .execute();
  }

  async createUser(createUserDto: createUserDto) {
    return await this.userRepository
      .createQueryBuilder('user')
      .insert()
      .values(createUserDto)
      .execute();
  } //TODO: test if above function works

  async updateUser(updateUser: createUserDto, id: string) {
    return await this.userRepository
      .createQueryBuilder('user')
      .update()
      .set(updateUser)
      .where('id = :id', { id: id })
      .execute();
  }

  async deleteUser(id: string) {
    return this.userRepository
      .createQueryBuilder('user')
      .where('id = :id', { id: id })
      .delete()
      .execute();
  }

  async getCommentsByUserId(userId: string, options: IPaginationOptions) {
    const commentsQuery = getRepository(Comment)
      .createQueryBuilder('comment')
      .where('comment.user = :userId', { userId: userId });

    return await paginate(commentsQuery, options);
  }

  async getUserProject(id: string) {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id: id })
      .leftJoinAndSelect('user.projects', 'project')
      .getMany();
  }
  // async getUserProject(id: number): Promise<Project[]> {
  //   const q = this.userRepository
  //     .createQueryBuilder('user')
  //     .where('user.id = :id', { id: id })
  //     .select(['user.project'])
  //     .getMany();
  //   return q;
  // }
  // async getUsersComments(id:number): Promise<Comment[]> {
  //   return;
  // }
  async getAllUsersProjectsVotes(userId : string) {
    let sumOfVote =0;
    const projectIds = await getManager().query(`SELECT "projectId" FROM project_users_user WHERE "userId"=`+ '\'' + userId + '\' ;');
    console.log(projectIds);
    let voteCounts; 
    Object.entries(projectIds).forEach(
      async projectIds =>{
      voteCounts = await Activity.find({select : ["voteCount"],where : {project:{id : projectIds[1]["projectId"]}}});
      console.log(voteCounts);
      
      try{
        var temp = await voteCounts[0]["voteCount"];
        sumOfVote +=  temp;
        console.log(sumOfVote)


      }
      catch{}
    });
    console.log(sumOfVote)
    //TODO: sumOfVote is intialized to 0 even after calculating sum;
    return sumOfVote;
  }

  getAllProjectsUserUpvotedOn(userId : string){
    return getManager().query(`SELECT "activityId" FROM vote WHERE "userId"= `+ '\'' + userId + '\' ;');
    }
  // async getUsersVotes(id: number): Promise<number> {
  //   //SUM UP all the votes on the projects of that user and return the total value for a user.
  //   return 12;
  // }
  }