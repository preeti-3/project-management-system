import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateDepartmentDto } from "./dto/create.dto";

@Injectable()
export class DepartmentsService {
    constructor(private prisma: PrismaService) { }

    async createDepartment(data: CreateDepartmentDto) {
        const { name, description, users, projects } = data;
        return this.prisma.departments.create({
            data: {
                name,
                description,
                users: users ? { connect: users.map(userId => ({ id: userId })) } : undefined,
                projects: projects?.length
                    ? { connect: projects.map(projectId => ({ id: projectId })) }
                    : undefined,
            },
        });
    }
    async findAll() {
        const departments = await this.prisma.user.findMany();
        if (!departments) {
            throw new NotFoundException('Departments not found');
        }
        return this.prisma.departments.findMany();
    }
}