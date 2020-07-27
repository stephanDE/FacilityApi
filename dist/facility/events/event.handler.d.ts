import { FacilityService } from '../facility.service';
import { Facility } from '../facility.schema';
import { Event } from './event';
export declare class EventHandler {
    private universityService;
    constructor(universityService: FacilityService);
    handleEvent(event: Event): Promise<Facility>;
    private handleStudentEnrolledEvent;
}
