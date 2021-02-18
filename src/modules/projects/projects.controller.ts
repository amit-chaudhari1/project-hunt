import { Controller, Get, Post , Body, Param, Query} from '@nestjs/common';
import { query } from 'express';
import { ProjectModel } from './project.model';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}
  @Post()
  async createProject(@Body() projectModel: ProjectModel) {
    return await this.projectService.createProject(projectModel);
  }

  @Get(':id')
  async findProjectByID(@Param('id') id: string) {
    return await this.projectService.getProjectById(id);
  }
  @Get('')
  async getSortBy(@Query() query: string)
  {
    return await this.projectService.getSortBy(query);
  }
}
