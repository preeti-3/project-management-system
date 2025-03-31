import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from "src/prisma/prisma.service";
import { CreateProjectsDto } from "./dto/create.dto";
import { Prisma } from '@prisma/client';
import { UpdateProjectsDto } from './dto/update.dto';

@Injectable()
export class ProjectService {
    constructor(private readonly prisma: PrismaService) {}

    // ✅ Create Project
    async createProject(data: CreateProjectsDto) {
        const { name, description, assignedTo, departments } = data;

        if (!departments?.length) {
            throw new BadRequestException("At least one department is required for a project.");
        }

        try {
            return await this.prisma.projects.create({
                data: {
                    name,
                    description,
                    department: { connect: { id: departments[0] } },
                    assignedTo: assignedTo?.length
                        ? {
                            create: assignedTo.map(userId => ({
                                user: { connect: { id: userId } }
                            }))
                        }
                        : undefined
                },
                include: {
                    department: true,
                    assignedTo: { include: { user: true } }
                }
            });
        } catch (error) {
            this.handlePrismaErrors(error);
        }
    }

    // ✅ Get Project by ID
    async getProjectById(id: number) {
        return await this.prisma.projects.findUnique({
            where: { id },
            include: {
                department: true,
                assignedTo: { include: { user: true } }
            }
        });
    }

    // ✅ Update Project
    async updateProject(id: number, data: UpdateProjectsDto) {
        const { name, description, assignedTo, departments } = data;

        try {
            // Check if project exists
            const existingProject = await this.prisma.projects.findUnique({ where: { id } });
            if (!existingProject) {
                throw new NotFoundException(`Project with ID ${id} not found.`);
            }

            return await this.prisma.projects.update({
                where: { id },
                data: {
                    name,
                    description,
                    department: departments?.length ? { connect: { id: departments[0] } } : undefined,
                    assignedTo: assignedTo?.length
                        ? {
                            deleteMany: {}, // Clear previous assignments
                            create: assignedTo.map(userId => ({
                                user: { connect: { id: userId } }
                            }))
                        }
                        : undefined
                },
                include: {
                    department: true,
                    assignedTo: { include: { user: true } }
                }
            });
        } catch (error) {
            this.handlePrismaErrors(error);
        }
    }

    // 🔥 Handle Prisma Errors
    private handlePrismaErrors(error: any) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2003') { // Foreign key constraint failed
                throw new BadRequestException("Invalid user or department ID provided.");
            }
        }
        throw new InternalServerErrorException("Database operation failed.");
    }
}
