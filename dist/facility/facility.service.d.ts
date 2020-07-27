import { Model } from 'mongoose';
import { Facility } from './facility.schema';
import { CreateUniversityDto } from './dto/createUniversity.dto';
import { StudentEnrolledEvent } from './events/studentEnrolled.event';
export declare class FacilityService {
    private uniModel;
    constructor(uniModel: Model<Facility>);
    findAll(): Promise<Facility[]>;
    findOne(id: string): Promise<Facility>;
    createOne(dto: CreateUniversityDto): Promise<Facility>;
    enroll(event: StudentEnrolledEvent): Promise<Facility>;
}
