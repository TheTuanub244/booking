import { Amentites } from './amentities.schema';
import { Model } from 'mongoose';
export declare class AmentitesService {
  private readonly amentitiesSchema;
  constructor(amentitiesSchema: Model<Amentites>);
  createAmentites(createAmentites: any): Promise<
    import('mongoose').Document<unknown, {}, Amentites> &
      Amentites & {
        _id: import('mongoose').Types.ObjectId;
      } & {
        __v?: number;
      }
  >;
}
