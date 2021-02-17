import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  /**
   * FOR getting all users
   * GET /users
   */
  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  /**
   * GET /user/id
   * @param id
   */
  @Get(':id')
  async getUserById(@Param('id') id) {
    return this.userService.getUserById(id);
  }
}
