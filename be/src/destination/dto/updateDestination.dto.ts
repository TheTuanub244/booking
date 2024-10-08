import { IsNotEmpty, IsString } from "class-validator";

export class UpdateDestinationDto {
    @IsNotEmpty()
    id: string
    @IsString()
    province: string;
    @IsString()
    city: string;
}