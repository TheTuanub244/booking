import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ROLE } from './enum/role.enum';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
@UseGuards(RolesGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
  @Post('/create-user')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE.ADMIN)
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
  @Post('/sign-up')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.userService.signUp(createUserDto);
  }
  @Post('/sign-up-with-email')
  async signUpWithEmail(@Body() signup: any) {
    return this.userService.signUpWithEmail(signup);
  }
  @Post('/sign-in')
  async signIn(@Body() user: any) {
    return this.userService.signIn(user);
  }
  @Post('/sign-in-with-email')
  async signInWithEmail(@Body() signIn: any) {
    return this.userService.signInWithEmail(signIn);
  }
  @Post('/update-user')
  @Roles(ROLE.ADMIN, ROLE.MEMBER)
  async updateUser(@Body() user: any) {
    return this.userService.updateUser(user);
  }
  @Get('find-user')
  @UseGuards(JwtAuthGuard)
  async findUser(@Body() user: any) {
    return 'help'
  }
  @Post('reset-password')
  async resetPassword(@Body() email: any) {
    return this.userService.resetPassword(email);
  }
}
