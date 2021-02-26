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
import { User } from './../../entities/user.entity';
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
  @Get('user/popular')
  async getPopularUser() {
    return this.userService.getPopularUsers();
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
  async updateUserData(@Body() updateUserdto: createUserDto, userid: string) {
    return this.userService.updateUser(updateUserdto, userid);
  }

  @Delete(':id/delete')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @Get(':userId/comments')
  async getCommentsByUserId(
    @Param('userId') userId: string,
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.userService.getCommentsByUserId(userId, {
      page,
      limit,
      route: 'http://0.0.0.0:3000/users',
    });
  }

  @Get(':id/projects')
  async getUserProjects(@Param('id') id: string) {
    return this.userService.getUserProject(id);
  }

  @Get(':id/votes')
  async getUsersvotes(@Param('id') id: string) {
    return this.userService.getAllUsersProjectsVotes(id);
  }
  @Get(':id/projectVotedOn')
  async getAllProjectsUserVotedOn(@Param('id') id: string) {
    return await this.userService.getAllProjectsUserUpvotedOn(id);
  }
  //   @Get(':id/projects')
  //   async getUserProjects(@Param('id', ParseIntPipe) id: number) {
  //     return this.userService.getUserProject(id);
  //   }
}
