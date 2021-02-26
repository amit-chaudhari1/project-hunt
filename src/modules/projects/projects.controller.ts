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
import { createProjectDto, createCommentDto } from './createProject.dto';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}

  @Post()
  async createProject(@Body() createProjectDto: createProjectDto) {
    return await this.projectService.createProject(createProjectDto);
  }

  // @Get(':id')
  // async findProjectByID(@Param('id') id: string) {
  //   console.log('asdfasdfsad');
  //   return await this.projectService.getProjectById(id);
  // }
  @Get('popular')
  async getPopularProjects() {
    console.log('hellot');
    return await this.projectService.getPopularProjects();
  }

  @Get('')
  async getProjects(
    @Query('sortBy') sortBy: string,
    @Query('name') name: string,
    @Query('tag') tag: string,
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return await this.projectService.getProjects(sortBy, name, tag, {
      page,
      limit,
      route: 'http://0.0.0.0:3000/projects',
    });
  }

  // @Get(':id')
  // async getVotes(@Param('id', ParseIntPipe) id: number): Promise<number> {
  //   return await this.projectService.getVotes(id);
  // }

  @Get(':id/upvote')
  async upvote(@Param('id') id: string, @Query('userid') userid: string) {
    return this.projectService.upvote(userid, id);
  }

  @Post(':projectId/comments')
  async createComment(
    @Param('projectId') projectId: string,
    @Body('comment') comment: createCommentDto,
  ) {
    return this.projectService.createComment(projectId, comment);
  }

  @Get(':projectId/votes')
  async getVoteOnProject(@Param('projectId') projectId: string) {
    return this.projectService.getVoteOnProject(projectId);
  }

  @Get(':projectId/usersVoted')
  async getUsersVoted(@Param('projectId') projectId: string) {
    return this.projectService.getUsersVoted(projectId);
  }

  @Get(':projectId/comments')
  async getCommentsByProjectId(
    @Param('projectId') projectId: string,
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.projectService.getCommentsByProjectId(projectId, {
      page,
      limit,
      route: 'http://0.0.0.0:3000/projects',
    });
  }
}
