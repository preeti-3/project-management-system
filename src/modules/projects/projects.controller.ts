import {
    Controller,
    Post,
    Get,
    Put,
    Param,
    Body,
    HttpStatus,
    HttpCode,
    NotFoundException,
    BadRequestException,
    InternalServerErrorException
} from '@nestjs/common';
import { ProjectService } from './projects.service';
import { CreateProjectsDto } from './dto/create.dto';
import { UpdateProjectsDto } from './dto/update.dto';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectService: ProjectService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createProject(@Body() data: CreateProjectsDto) {
        try {
            const project = await this.projectService.createProject(data);
            return {
                statusCode: HttpStatus.CREATED,
                message: 'Project created successfully',
                data: project,
            };
        } catch (error) {
            throw this.handleException(error);
        }
    }

    @Get(':id')
    async getProject(@Param('id') id: number) {
        try {
            const project = await this.projectService.getProjectById(id);
            if (!project) {
                throw new NotFoundException(`Project with ID ${id} not found.`);
            }
            return {
                statusCode: HttpStatus.OK,
                message: 'Project retrieved successfully',
                data: project,
            };
        } catch (error) {
            throw this.handleException(error);
        }
    }

    @Put(':id')
    async updateProject(@Param('id') id: number, @Body() data: UpdateProjectsDto) {
        try {
            const updatedProject = await this.projectService.updateProject(id, data);
            return {
                statusCode: HttpStatus.OK,
                message: 'Project updated successfully',
                data: updatedProject,
            };
        } catch (error) {
            throw this.handleException(error);
        }
    }

    // 🔥 Handle Exceptions
    private handleException(error: any) {
        if (error instanceof NotFoundException || error instanceof BadRequestException) {
            throw error;
        }
        throw new InternalServerErrorException('An unexpected error occurred.');
    }
}
