import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import generateToken from '../common/auth/generate.token';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) { }

    async signup(data: SignupDto) {
        const { name, email, password, role } = data;
        // Check if user already exists
        const existingUser = await this.prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            throw new BadRequestException('User with this email already exists');
        }

        // Create user
        const user = await this.prisma.user.create({
            data: { name, email, password, role },
        });

        return { message: 'User registered successfully', user };
    }

    async login(data: LoginDto) {
        const { email, password } = data;

        // Find user by email
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        if (password !== user.password) {
            throw new UnauthorizedException('Invalid credentials');
        }
        // Generate JWT token
        const token = await generateToken(user);

        return { message: 'Login successful', token };
    }


    async findAllUser() {
        // Find user by email
        const user = await this.prisma.user.findMany();
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return this.prisma.user.findMany();
    }
}
