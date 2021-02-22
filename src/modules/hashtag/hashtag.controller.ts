import { Controller, Get } from '@nestjs/common';
import { HashtagService } from './hashtag.service';

@Controller('hashtags')
export class HashtagController {
  constructor(private readonly hashtagService: HashtagService) {}
  @Get()
  async getAllHashtags() {
    return await this.hashtagService.getAllHashtags();
  }
}

//  Add new hashtags manually
//  insert into hash_tag (tag) values ('React');
