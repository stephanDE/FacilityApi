import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Facility } from './facility.schema';
import { CreateFacilityDto } from './dto/createFacility.dto';
import { FloorEnrolledEvent } from './events/floorEnrolled.event';
import { of } from 'rxjs';

@Injectable()
export class FacilityService {
  constructor(
    @InjectModel('Facilities') private facilityModel: Model<Facility>,
  ) {}

  async findAll(): Promise<Facility[]> {
    return this.facilityModel.find().exec();
  }

  async findOne(id: string): Promise<Facility> {
    return this.facilityModel.findById(id).exec();
  }

  async createOne(dto: CreateFacilityDto): Promise<Facility> {
    return this.facilityModel.create(dto);
  }

  async enroll(event: FloorEnrolledEvent): Promise<Facility> {
    const facility = await this.findOne(event.data.facilityId);

    this.facilityModel
      .findByIdAndUpdate(
        { _id: event.data.facilityId },
        { floors: [...facility.floors, event.data._id] },
      )
      .exec();

    return of(facility).toPromise();
  }
}
