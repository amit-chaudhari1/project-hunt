import { Test, TestingModule } from '@nestjs/testing';
import { HashtagController } from './hashtag.controller';
import { HashTagRepository } from './hashtag.repository';
import { HashtagService } from './hashtag.service';
describe('HashtagController', () => {
  let controller: HashtagController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HashtagController],
      providers: [HashtagService, HashTagRepository],
    }).compile();

    controller = module.get<HashtagController>(HashtagController);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
