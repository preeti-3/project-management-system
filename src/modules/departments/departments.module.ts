import { Module } from "@nestjs/common";
import { DepartmentsService } from "./departments.service";
import { DepartmentsController } from "./departments.controller";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
    imports: [],
    providers: [DepartmentsService, PrismaService],
    controllers: [DepartmentsController],
})

export class DepartmentsModule { }