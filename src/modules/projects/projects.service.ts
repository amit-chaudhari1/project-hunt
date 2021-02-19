import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { create } from 'node:domain';
import { crateProjectDto } from './createProject.dto';
import { ProjectRepository } from './projects.repository';

@Injectable()
export class ProjectsService {
  @InjectRepository(ProjectRepository)
  private projectRepository: ProjectRepository;

  async createProject(crateProjectDto: crateProjectDto) {
    const createdProject = await this.projectRepository
      .create(crateProjectDto)
      .save();
    return createdProject;
  }
  async getProjectById(id: string) {
    return await this.projectRepository.findOne(id);
  }
  async getSortBy(option: string) {
    switch (option) {
      case 'createdAt':
        return await this.projectRepository
          .createQueryBuilder('project')
          .orderBy('project.createdAt', 'DESC')
          .execute();
        break;
      case 'popular':
        //TODO : Query to sort as per votes
        break;
    }
  }
}
