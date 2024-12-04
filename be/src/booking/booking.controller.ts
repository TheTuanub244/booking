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
import { ValidateTokenGuard } from 'src/common/guards/validateToken.guard';

@Controller('booking')
// @UseGuards(ValidateTokenGuard, RolesGuard)
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}
  @Post('createBooking')
  @Roles(ROLE.MEMBER, ROLE.PARTNER)
  async createBooking(@Body() createBookingDto: any) {
    console.log(createBookingDto);

    return this.bookingService.createBooking(createBookingDto);
  }
  @Roles(ROLE.PARTNER)
  @Get(`/getMonthlyRevenue/:id`)
  async getMonthlyRevenue(@Param('id') id: string) {
    return this.bookingService.getMonthlyRevenueByOwner(id);
  }
  @Roles(ROLE.PARTNER)
  @Get(`/getMonthlyRevenueByProperty/:id`)
  async getMonthlyRevenueByProperty(@Param('id') id: string) {
    return this.bookingService.getMonthlyRevenueByProperty(id);
  }
  @Roles(ROLE.PARTNER, ROLE.MEMBER)
  @Get(`/getBookingByOwner/:id/`)
  async getBookingByOwner(@Param('id') id: string) {
    return this.bookingService.getBookingByOwner(id);
  }
  @Roles(ROLE.PARTNER, ROLE.MEMBER)
  @Delete('/cancelBooking/:id')
  async cancelBooking(@Param('id') id: string) {
    return this.bookingService.cancelBooking(id);
  }
  @Roles(ROLE.PARTNER, ROLE.MEMBER)
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

  @Get(`/findUnfinishedBooking/:userId`)
  async findUnfinishedBooking(@Param('userId') userId: string) {
    return this.bookingService.findUnfinishedBooking(userId);
  }
  @Post('/calculateTotalNightPriceForReservation')
  async calculateTotalNightPriceForReservation(@Body() data: any) {
    return this.bookingService.calculateTotalNightPriceForReservation(data);
  }

  @Post(`/updateBookingStatus/:bookingId`)
  async updateBookingStatus(
    @Param('bookingId') bookingId: string,
    @Body() data: any,
  ) {
    return this.bookingService.updateBookingStatus(bookingId, data);
  }
}
