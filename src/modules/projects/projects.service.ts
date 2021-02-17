import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectRepository } from './projects.repository';

@Injectable()
export class ProjectsService {
  @InjectRepository(ProjectRepository)
  private projectRepository: ProjectRepository;

  async getAllProjects() {
    return this.projectRepository.find();
  }

  // async getProjectById(projectId) {
  //   return this.projectRepository.findByIds(projectId);
  // }
}
