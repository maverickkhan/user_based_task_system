import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator"

export class UserCredentialsDTO {
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string

    @IsNotEmpty()
    @IsString()
    @MinLength(8, {message: `Password Must Be Longer Than 8 Characters`})
    @MaxLength(20, {message: `Password Must Be Less Than 20 Characters`})
    @Matches(/((?=.*[a-z])(?=.*[A-Z]))/, {message: `Password Must Contain Upper Case Letter & Lower Case Letters`})
    @Matches(/((?=.*[0-9]))/, {message: `Password Must Contain a number from 0-9`})
    // @Matches("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})")
    // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: `Password Doesn't FullFill Required Parameters`})
    password: string
}