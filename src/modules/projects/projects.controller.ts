import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { get } from 'http';
import { SimpleConsoleLogger } from 'typeorm';
import { createProjectDto } from './createProject.dto';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}
  @Post()
  async createProject(@Body() createProjectDto: createProjectDto) {
    return await this.projectService.createProject(createProjectDto);
  }

  @Get(':id')
  async findProjectByID(@Param('id') id: string) {
    return await this.projectService.getProjectById(id);
  }

  @Get('')
  async getSortBy(@Query() query: string) {
    return await this.projectService.getSortBy(query);
  }

  // @Get(':id')
  // async getVotes(@Param('id', ParseIntPipe) id: number): Promise<number> {
  //   return await this.projectService.getVotes(id);
  // }

  @Get(':id/upvote')
  async upvote(
    @Param('id', ParseIntPipe) id: number,
    @Query('userid', ParseIntPipe) userid: number,
  ) {
    return this.projectService.upvote(userid, id);
  }
}
