// import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
// import { CreateAuthDto } from './dto/create-auth.dto';
// import * as bcrypt from 'bcrypt';
// import { InjectRepository } from '@nestjs/typeorm';
// import { UsersEntity } from 'src/users/Dto/users.entity/users.entity';
// import { Repository } from 'typeorm';
// import { LoginDto } from './dto/login.dto';
// import { JwtService } from '@nestjs/jwt';
// import { UnauthorizedException } from '@nestjs/common/exceptions';

// // import { UpdateAuthDto } from './dto/update-auth.dto';

// @Injectable()
// export class AuthService {

//   constructor(
//     @InjectRepository(UsersEntity)
//     private userRepository: Repository<UsersEntity>,
//     private jwtService: JwtService,
//   ) { }


//   async register(createAuthDto: CreateAuthDto) {
//     const { name, mail, password } = createAuthDto;

//     // hashing password
//     const salt = await bcrypt.genSalt();
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // creation d'une entity user
//     const user = this.userRepository.create({
//       name,
//       mail,
//       password: hashedPassword,

//     })

//     try {
//       // Enregistrement de l'entite user
//       const createdUser = await this.userRepository.save(user);
//       delete createdUser.password;
//       return createdUser;
//     } catch (error) {
//       // gestion des erreurs

//       if (error.code === '2305') {
//         throw new ConflictException('utilisateur existe deja');


//       } else {
//         throw new InternalServerErrorException();
//       }
//     }
//   }
//   async login(loginDto: LoginDto) {
//     const { name, password } = loginDto;
//     const user = await this.userRepository.findOneBy({ name });

//     if (user && (await bcrypt.compare(password, user.password))) {
//       const payload = { name };
//       const accesToken = await this.jwtService.sign(payload);

//       return { accesToken };
//     } else {
//       throw new UnauthorizedException(
//         'Ces identifiants ne sont pas bon...',
//       );
//     }

//   }

// }

import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/users/Dto/users.entity/users.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

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
    });

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

  async login(loginDto: LoginDto): Promise<{ accesToken: string; user: any }> {
    const { name, password } = loginDto;
    const user = await this.userRepository.findOne({ where: { name } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { name };
      const accesToken = await this.jwtService.sign(payload);

      // Supprimez le mot de passe des données de l'utilisateur avant de le renvoyer
      delete user.password;

      // Ajoutez les données de l'utilisateur à la réponse
      return { accesToken, user };
    } else {
      throw new UnauthorizedException(
        'Ces identifiants ne sont pas bon...',
      );
    }
  }
}
