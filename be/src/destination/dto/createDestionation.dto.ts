import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDestinationDto {
  @IsString()
  @IsNotEmpty()
  province: string;
  @IsString()
  @IsNotEmpty()
  city: string;
}
