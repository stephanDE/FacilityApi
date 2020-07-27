import { FacilityService } from '../facility.service';
import { Facility } from '../facility.schema';
import { Command } from './command';
export declare class CommandHandler {
    private universityService;
    constructor(universityService: FacilityService);
    handler(command: Command): Promise<Facility>;
    private handleCreateUniversityCommand;
}
