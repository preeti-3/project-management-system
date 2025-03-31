import { createZodDto } from "nestjs-zod";
import { z } from "zod";

const CreateProjectsSchema = z.object({
    name: z.string().min(3, "Name is required"),
    description: z.string().min(10, "Description is required"),
    assignedTo: z.array(z.number()).optional(),
    departments: z.array(z.number()).optional(),
})

export class CreateProjectsDto extends createZodDto(CreateProjectsSchema) {}