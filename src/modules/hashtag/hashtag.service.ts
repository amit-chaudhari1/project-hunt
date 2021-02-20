import { Get, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HashTagRepository } from './hashtag.repository';

@Injectable()
export class HashtagService {
  @InjectRepository(HashTagRepository)
  private hashTagRepository: HashTagRepository;

  async getAllHashtags() {
    return await this.hashTagRepository.find();
  }
}
