import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCredentialsDTO } from './dto/user-credentials.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('/signup')
    signup(@Body(ValidationPipe) userCredentialsDTO: UserCredentialsDTO){
        return this.authService.singUp(userCredentialsDTO);
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) userCredentialsDTO: UserCredentialsDTO){
        return this.authService.signIn(userCredentialsDTO);
    }
}
