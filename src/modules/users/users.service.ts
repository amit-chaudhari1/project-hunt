import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { createUserDto } from './createUser.dto';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { User } from './../../entities/user.entity';
import { Comment } from 'src/entities/comment.entity';
import { getRepository } from 'typeorm';

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
  async updateUser(updateUser: createUserDto, id: number) {
    return await this.userRepository
      .createQueryBuilder('user')
      .update()
      .set(updateUser)
      .where('id = :id', { id: id })
      .execute();
  }

  async deleteUser(id: number) {
    return this.userRepository
      .createQueryBuilder('user')
      .where('id = :id', { id: id })
      .delete()
      .execute();
  }
  async getCommentsByUserId(userId: number) {
    return await getRepository(Comment)
      .createQueryBuilder('comment')
      .select(['comment.title', 'comment.body'])
      .where(`comment.user = ${userId}`)
      .getMany();
  }
  //I'm working on these
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
  // async getUsersVotes(id:number):Promise<Projects[]> {
  //   return;
  // }
}
