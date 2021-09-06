import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCredentialsDTO } from './dto/user-credentials.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    private logger = new Logger(`auth service`);
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,

        private jwtService: JwtService,
    ){}

    async singUp(userCredentialsDTO: UserCredentialsDTO):Promise<void>{
        return await this.userRepository.signUp(userCredentialsDTO);
    }

    async signIn(userCredentialsDTO: UserCredentialsDTO): Promise<object>{
        const username = await this.userRepository.validateUserPassword(userCredentialsDTO);
        if(!username){
            throw new UnauthorizedException('Invalid Credentials');
        }
        const payload = { username };
        const accessToken = await this.jwtService.sign(payload);
        this.logger.debug(`created JWT token with payload: ${JSON.stringify(payload)}`)

        return { accessToken };
    }
}
