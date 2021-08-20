import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCredentialsDTO } from './dto/user-credentials.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ){}

    async singUp(userCredentialsDTO: UserCredentialsDTO):Promise<void>{
        return await this.userRepository.signUp(userCredentialsDTO);
    }

    async signIn(userCredentialsDTO: UserCredentialsDTO){
        const username = await this.userRepository.validateUserPassword(userCredentialsDTO);
        if(!username){
            throw new UnauthorizedException('Invalid Credentials');
        } else if (username){
            return username
        }
    }
}
