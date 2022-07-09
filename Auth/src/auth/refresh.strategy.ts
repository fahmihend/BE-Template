import { Req } from '@nestjs/common';
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Config } from '../helpers/config.helper';

export class RefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh'){
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: Config.get('REFRESH_TOKEN_SECRET'),
            passReqToCallback: true
        })
    }

    async validate(@Req() req, payload: any) {

        const refreshToken = req.Authorization.replace('Bearer ', '').trim();
        return {
            ...payload,
            refreshToken
        };
    }
}