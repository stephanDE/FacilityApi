import { ClientKafka } from '@nestjs/microservices';
import { Command } from './commands/command';
import { CreateUniversityDto } from './dto/createUniversity.dto';
import { Event } from './events/event';
import { Config } from '../config/config.interface';
import { CommandHandler } from './commands/command.handler';
import { EventHandler } from './events/event.handler';
import { Facility } from './facility.schema';
import { FacilityService } from './facility.service';
export declare class FacilityController {
    private kafkaClient;
    private config;
    private commandHandler;
    private eventHandler;
    private universityService;
    constructor(kafkaClient: ClientKafka, config: Config, commandHandler: CommandHandler, eventHandler: EventHandler, universityService: FacilityService);
    createOne(dto: CreateUniversityDto): Promise<Facility>;
    getAll(): Promise<Facility[]>;
    getOne(id: string): Promise<Facility>;
    onCommand(command: Command): Promise<void>;
    onStudentEvent(event: Event): Promise<void>;
}
