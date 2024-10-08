import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Date } from 'mongoose';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    userName: string;
    @IsString()
    @IsNotEmpty()
    password: string;
}
