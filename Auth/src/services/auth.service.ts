import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto, RegisterDTO } from 'src/dto/auth.dto';
import { Config } from 'src/helpers/config.helper';
import { AuthRepository } from 'src/repositories/auth.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(AuthRepository)
        public readonly authRepository: AuthRepository,
        private jwtTokenService: JwtService,
    ) {}

    async register(params: RegisterDTO) {
        try {
            const result = await this.authRepository.register(params);
            return result
        } catch (error) {
            throw error;
        }
    }

    async login(params: LoginDto) {
        try {
            const userLogin = await this.authRepository.login(params);

            const payload = {
                username: userLogin.username,
                role: userLogin.role,
            }

            const accessToken = await this.generateToken(payload);
            await this.authRepository.insertToken(payload.username,accessToken);

            return accessToken;
        } catch (error) {
            throw (error);
        }
    }

    async refreshToken(refreshToken: string) {
        try {
            const extractedToken = await this.jwtTokenService.decode(refreshToken);
            const generateToken = await this.generateToken({ username: extractedToken['username'], role: extractedToken['role'] });
            await this.authRepository.updateToken(extractedToken['username'], generateToken, refreshToken);
            return generateToken;
        } catch (error) {
            throw (error);
        }
    }


    async generateToken(payload: any) {
        const accessToken = this.jwtTokenService.sign(
            payload,
            {
                secret: Config.get('ACCESS_TOKEN_SECRET'),
                expiresIn: Config.get('ACCESS_TOKEN_EXPIRATION')
            }
        );
        const refreshToken = this.jwtTokenService.sign(
            payload,
            {
                secret: Config.get('REFRESH_TOKEN_SECRET'),
                expiresIn: Config.get('REFRESH_TOKEN_EXPIRATION')
            }
        );
        const extractedToken = this.jwtTokenService.decode(accessToken);
        return {
            access_token: accessToken,
            refresh_token: refreshToken,
            created_at: extractedToken['iat'],
            expired_at: extractedToken['exp'],
        };
    }
}
