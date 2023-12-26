import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { MyConfigService } from 'src/config/config.service';

// JwtStrategy uses Passport and JWT to handle user sessions

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private readonly configService: MyConfigService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.getJWTKey()
        })
    }
    async validate(payload: any) {
        return { userId: payload.sub, username: payload.username };
    }
}