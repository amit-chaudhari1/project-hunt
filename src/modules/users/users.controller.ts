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
  getAllUsers(): string[] {
    return this.userService.getAllUsers();
  }
  /**
   * GET /user/id
   * @param id
   */
  @Get(':id')
  getUserById(@Param('id') id): string {
    return this.userService.getUserById(id);
  }
}
