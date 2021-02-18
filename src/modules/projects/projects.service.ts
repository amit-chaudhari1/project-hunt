import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectModel } from './project.model';
import { ProjectRepository } from './projects.repository';

@Injectable()
export class ProjectsService {
  @InjectRepository(ProjectRepository)
  private projectRepository: ProjectRepository;

  async createProject(projectModel : ProjectModel) {
    return await this.projectRepository.createQueryBuilder().insert();
  }
  async getProjectById(id : string) {
    return await this.projectRepository.findOne(id);
  }
  async getSortBy(option : string){
    switch(option){
      case 'createdAt' : return await this.projectRepository
      .createQueryBuilder("project")
      .orderBy("project.createdAt", "DESC")
      .execute();
      break;
      case 'popular' : 
      //TODO : Query to sort as per votes
      break; 
    }

  }
}
