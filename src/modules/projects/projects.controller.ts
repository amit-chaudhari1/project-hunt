import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { SimpleConsoleLogger } from 'typeorm';
import { createProjectDto } from './createProject.dto';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}
  @Post()
  async createProject(@Body() createProjectDto: createProjectDto) {
    console.log(createProjectDto);
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
}
