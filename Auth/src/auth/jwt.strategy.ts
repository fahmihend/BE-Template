import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Config } from '../helpers/config.helper';

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: Config.get('ACCESS_TOKEN_SECRET')
        })
    }

    async validate(payload: any) {
        return {
            username: payload.username, 
            password: payload.password
        }
    }
}