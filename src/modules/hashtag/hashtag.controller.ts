import { Controller, Get } from '@nestjs/common';
import { HashtagService } from './hashtag.service';

@Controller('hashtag')
export class HashtagController {
  constructor(private readonly hashtagService: HashtagService) {}
  @Get()
  async getAllHashtags() {
    return await this.hashtagService.getAllHashtags();
  }
}
