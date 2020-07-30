import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Flat } from './flat.schema';
import { CreateFlatDto } from './dto/createFlat.dto';
import { FlatEnrolledEvent } from '../facility/events/flatEnrolled.event';
import { of } from 'rxjs';

@Injectable()
export class FlatService {
  constructor(@InjectModel('Flat') private flatModel: Model<Flat>) {}

  async findAll(): Promise<Flat[]> {
    return this.flatModel.find().exec();
  }

  async findOne(id: string): Promise<Flat> {
    return this.flatModel.findById(id).exec();
  }

  async createOne(dto: CreateFlatDto): Promise<Flat> {
    return this.flatModel.create(dto);
  }

  async enroll(event: FlatEnrolledEvent): Promise<Flat> {
    const flat = await this.findOne(event.data.flatId);

    this.flatModel
      .findByIdAndUpdate(
        { _id: event.data.flatId },
        { rooms: [...flat.rooms, event.data._id] },
      )
      .exec();

    return of(flat).toPromise();
  }
}
