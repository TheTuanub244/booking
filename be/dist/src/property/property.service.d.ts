import { Property } from './property.schema';
import { Model, ObjectId } from 'mongoose';
import { BookingService } from 'src/booking/booking.service';
import { RoomService } from 'src/room/room.service';
import { Review } from 'src/review/review.schema';
import { ReviewService } from 'src/review/review.service';
export declare class PropertyService {
  private readonly propertySchema;
  private readonly bookingService;
  private readonly roomService;
  private readonly reviewSchema;
  private readonly reviewService;
  constructor(
    propertySchema: Model<Property>,
    bookingService: BookingService,
    roomService: RoomService,
    reviewSchema: Model<Review>,
    reviewService: ReviewService,
  );
  uploadImageToCloudinary(filePath: string): Promise<string>;
  createNewProperty(property: any): Promise<
    import('mongoose').Document<unknown, {}, Property> &
      Property & {
        _id: import('mongoose').Types.ObjectId;
      } & {
        __v?: number;
      }
  >;
  getAllProperty(): Promise<
    (import('mongoose').Document<unknown, {}, Property> &
      Property & {
        _id: import('mongoose').Types.ObjectId;
      } & {
        __v?: number;
      })[]
  >;
  getPropertyWithOwner(owner_id: ObjectId): Promise<
    (import('mongoose').Document<unknown, {}, Property> &
      Property & {
        _id: import('mongoose').Types.ObjectId;
      } & {
        __v?: number;
      })[]
  >;
  getPropertyById(id: ObjectId): Promise<
    import('mongoose').Document<unknown, {}, Property> &
      Property & {
        _id: import('mongoose').Types.ObjectId;
      } & {
        __v?: number;
      }
  >;
  getPropertiesSortedByRate(): Promise<any[]>;
  getPropertyTypesByPlace(
    province: string,
  ): Promise<import('./enum/type.enum').TYPE[]>;
  getPropertyByTypeAndPlace(
    place: string,
    type: string,
  ): Promise<
    (import('mongoose').Document<unknown, {}, Property> &
      Property & {
        _id: import('mongoose').Types.ObjectId;
      } & {
        __v?: number;
      })[]
  >;
  getAllTypeOfProperties(): Promise<import('./enum/type.enum').TYPE[]>;
  deg2rad(deg: number): number;
  calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number;
  getPropertyNear(longitude: number, latitude: number): Promise<any[]>;
  updateImageForProperty(
    propertyId: ObjectId,
    image: string,
  ): Promise<
    import('mongoose').Document<unknown, {}, Property> &
      Property & {
        _id: import('mongoose').Types.ObjectId;
      } & {
        __v?: number;
      }
  >;
  getPropertyByPlace(place: string): Promise<
    (import('mongoose').Document<unknown, {}, Property> &
      Property & {
        _id: import('mongoose').Types.ObjectId;
      } & {
        __v?: number;
      })[]
  >;
  getDistinctPlace(): Promise<string[]>;
}
