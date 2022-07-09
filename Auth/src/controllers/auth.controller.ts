import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto, RegisterDTO } from 'src/dto/auth.dto';
import { response, responseError } from 'src/helpers/response.helper';
import { AuthService } from 'src/services/auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        ) { }

    @Post('register')
    async register(
        @Body() body: RegisterDTO,
        ) {
        try {
            const result = await this.authService.register(body);
            return response('register success',result) 
        } catch (e) {
            return responseError(e.message);
        }
    }

    @Post('login')
    async login(
        @Body() payload: LoginDto,
        ) {
        try {
            const result = await this.authService.login(payload);
            return response('login success',result)
        } catch (e) {
            return responseError(e.message);
        }
    }

    @Post('refresh')
    async refresh(
        @Body() refreshToken: string,
        ) {
        try {
            const token = Object.values(refreshToken)[0]
            const result = await this.authService.refreshToken(token);
            return response('refresh success',result)
        } catch (e) {
            return responseError(e.message);
        }
    }
}
