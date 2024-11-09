import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Property } from './property.schema';

import { Model, ObjectId } from 'mongoose';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { BookingService } from 'src/booking/booking.service';
import { RoomService } from 'src/room/room.service';
import { Review } from 'src/review/review.schema';
import { ReviewService } from 'src/review/review.service';
import { v2 as cloudinary } from 'cloudinary';
import * as fs from 'fs';
cloudinary.config({
  cloud_name: 'du4fzcfok',
  api_key: '428412499929535',
  api_secret: 'Wa3YxNkGg5sr5poKRILhGcIk9XU',
});
@Injectable()
export class PropertyService {
  constructor(
    @InjectModel(Property.name)
    private readonly propertySchema: Model<Property>,
    private readonly bookingService: BookingService,
    private readonly roomService: RoomService,
    @InjectModel(Review.name)
    private readonly reviewSchema: Model<Review>,
    private readonly reviewService: ReviewService,
  ) {}

  async uploadImageToCloudinary(filePath: string): Promise<string> {
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: 'booking_images',
      });
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Failed to delete local file:', err.message);
        } else {
          console.log('Successfully deleted local file:', filePath);
        }
      });
      return result.secure_url;
    } catch (error) {
      throw new Error(`Failed to upload image to Cloudinary: ${error.message}`);
    }
  }

  async createNewProperty(property: any) {
    const propertyImageUrl = property.image
      ? await this.uploadImageToCloudinary(property.image)
      : null;

    // Upload room images
    const roomImageUrls = await Promise.all(
      property.roomImages.map((imagePath) =>
        this.uploadImageToCloudinary(imagePath.path),
      ),
    );

    const propertyData = {
      ...property,
      images: propertyImageUrl,
      rooms: property.rooms.map((room, index) => ({
        ...room,
        images: roomImageUrls[index] || null,
      })),
    };
    const newProperty = new this.propertySchema(propertyData);

    const savedProperty = await newProperty.save();

    propertyData.rooms.map(async (value) => {
      value.capacity = JSON.parse(value.capacity);
      value.pricePerNight = JSON.parse(value.pricePerNight);
      value.size = parseInt(value.size);
      value.images = [value.images];
      value.price_per_night = value.pricePerNight;
      value.property_id = savedProperty._id;

      await this.roomService.createRoom(value);
    });
    return savedProperty;
  }

  async getAllProperty() {
    return this.propertySchema.find();
  }
  async getPropertyWithOwner(owner_id: ObjectId) {
    return this.propertySchema
      .find({
        owner_id: owner_id,
      })
      .populate('owner_id')
      .exec();
  }
  async getPropertyById(id: ObjectId) {
    return this.propertySchema.findById(id);
  }
  async getPropertiesSortedByRate() {
    const properties = await this.propertySchema
      .find()
      .sort({ rate: -1 })
      .limit(4);

    const propertiesWithRate = [];
    await Promise.all(
      properties.map(async (property) => {
        const review = await this.reviewService.findReviewWithProperty(
          property._id,
        );
        propertiesWithRate.push({
          property,
          numberReviews: review,
        });
      }),
    );

    return propertiesWithRate;
  }
  async getPropertyTypesByPlace(province: string) {
    return this.propertySchema.distinct('property_type', {
      'address.province': province,
    });
  }
  async getPropertyByTypeAndPlace(place: string, type: string) {
    return this.propertySchema.find({
      'address.province': place,
      property_type: type,
    });
  }
  async getAllTypeOfProperties() {
    return this.propertySchema.distinct('property_type');
  }
  deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const EARTH_RADIUS = 6371;
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return EARTH_RADIUS * c;
  }
  async getPropertyNear(longitude: number, latitude: number) {
    const properties = await this.propertySchema.find({});
    const perfectProperties = [];
    const nearbyProperties = properties.filter((property) => {
      console.log(property);

      const distance = this.calculateDistance(
        latitude,
        longitude,
        property.location.latitude,
        property.location.longitude,
      );
      const roundedNumber = distance.toFixed(1);

      if (distance <= 10) {
        perfectProperties.push({
          distance: roundedNumber,
          property,
        });
      }
    });
    return perfectProperties;
  }
  async updateImageForProperty(propertyId: ObjectId, image: string) {
    return await this.propertySchema.findByIdAndUpdate(
      propertyId,
      {
        $push: {
          images: {
            $each: image,
          },
        },
      },
      {
        new: true,
      },
    );
  }
  async getPropertyByPlace(place: string) {
    return await this.propertySchema.find({
      'address.province': place,
    });
  }
  async getDistinctPlace() {
    return this.propertySchema.distinct('address.province');
  }
}
