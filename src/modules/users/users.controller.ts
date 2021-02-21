import {
  Param,
  ParseIntPipe,
  Put,
  Query,
  Body,
  Controller,
  Get,
  Post,
  Delete,
} from '@nestjs/common';
import { User } from 'src/entities/user.entity';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createUserDto } from './createUser.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Post()
  async createUser(@Body() createUserDto: createUserDto) {
    return this.userService.createUser(createUserDto);
  }
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User[]> {
    return this.userService.findUserById(id);
  }
  @Get()
  async getAllUsers(
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 10,
    @Query('orderBy') order = 'username',
  ): Promise<Pagination<User>> {
    limit = limit > 100 ? 100 : limit;
    return this.userService.getAllUser(
      {
        page,
        limit,
        route: 'http://0.0.0.0:3000/users',
      },
      order,
    );
  }
  @Put()
  async updateUserData(@Body() updateUserdto: createUserDto, userid: number) {
    return this.userService.updateUser(updateUserdto, userid);
  }
  @Delete(':id/delete')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }
  @Get(':id/comments')
  async getCommentsByUserId(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getCommentsByUserId(id);
  }

  @Get(':id/projects')
  async getUserProjects(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserProject(id);
  }
  // @Get(':id/votes')
  // async getUsersvotes(@Param('id', ParseIntPipe) id: number) {
  //   return this.userService.getUserVotes(id);
  // }
  //   @Get(':id/projects')
  //   async getUserProjects(@Param('id', ParseIntPipe) id: number) {
  //     return this.userService.getUserProject(id);
  //   }
}
