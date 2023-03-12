import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/users/Dto/users.entity/users.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common/exceptions';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
    private jwtService: JwtService,
  ) { }


  async register(createAuthDto: CreateAuthDto) {
    const { name, mail, password } = createAuthDto;

    // hashing password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // creation d'une entity user
    const user = this.userRepository.create({
      name,
      mail,
      password: hashedPassword,

    })

    try {
      // Enregistrement de l'entite user
      const createdUser = await this.userRepository.save(user);
      delete createdUser.password;
      return createdUser;
    } catch (error) {
      // gestion des erreurs

      if (error.code === '2305') {
        throw new ConflictException('utilisateur existe deja');


      } else {
        throw new InternalServerErrorException();
      }
    }
  }
  async login(loginDto: LoginDto) {
    const { name, password } = loginDto;
    const user = await this.userRepository.findOneBy({ name });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { name };
      const accesToken = await this.jwtService.sign(payload);

      return { accesToken };
    } else {
      throw new UnauthorizedException(
        'Ces identifiants ne sont pas bon...',
      );
    }

  }

}

