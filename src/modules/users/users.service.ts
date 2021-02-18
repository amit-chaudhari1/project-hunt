import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { createUserDto } from './createUser.dto';

//TODO:solve the relative path problem
@Injectable()
export class UsersService {
  @InjectRepository(UserRepository)
  private userRepository: UserRepository;
  //--------------------
  async getAllUser() {
    return this.userRepository.find();
  }
  //-------------
  async findUserById(id: string) {
    return this.userRepository.findOne(id);
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
  //--------------
  async createUser(createUserDto: createUserDto) {
    return this.userRepository
      .createQueryBuilder('user')
      .insert()
      .values(createUserDto)
      .execute();
  } //TODO: test if above function works
  //-----------------
  async updateUser(updateUser: createUserDto, id: number) {
    return this.userRepository
      .createQueryBuilder('user')
      .update()
      .set(updateUser)
      .where('id = :id', { id: id })
      .execute();
  }

  async softDeleteUser(id: number) {
    return this.userRepository
      .createQueryBuilder()
      .softDelete()
      .where('id = :id', { id: id })
      .execute();
  }

  async hardDeleteuser(id: number) {
    return this.userRepository
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id: id })
      .execute();
  }
  async restoreUser(id: number) {
    return this.userRepository
      .createQueryBuilder()
      .restore()
      .where('id = :id', { id: id });
  }
}
