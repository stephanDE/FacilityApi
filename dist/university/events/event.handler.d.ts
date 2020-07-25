import { UniversityService } from '../university.service';
import { University } from '../university.schema';
import { Event } from '../events/event';
export declare class EventHandler {
    private universityService;
    constructor(universityService: UniversityService);
    handleEvent(event: Event): Promise<University>;
    private handleStudentEnrolledEvent;
}
