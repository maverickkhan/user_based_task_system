import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { UserCredentialsDTO } from "./dto/user-credentials.dto";
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async signUp(userCredentialsDTO: UserCredentialsDTO):Promise<void>{
        const {username, password} = userCredentialsDTO;
        const user = new User();
        user.username = username;
        user.salt = await bcrypt.genSalt();;
        user.password = await this.hashPassword(password, user.salt);
        try {
            await user.save();
        } catch (error) {
            if (error.code === '23505') //Duplicate username
            {
                throw new ConflictException('Username Already Exist');
            }
            else {
                throw new InternalServerErrorException();
            }
        }
    }


    async validateUserPassword(userCredentialsDTO: UserCredentialsDTO): Promise<string>{
        const {username, password} = userCredentialsDTO;
        const user = await this.findOne({username});

        if (user && await user.validatePassword(password)){
            return user.username;
        } else {
            return null;
        }
    }

    async hashPassword(password: string, salt: string):Promise<string>{
        return bcrypt.hash(password, salt);
    }
}