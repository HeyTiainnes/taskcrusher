import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { UsersEntity } from 'src/users/Dto/users.entity/users.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UsersEntity)
        private userRepository: Repository<UsersEntity>,
    ) {
        super({
            constructor(configService: ConfigService) {
                secretOrKey: configService.get<string>("SECRET_KEY")
            },
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
        });
    }

    // IMPORTANT IL FAUT GARDER CE NOM DE METHODE
    async validate(payload: any) {
        console.log('validate');
        const { name } = payload;
        const user = await this.userRepository.findOneBy({ name });
        if (user) {
            const { password, ...result } = user;
            return result;
        } else {


            throw new UnauthorizedException();
            return user;
        }
    }
}