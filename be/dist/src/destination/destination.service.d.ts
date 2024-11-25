import { CreateDestinationDto } from './dto/createDestionation.dto';
import { Destination } from './destination.schema';
import { Model, Types } from 'mongoose';
import { UpdateDestinationDto } from './dto/updateDestination.dto';
export declare class DestinationService {
  private destinationSchema;
  constructor(destinationSchema: Model<Destination>);
  create(destination: CreateDestinationDto): Promise<
    import('mongoose').Document<unknown, {}, Destination> &
      Destination & {
        _id: Types.ObjectId;
      } & {
        __v?: number;
      }
  >;
  update(
    destination: UpdateDestinationDto,
  ): Promise<import('mongoose').UpdateWriteOpResult>;
  delete(id: string): Promise<import('mongodb').DeleteResult>;
}
