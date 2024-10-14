import { Prop, Schema } from "@nestjs/mongoose";

@Schema()
export class Amentites {
    @Prop({ required: true })
    amentity_name: string
}