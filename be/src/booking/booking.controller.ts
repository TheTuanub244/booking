import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
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
  async createBooking(@Body() createBookingDto: any) {
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
  @Get(`/getBooking/:id/:status`)
  async getBooking(@Param('id') id: string, @Param('status') status: string) {
    console.log(status);

    return this.bookingService.getBooking(id);
  }
  @Delete('/cancelBooking/:id')
  async cancelBooking(@Param('id') id: string) {
    return this.bookingService.cancelBooking(id);
  }
  @Get('confirm-cancellation')
  async confirmCancellation(
    @Query('booking_id') booking_id: string,
    @Query('redirect') redirect: string,
    @Res() res,
  ) {
    try {
      const success =
        await this.bookingService.finalizeCancellation(booking_id);

      if (success) {
        return res.redirect(`${redirect}?status=success`);
      } else {
        return res.redirect(`${redirect}?status=failure`);
      }
    } catch (error) {
      return res.redirect(`${redirect}?status=error`);
    }
  }
}
