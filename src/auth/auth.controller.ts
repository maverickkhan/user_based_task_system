import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserCredentialsDTO } from './dto/user-credentials.dto';
// import { GetUser } from './get-user.dectorator';
// import { User } from './user.entity';

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

    // @Post('test')
    // @UseGuards(AuthGuard())
    // // test(@Req() req)
    // test(@GetUser() user: User)
    // {
    //     console.log(user)
    // }
}
