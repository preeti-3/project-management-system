import { createZodDto } from "nestjs-zod";
import { z } from "zod";

const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

export class LoginDto extends createZodDto(LoginSchema) {}
