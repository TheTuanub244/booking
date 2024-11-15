import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/createReview.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ROLE } from 'src/user/enum/role.enum';
import { ObjectId } from 'mongoose';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}
  @Post('/createReview')
  async createReview(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.createReview(createReviewDto);
  }
  @Post('/findReviewWithProperty')
  async findReviewWithProperty(@Body() property_id: any) {
    return this.reviewService.findReviewWithProperty(property_id.property_id);
  }
  @Get('getMonthlyRating/:id')
  async getMonthlyRating(@Param('id') id: any){
    return this.reviewService.getMonthlyRating(id)
  }
  @Get('getMonthlyRatingByProperty/:id')
  async getMonthlyRatingByProperty(@Param('id') id: any){
    return this.reviewService.getMonthlyRatingByProperty(id)
  }
}
