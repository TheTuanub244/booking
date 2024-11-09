import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class Destination {
  @Prop({ required: true, unique: true })
  province: string;
  @Prop({ required: true, unique: true })
  city: string;
}
export const DestinationSchema = SchemaFactory.createForClass(Destination);
