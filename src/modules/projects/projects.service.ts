import { Injectable } from '@nestjs/common';
import { PrismaService } from "src/prisma/prisma.service";
import { CreateProjectsDto } from "./dto/create.dto";

@Injectable()
export class ProjectService {
    constructor(private readonly prisma: PrismaService) { }  // Ensure prisma is injected

    async createProject(data: CreateProjectsDto) {
        const { name, description, assignedTo, departments } = data;

        if (!departments?.length) {
            throw new Error("At least one department is required for a project.");
        }

        return this.prisma.projects.create({
            data: {
                name,
                description,
                department: {
                    connect: { id: departments[0] } // Since only one department per project
                },
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
                assignedTo: {
                    include: { user: true }
                }
            }
        });
    }
}
