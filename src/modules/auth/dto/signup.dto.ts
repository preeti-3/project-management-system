import { createZodDto } from "nestjs-zod";
import { z } from "zod";

const SignupSchema = z.object({
    name: z.string().min(3, "Name is required"),
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    role: z.enum(["SUPERADMIN", "ADMIN", "USER"]).default("USER"),
});

export class SignupDto extends createZodDto(SignupSchema) {}
