import { Body, Controller, Get, Post } from "@nestjs/common";
import { DepartmentsService } from "./departments.service";
import { CreateDepartmentDto } from "./dto/create.dto";

@Controller("departments")
export class DepartmentsController {
    constructor(private departmentService: DepartmentsService) { }

    @Post()
    createDepartment(@Body() body:CreateDepartmentDto) {
        return this.departmentService.createDepartment(body);
    }

    @Get()
    findAll() {
        return this.departmentService.findAll();
    }
}