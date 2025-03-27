import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [],
    providers: [AuthService, PrismaService, JwtService],
    controllers: [AuthController],
})
export class AuthModule { }
