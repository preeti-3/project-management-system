import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './modules/auth/auth.module';
import { DepartmentsModule } from './modules/departments/departments.module';

@Module({
  imports: [AuthModule, DepartmentsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
