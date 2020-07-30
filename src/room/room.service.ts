import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Room } from './room.schema';
import { CreateRoomDto } from './dto/createRoom.dto';
import { of } from 'rxjs';
import { RoomEnrolledEvent } from 'src/facility/events/roomEnrolled.event';

@Injectable()
export class RoomService {
  constructor(@InjectModel('Room') private roomModel: Model<Room>) {}

  async findAll(): Promise<Room[]> {
    return this.roomModel.find().exec();
  }

  async findOne(id: string): Promise<Room> {
    return this.roomModel.findById(id).exec();
  }

  async createOne(dto: CreateRoomDto): Promise<Room> {
    return this.roomModel.create(dto);
  }

  async enroll(event: RoomEnrolledEvent): Promise<Room> {
    const flat = await this.findOne(event.data.flatId);
    /*
    this.flatModel
      .findByIdAndUpdate(
        { _id: event.data.floorId },
        { floors: [...floor.flats, event.data._id] },
      )
      .exec();
    */
    return of(flat).toPromise();
  }
}
