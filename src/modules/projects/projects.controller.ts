import { Controller, Get } from '@nestjs/common';
import {ProjectsService} from './projects.service'

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectService: ProjectsService){}
        @Get()
        getAllProjects() : string[]{
            return this.projectService.getAllProjects();
        }

    }

