import {
    BadRequestException,
    ConflictException,
    Injectable,
} from '@nestjs/common';
import { CreateDestinationDto } from './dto/createDestionation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Destination } from './destination.schema';
import { Model, ObjectId, Types } from 'mongoose';
import { UpdateDestinationDto } from './dto/updateDestination.dto';
import { Type } from 'class-transformer';

@Injectable()
export class DestinationService {
    constructor(
        @InjectModel(Destination.name)
        private destinationSchema: Model<Destination>,
    ) { }
    async create(destination: CreateDestinationDto) {
        const existingPro = await this.destinationSchema.findOne({
            province: destination.province,
        });
        if (existingPro) {
            const existingCity = await this.destinationSchema.findOne({
                city: destination.city,
            });
            if (existingCity) {
                throw new ConflictException('Destination already exists');
            }
        }
        const newDestination = new this.destinationSchema(destination);
        return newDestination.save();
    }
    async update(destination: UpdateDestinationDto) {
        console.log(destination);

        if (
            destination.id === null ||
            destination.id === undefined ||
            destination.id === ''
        ) {
            throw new BadRequestException('Invalid ID to update');
        }
        const updateData = {};
        Object.keys(destination).forEach((key) => {
            const value = destination[key];
            if (value !== null && value !== undefined && value !== '') {
                updateData[key] = value;
            }
        });
        if (Object.keys(updateData).length == 0) {
            throw new BadRequestException('No valid fields to update');
        }

        const updatedDes = await this.destinationSchema.updateOne(
            { _id: destination.id },
            { $set: updateData },
        );
        return updatedDes;
    }
    async delete(id: string) {
        const objectId = new Types.ObjectId(id);

        const existingId = await this.destinationSchema.findById(objectId);
        if (!existingId) {
            throw new BadRequestException('Invalid ID');
        }
        const deletedDes = await this.destinationSchema.deleteOne({
            _id: objectId,
        });
        return deletedDes;
    }
}
