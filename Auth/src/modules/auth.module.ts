import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from 'src/controllers/auth.controller';
import { AuthRepository } from 'src/repositories/auth.repository';
import { AuthService } from 'src/services/auth.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([AuthRepository]),
        JwtModule.register({}),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
    ],
})
export class AuthModule { }