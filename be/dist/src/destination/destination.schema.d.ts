export declare class Destination {
    province: string;
    city: string;
}
export declare const DestinationSchema: import("mongoose").Schema<Destination, import("mongoose").Model<Destination, any, any, any, import("mongoose").Document<unknown, any, Destination> & Destination & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v?: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Destination, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Destination>> & import("mongoose").FlatRecord<Destination> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v?: number;
}>;
