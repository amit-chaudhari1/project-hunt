import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  @Post(':projectId/comments')
  async createComment(
    @Param('projectId') projectId: number,
    @Body('comment') comment: CreateCommentDto,
  ) {
    return this.projectService.createComment(projectId, comment);
  }

  @Get(':projectId/comments')
  async getCommentsByProjectId(@Param('projectId') projectId: number) {
    return this.projectService.getCommentsByProjectId(projectId);
  }
}
