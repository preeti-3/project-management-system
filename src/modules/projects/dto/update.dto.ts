import { createZodDto } from "nestjs-zod";
import { z } from "zod";

const UpdateProjectsSchema = z.object({
    name: z.string().min(3, "Name is required"),
    description: z.string().min(10, "Description is required").optional(),
    assignedTo: z.array(z.number()).optional(),
    departments: z.array(z.number()).optional(),
})

export class UpdateProjectsDto extends createZodDto(UpdateProjectsSchema) {}