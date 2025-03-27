import { createZodDto } from "nestjs-zod";
import { z } from "zod";

const CreateUserSchema = z.object({
    name: z.string().min(3, "Name is required"),
    email: z.string().email(),
    password: z.string().min(6, "Password is required"),
    role: z.enum(["ADMIN", "USER"]).default("USER"),
});

export class CreateUserDto extends createZodDto(CreateUserSchema) {}
