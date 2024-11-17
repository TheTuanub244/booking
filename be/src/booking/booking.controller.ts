import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/createBooking.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { ROLE } from 'src/user/enum/role.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ObjectId } from 'mongoose';

@Controller('booking')
// @UseGuards(RolesGuard)
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}
  @Post('createBooking')
  // @Roles(ROLE.MEMBER)
  async createBooking(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.createBooking(createBookingDto);
  }
  @Get(`/getMonthlyRevenue/:id`)
  async getMonthlyRevenue(@Param('id') id: string) {
    return this.bookingService.getMonthlyRevenueByOwner(id);
  }
  @Get(`/getMonthlyRevenueByProperty/:id`)
  async getMonthlyRevenueByProperty(@Param('id') id: string) {
    return this.bookingService.getMonthlyRevenueByProperty(id);
  }
  @Get(`/getBooking/:id`)
  async getBooking(@Param('id') id: string){
    return this.bookingService.getBooking(id )
  }
}
