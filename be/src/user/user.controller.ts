import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ROLE } from './enum/role.enum';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Response } from 'express';
import { ValidateTokenGuard } from 'src/common/guards/validateToken.guard';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
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
    console.log(signup);

    return this.userService.signUpWithEmail(signup);
  }
  @Post('/confirm-signup')
  async confirmSignUpWithEmail(@Body() signup: any) {
    return this.userService.confirmSignUp(signup);
  }
  @Post('/sign-in')
  async signIn(@Body() user: any, @Res() response: Response) {
    const data = await this.userService.signIn(user);
    response.cookie('refreshToken', data.refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return response.status(HttpStatus.OK).json({
      _id: data._id,
      accessToken: data.access_token,
      displayName: data.displayName,
      refreshToken: data.refreshToken,
      message: 'Login successful',
    });
  }
  @Post('/check-email')
  async checkEmail(@Body() email: any) {
    return this.userService.checkEmail(email.data);
  }
  @Post('update-password')
  async updatePassword(@Body() password: any) {
    return this.userService.updatePassword(password.password, password.email);
  }
  @Post('/sign-in-with-google')
  async signInWithEmail(@Body() user: any, @Res() response: Response) {
    const data = await this.userService.signInWithGoggle(user);
    response.cookie('refreshToken', data.refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return response.status(HttpStatus.OK).json({
      _id: data._id,
      accessToken: data.access_token,
      message: 'Login successful',
    });
  }
  @Post('/update-user')
  @Roles(ROLE.ADMIN, ROLE.MEMBER)
  async updateUser(@Body() user: any) {
    return this.userService.updateUser(user);
  }

  @Post('reset-password')
  async resetPassword(@Body() resetPassword: any) {
    return this.userService.resetPassword(resetPassword);
  }
  @Post('updatePartnerAccount')
  async updatePartnerAccount(@Body() partner: any) {
    return this.userService.updatePartnerAccount(partner.partner);
  }
  @Post('updateInformationForGoogle')
  async updateInformationForGoogle(
    @Body() user: any,
    @Res() response: Response,
  ) {
    const data = await this.userService.updateInformationForGoogle(user.user);
    response.cookie('refreshToken', data.refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return response.status(HttpStatus.OK).json({
      _id: data._id,
      accessToken: data.access_token,
      refreshToken: data.refreshToken,
      message: 'Login successful',
    });
  }
  @Get('getPendingUser')
  async getPendingUser() {
    return this.userService.getPendingUser();
  }
  @Get('requestToPartner/:id')
  async requestTopartner(@Param('id') id: string) {
    return this.userService.requestToPartner(id);
  }

  @Get('checkRequest/:id')
  async checkRequest(@Param('id') id: string) {
    return this.userService.checkRequestPartner(id);
  }
  @Get('updateResetPasswordToken')
  async updateResetPasswordToken(
    @Query('userId') userId: string,
    @Query('email') email: string,
  ) {
    return this.userService.updateResetPasswordToken(userId, email);
  }
  @Post('checkResetPasswordToken')
  async checkResetPasswordToken(
    @Query('userId') userId: string,
    @Query('token') token: string,
    @Body() user: any,
  ) {
    return this.userService.checkResetPasswordToken(
      userId,
      user.password,
      token,
    );
  }
  @UseGuards(ValidateTokenGuard, RolesGuard)
  @Roles(ROLE.ADMIN)
  @Put('updateRequestPartner')
  async updateRequestPartner(@Body() data: any) {
    return this.userService.updateRequestPartner(data.userId, data.status);
  }
  @UseGuards(ValidateTokenGuard, RolesGuard)
  @Roles(ROLE.ADMIN)
  @Get('getAllUser')
  async getAllUser() {
    return this.userService.getAllUser();
  }
}
