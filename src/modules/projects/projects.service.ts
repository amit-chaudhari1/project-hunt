import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectsService {
    getAllProjects(): string[]{
        return ['project1' , 'project2']
    }

    getProjectById(projectId : number): string{
        return 'project' + projectId;
    }
}
