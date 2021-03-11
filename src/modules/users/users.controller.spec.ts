import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { UserRepository } from './user.repository';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UserService, UserRepository],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
