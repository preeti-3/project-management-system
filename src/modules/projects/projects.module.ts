import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ProjectService } from "./projects.service";
import { ProjectsController } from "./projects.controller";

@Module({
    providers: [ProjectService, PrismaService],
    controllers: [ProjectsController],
})

export class ProjectsModule {}
