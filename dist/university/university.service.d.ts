import { Model } from 'mongoose';
import { University } from './university.schema';
import { CreateUniversityDto } from './dto/createUniversity.dto';
import { StudentEnrolledEvent } from './events/studentEnrolled.event';
export declare class UniversityService {
    private uniModel;
    constructor(uniModel: Model<University>);
    findAll(): Promise<University[]>;
    findOne(id: string): Promise<University>;
    createOne(dto: CreateUniversityDto): Promise<University>;
    enroll(event: StudentEnrolledEvent): Promise<University>;
}
