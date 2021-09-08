import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'src/config/typeorm.config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtStrategy } from './jwt-strategy';
import { UserRepository } from './user.repository';
import * as config from 'config';
require('dotenv').config()


const jwtConfig = config.get('jwt')
@Module({
  imports: [
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register(
      {
        secret: process.env.JWT_SECRET || jwtConfig.secret,
        signOptions: {
          expiresIn: process.env.EXPIRES || jwtConfig.expiresIn,
        }
      }
      ),
    TypeOrmModule.forFeature([UserRepository])
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    jwtStrategy,
  ],
  exports: [
    jwtStrategy,
    PassportModule
  ]
})
export class AuthModule {}
