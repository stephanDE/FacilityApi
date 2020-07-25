import { ClientKafka } from '@nestjs/microservices';
import { Command } from './commands/command';
import { CreateUniversityDto } from './dto/createUniversity.dto';
import { Event } from './events/event';
import { Config } from '../config/config.interface';
import { CommandHandler } from './commands/command.handler';
import { EventHandler } from './events/event.handler';
import { University } from './university.schema';
import { UniversityService } from './university.service';
export declare class UniversityController {
    private kafkaClient;
    private config;
    private commandHandler;
    private eventHandler;
    private universityService;
    constructor(kafkaClient: ClientKafka, config: Config, commandHandler: CommandHandler, eventHandler: EventHandler, universityService: UniversityService);
    createOne(dto: CreateUniversityDto): Promise<University>;
    getAll(): Promise<University[]>;
    getOne(id: string): Promise<University>;
    onCommand(command: Command): Promise<void>;
    onStudentEvent(event: Event): Promise<void>;
}
