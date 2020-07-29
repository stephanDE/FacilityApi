import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Floor } from './floor.schema';
import { CreateFloorDto } from './dto/createFloor.dto';
import { FlatEnrolledEvent } from 'src/facility/events/flatEnrolled.event';
import { of } from 'rxjs';

@Injectable()
export class FloorService {
  constructor(@InjectModel('Floor') private floorModel: Model<Floor>) {}

  async findAll(): Promise<Floor[]> {
    return this.floorModel.find().exec();
  }

  async findOne(id: string): Promise<Floor> {
    return this.floorModel.findById(id).exec();
  }

  async createOne(dto: CreateFloorDto): Promise<Floor> {
    return this.floorModel.create(dto);
  }

  async enroll(event: FlatEnrolledEvent): Promise<Floor> {
    const floor = await this.findOne(event.data.floorId);

    console.log(floor);

    this.floorModel
      .findByIdAndUpdate(
        { _id: event.data.floorId },
        { flats: [...floor.flats, event.data._id] },
      )
      .exec();

    return of(floor).toPromise();
  }
}
