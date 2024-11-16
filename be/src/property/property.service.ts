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
      const result = await cloudinary.uploader.upload(filePath);
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
  async getPublicIdFromUrl(url: string) {
    const parts = url.split('/');
    const fileWithExtension = parts[parts.length - 1];
    return fileWithExtension.split('.')[0];
  }

  async checkImageExistsOnCloudinary(url: string) {
    const publicId = await this.getPublicIdFromUrl(url);
    try {
      await cloudinary.api.resource(publicId);
      return true;
    } catch (error: any) {
      if (error.http_code === 404) {
        return false;
      } else {
        throw error;
      }
    }
  }
  async appendImageFile(images, newImages) {
    const validImages = []; // Mảng để lưu ảnh hợp lệ sau khi kiểm tra

    if (images) {
      await Promise.all(
        images.map(async (image) => {
          try {
            const isValidImage = await this.checkImageExistsOnCloudinary(image);
            if (isValidImage) {
              validImages.push(image); // Chỉ thêm ảnh vào validImages nếu ảnh hợp lệ
            }
          } catch (err) {}
        }),
      );
    }

    // Thêm các ảnh từ newImages vào validImages
    if (newImages && newImages.length !== 0) {
      if (newImages[0]?.path) {
        newImages.forEach((image) => {
          validImages.push(image.path);
        });
      } else {
        newImages.forEach((image) => {
          validImages.push(image);
        });
      }
    }

    return validImages; // Trả về mảng các ảnh hợp lệ
  }
  async updateProperty(property: any) {
    if (property.image) {
      const propertyImageUrls = await Promise.all(
        property.image.map((imagePath) => {
          if (imagePath) {
            return this.uploadImageToCloudinary(imagePath);
          }
        }),
      );

      const roomImageUrls = await Promise.all(
        property.rooms.map(async (room) => {
          const roomImages = await Promise.all(
            room.image.map((imagePath) => {
              if (imagePath) {
                return this.uploadImageToCloudinary(imagePath.path);
              }
            }),
          );
          return {
            ...room,
            image: roomImages, // Lưu URL của ảnh sau khi upload
          };
        }),
      );
      const newImages = await this.appendImageFile(
        property.images,
        propertyImageUrls,
      );
      property.images = newImages;

      await Promise.all(
        property.rooms.map(async (room, index) => {
          const newImage = await this.appendImageFile(
            room.images,
            roomImageUrls[index].image,
          );
          room.images = newImage;
        }),
      );
      const propertyData = {
        ...property,
        images: property.images,
        rooms: property.rooms.map((room) => ({
          ...room,
          images: room.images || null,
        })),
      };

      const savedProperty = await this.propertySchema.findByIdAndUpdate(
        propertyData._id,
        propertyData,
        {
          new: true,
        },
      );

      propertyData.rooms.map(async (value) => {
        value.capacity = JSON.parse(value.capacity);
        value.price_per_night = JSON.parse(value.price_per_night);
        value.size = parseInt(value.size);
        value.images = Array.isArray(value.images)
          ? value.images
          : [value.images];
        value.price_per_night = value.price_per_night;
        value.property_id = savedProperty._id;

        await this.roomService.updateRoom(value);
      });
    } else {
      const propertyData = {
        ...property,
        images: property.images,
        rooms: property.rooms.map((room) => ({
          ...room,
          images: room.images || null,
        })),
      };
      console.log(propertyData);

      const savedProperty = await this.propertySchema.findByIdAndUpdate(
        propertyData._id,
        propertyData,
        {
          new: true,
        },
      );
      propertyData.rooms.map(async (value) => {
        value.capacity = JSON.parse(value.capacity);
        value.price_per_night = JSON.parse(value.price_per_night);
        value.size = parseInt(value.size);
        value.images = Array.isArray(value.images)
          ? value.images
          : [value.images];
        value.price_per_night = value.price_per_night;
        value.property_id = savedProperty._id;

        await this.roomService.updateRoom(value);
      });
      return savedProperty;
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

    if (property.rooms) {
      const propertyData = {
        ...property,
        images: propertyImageUrl,
        rooms: property.rooms.map((room, index) => ({
          ...room,
          images: roomImageUrls[index] || null,
        })),
      };
      if (!propertyData._id || propertyData._id === 'undefined') {
        delete propertyData._id;
      }
      const newProperty = new this.propertySchema(propertyData);

      const savedProperty = await newProperty.save();

      propertyData.rooms.map(async (value) => {
        value.capacity = JSON.parse(value.capacity);
        value.price_per_night = JSON.parse(value.price_per_night);
        value.size = parseInt(value.size);
        value.images = [value.images];
        value.price_per_night = value.price_per_night;
        value.property_id = savedProperty._id;

        await this.roomService.createRoom(value);
      });
      return savedProperty;
    } else {
      const propertyData = {
        ...property,
        images: propertyImageUrl,
        rooms: [],
      };
      const newProperty = new this.propertySchema(propertyData);

      const savedProperty = await newProperty.save();
      return savedProperty;
    }
  }

  async getAllProperty() {
    return this.propertySchema.find();
  }
  async getPropertyWithOwner(
    owner_id: ObjectId,
    page: number,
    limit: number = 5,
  ) {
    const properties = [];
    const skip = (page - 1) * limit;
    const findProperty = await this.propertySchema
      .find({
        owner_id: owner_id,
      })
      .limit(limit)
      .skip(skip)
      .populate('owner_id')
      .exec();
    const total = await this.propertySchema.countDocuments({
      owner_id: owner_id,
    });
    const totalPages = Math.ceil(total / limit);
    await Promise.all(
      findProperty.map(async (property) => {
        const totalRoom = await this.roomService.countRoomWithPropety(
          property._id,
        );
        properties.push({
          totalRoom,
          property,
        });
      }),
    );
    return {
      properties,
      totalPages,
      currentPage: page,
    };
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
