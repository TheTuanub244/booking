import { Body, Controller, Get, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ROLE } from './enum/role.enum';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Response } from 'express';
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
  async signIn(@Body() user: any, @Res() response: Response) {
    const data = await this.userService.signIn(user);
    response.cookie('refreshToken', data.refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return response.status(HttpStatus.OK).json({
      _id: data._id,
      accessToken: data.access_token,
      refreshToken: data.refreshToken,
      message: 'Login successful',
    });
  }
  @Post('/check-email')
  async checkEmail(@Body() email: any) {

    return this.userService.checkEmail(email.data)
  }
  @Post('update-password')
  async updatePassword(@Body() password: any) {
    return this.userService.updatePassword(password.password, password.email)
  }
  @Post('/sign-in-with-google')
  async signInWithEmail(@Body() user: any, @Res() response: Response) {
    const data = await this.userService.signInWithGoggle(user);
    response.cookie('refreshToken', data.refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    return response.status(HttpStatus.OK).json({
      _id: data._id,
      message: 'Login successful',
    });
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
  async resetPassword(@Body() resetPassword: any) {
    return this.userService.resetPassword(resetPassword);
  }
}
