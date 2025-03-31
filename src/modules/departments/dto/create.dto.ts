import { createZodDto } from "nestjs-zod";
import { z } from "zod";

const CreateDepartmentSchema = z.object({
    name: z.string().min(3, "Name is required"),
    description: z.string().min(10, "Description is required"),
    users: z.array(z.number()).optional(),
    projects: z.array(z.number()).optional(),
})

export class CreateDepartmentDto extends createZodDto(CreateDepartmentSchema) {}