import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ROLE } from './enum/role.enum';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
  @Post('/create-user')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
  @Post('/sign-up')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.userService.signUp(createUserDto);
  }
  @Post('/sign-in')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async signIn(@Body() user: any) {
    return this.userService.signIn(user);
  }
}
