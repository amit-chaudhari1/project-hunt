import { Param } from '@nestjs/common';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createUserDto } from './createUser.dto';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Post()
  async createUser(@Body() createUserDto: createUserDto) {
    return this.userService.createUser(createUserDto);
  }
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    return this.userService.findUserById(id);
  }
  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUser();
  }
  @Post()
  async updateUserData(@Body() updateUserdto: createUserDto, userid: number) {
    return this.userService.updateUser(updateUserdto, userid);
  }
  //this is stupid and not secure at all
  @Get(':id/deactivate')
  async softDelete(@Param('id') id: number) {
    return this.userService.softDeleteUser(id);
  }
  @Get(':id/restore')
  async restoreDelete(@Param('id') id: number) {
    return this.userService.restoreUser(id);
  }

  //TODO: write Better Controllers.
}
