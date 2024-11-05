import { Module } from '@nestjs/common';
import { PromotionController } from './promotion.controller';
import { PromotionService } from './promotion.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Promotion, PromotionSchema } from './promotion.schema';

@Module({
    controllers: [PromotionController],
    providers: [PromotionService],
    imports: [
        MongooseModule.forFeature([
            {
                name: Promotion.name,
                schema: PromotionSchema
            }
        ])
    ]
})
export class PromotionModule { }
