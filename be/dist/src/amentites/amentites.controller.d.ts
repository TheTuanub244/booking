import { AmentitesService } from './amentites.service';
export declare class AmentitesController {
    private readonly amentitiesSerivce;
    constructor(amentitiesSerivce: AmentitesService);
    createAmentity(createAmentites: any): Promise<import("mongoose").Document<unknown, {}, import("./amentities.schema").Amentites> & import("./amentities.schema").Amentites & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v?: number;
    }>;
}
