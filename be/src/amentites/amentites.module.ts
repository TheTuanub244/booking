import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Amentites, AmentitesSchema } from './amentities.schema';
import { AmentitesService } from './amentites.service';
import { AmentitesController } from './amentites.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Amentites.name,
        schema: AmentitesSchema,
      },
    ]),
  ],
  providers: [AmentitesService],
  controllers: [AmentitesController],
})
export class AmentitesModule {}
