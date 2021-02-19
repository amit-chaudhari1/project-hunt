import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { SimpleConsoleLogger } from 'typeorm';
import { crateProjectDto } from './createProject.dto';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}
  @Post()
  async createProject(@Body() crateProjectDto: crateProjectDto) {
    return await this.projectService.createProject(crateProjectDto);
  }

  @Get(':id')
  async findProjectByID(@Param('id') id: string) {
    return await this.projectService.getProjectById(id);
  }
  @Get('')
  async getSortBy(@Query() query: string) {
    return await this.projectService.getSortBy(query);
  }
}
