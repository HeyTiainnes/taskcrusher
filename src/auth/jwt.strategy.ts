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
            secretOrKey: 'krakoukass',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    // IMPORTANT IL FAUT GARDER CE NOM DE METHODE
    async validate(payload: any): Promise<UsersEntity> {
        console.log('validate');
        const { name } = payload;
        const user: UsersEntity = await this.userRepository.findOneBy({ name });

        if (!user) throw new UnauthorizedException();
        return user;
    }
}