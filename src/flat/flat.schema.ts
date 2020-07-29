import { Document } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Flat extends Document {
  @Prop()
  flatName: string;

  @Prop()
  floorId: string;

  @Prop()
  rooms: string[];
}

export const FlatSchema = SchemaFactory.createForClass(Flat);
