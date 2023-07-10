import { Injectable, UnauthorizedException } from '@nestjs/common';

import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersEntity } from 'src/users/Dto/users.entity/users.entity';
import { Repository } from 'typeorm';

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

    async validate(payload: any): Promise<UsersEntity> {
        console.log('validate');
        const { mail } = payload;
        const user: UsersEntity = await this.userRepository.findOneBy({ mail });

        if (!user) throw new UnauthorizedException();
        return user;
    }
}