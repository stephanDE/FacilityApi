import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Facility } from './facility.schema';
import { CreateUniversityDto } from './dto/createUniversity.dto';
import { StudentEnrolledEvent } from './events/studentEnrolled.event';

@Injectable()
export class FacilityService {
  constructor(@InjectModel('Facilities') private uniModel: Model<Facility>) {}

  async findAll(): Promise<Facility[]> {
    return this.uniModel.find().exec();
  }

  async findOne(id: string): Promise<Facility> {
    return this.uniModel.findById(id).exec();
  }

  async createOne(dto: CreateUniversityDto): Promise<Facility> {
    return this.uniModel.create(dto);
  }

  async enroll(event: StudentEnrolledEvent): Promise<Facility> {
    return this.uniModel.find().exec()[0];
  }
}
