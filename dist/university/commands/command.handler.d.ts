import { UniversityService } from '../university.service';
import { University } from '../university.schema';
import { Command } from './command';
export declare class CommandHandler {
    private universityService;
    constructor(universityService: UniversityService);
    handler(command: Command): Promise<University>;
    private handleCreateUniversityCommand;
}
