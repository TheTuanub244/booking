import { DestinationService } from './destination.service';
import { CreateDestinationDto } from './dto/createDestionation.dto';
import { UpdateDestinationDto } from './dto/updateDestination.dto';
export declare class DestinationController {
    private destinationService;
    constructor(destinationService: DestinationService);
    createDestination(createDestinationDto: CreateDestinationDto): Promise<import("mongoose").Document<unknown, {}, import("./destination.schema").Destination> & import("./destination.schema").Destination & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v?: number;
    }>;
    updateDestination(updateDestinationDto: UpdateDestinationDto): Promise<import("mongoose").UpdateWriteOpResult>;
    deleteDestination(id: string): Promise<import("mongodb").DeleteResult>;
}
