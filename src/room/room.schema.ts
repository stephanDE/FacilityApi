import { Document } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Room extends Document {
  @Prop()
  deviceId: string;

  @Prop()
  flatId: string;

  @Prop()
  roomName: string;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
