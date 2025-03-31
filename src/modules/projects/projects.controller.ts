import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { ProjectService } from './projects.service';
import { CreateProjectsDto } from './dto/create.dto';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectService: ProjectService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createProject(@Body() data: CreateProjectsDto) {
        return this.projectService.createProject(data);
    }
}
