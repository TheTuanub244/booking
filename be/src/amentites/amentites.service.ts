import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Amentites } from './amentities.schema';
import { Model } from 'mongoose';

@Injectable()
export class AmentitesService {
  constructor(
    @InjectModel(Amentites.name)
    private readonly amentitiesSchema: Model<Amentites>,
  ) {}
  async createAmentites(createAmentites: any) {
    const { amentity_name, property } = createAmentites;
    const existAmentity = await this.amentitiesSchema.findOne({
      amentity_name,
    });
    if (!existAmentity) {
      const newAmentity = new this.amentitiesSchema({
        amentity_name,
        property,
      });
      return newAmentity.save();
    }
    existAmentity.property.push(property);
    return existAmentity.save();
  }
}
