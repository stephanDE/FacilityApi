import { Document } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Floor extends Document {
  @Prop()
  floorName: string;

  @Prop()
  facilityId: string;

  @Prop()
  flats: string[];
}

export const FloorSchema = SchemaFactory.createForClass(Floor);
