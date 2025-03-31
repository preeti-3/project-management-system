import { createZodDto } from "nestjs-zod";
import { z } from "zod";

const UpdateDepartmentSchema = z.object({
    name: z.string().min(3, "Name is required"),
    description: z.string().optional(),
    users: z.array(z.number()).optional(),
    projects: z.array(z.number()).optional(),
})

export class UpdateDepartmentDto extends createZodDto(UpdateDepartmentSchema) {}