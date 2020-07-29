import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Floor } from './floor.schema';
import { CreateFloorDto } from './dto/createFloor.dto';
import { FlatEnrolledEvent } from 'src/facility/events/flatEnrolled.event';

@Injectable()
export class FloorService {
  constructor(@InjectModel('Floor') private facilityModel: Model<Floor>) {}

  async findAll(): Promise<Floor[]> {
    return this.facilityModel.find().exec();
  }

  async findOne(id: string): Promise<Floor> {
    return this.facilityModel.findById(id).exec();
  }

  async createOne(dto: CreateFloorDto): Promise<Floor> {
    return this.facilityModel.create(dto);
  }

  async enroll(event: FlatEnrolledEvent): Promise<Floor> {
    return this.facilityModel.find().exec()[0];
  }
}
