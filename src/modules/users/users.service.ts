import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
//TODO:solve the relative path problem
@Injectable()
export class UsersService {
  @InjectRepository(UserRepository)
  private userRepository: UserRepository;

  async getAllUsers() {
    return this.userRepository.find();
  }

  async getUserById(userId) {
    return this.userRepository.findByIds(userId);
  }

  /**
   * post users creates users, no auth yet
   *
   * get users userid returns a single user data. all of it
   *
   * get users userid projects returns all projects for that particular user.
   *
   * get user userid comments returns all the comments for that particular user.
   *
   */
}
