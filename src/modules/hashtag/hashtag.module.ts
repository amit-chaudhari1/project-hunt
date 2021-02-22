import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashTag } from './../../entities/hashtags.entity';
import { HashtagService } from './hashtag.service';
import { HashtagController } from './hashtag.controller';

@Module({
  imports: [TypeOrmModule.forFeature([HashTag])],
  providers: [HashtagService],
  controllers: [HashtagController],
})
export class HashtagModule {}
