import { Type } from "class-transformer";
import { CreateUserDto } from "src/user/dto/createUser.dto";

export class CreateSessionDto {
    userId: string
    data: string
}