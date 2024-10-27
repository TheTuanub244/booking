import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Property } from './property.schema';

import { Model } from 'mongoose';
import { CreatePropertyDto } from './dto/createProperty.dto';

@Injectable()
export class PropertyService {
    constructor(
        @InjectModel(Property.name)
        private readonly propertySchema: Model<Property>,
    ) { }
    async createNewProperty(createPropertyDto: CreatePropertyDto) {
        const newProperty = new this.propertySchema(createPropertyDto);
        return newProperty.save();
    }
    async getAllProperty() {
        return this.propertySchema.find();
    }
    async getPropertyWithOwner(owner_id: string) {
        return this.propertySchema
            .findOne({
                owner_id: owner_id,
            })
            .populate('owner_id')
            .exec();
    }
    async getPropertyById(id: string) {
        return this.propertySchema.findById(id);
    }
    async getPropertiesSortedByRate() {
        return this.propertySchema.find().sort({ rate: -1 });
    }
}
