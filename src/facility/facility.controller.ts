import {
  Controller,
  Get,
  Param,
  Inject,
  UseGuards,
  UseFilters,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { ClientKafka } from '@nestjs/microservices';

import { MongoPipe } from '../pipe/mongoid.pipe';
import { KafkaTopic } from '../kafka/kafkaTopic.decorator';
import { Cmd } from '../kafka/command.decorator';
import { Roles } from '../auth/auth.decorator';
import { RoleGuard } from '../auth/auth.guard';
import { ExceptionFilter } from '../kafka/kafka.exception.filter';
import { Command } from './commands/command';
import { Event } from './events/event';
import { Config } from '../config/config.interface';
import { CommandHandler } from './commands/command.handler';
import { EventHandler } from './events/event.handler';
import { Evt } from '../kafka/event.decorator';
import { Facility } from './facility.schema';
import { FacilityService } from './facility.service';
import { CreateFacilityDto } from './dto/createFacility.dto';

@Controller('facility')
@UseGuards(RoleGuard)
@UseFilters(ExceptionFilter)
export class FacilityController {
  constructor(
    @Inject('KAFKA_SERVICE') private kafkaClient: ClientKafka,
    @Inject('CONFIG') private config: Config,
    private commandHandler: CommandHandler,
    private eventHandler: EventHandler,
    private facilityService: FacilityService,
  ) {}

  // ---------------- REST --------------------

  @Post('')
  @Roles('Create')
  @UsePipes(ValidationPipe)
  async createOne(@Body() dto: CreateFacilityDto): Promise<Facility> {
    const facility: Facility = await this.facilityService.createOne(dto);

    const event = {
      id: uuid(),
      type: 'event',
      action: 'FacilityCreated',
      timestamp: Date.now(),
      data: facility,
    };

    this.kafkaClient.emit(`${this.config.kafka.prefix}-facility-event`, event);

    return facility;
  }

  @Roles('Read')
  @Get('')
  async getAll(): Promise<Facility[]> {
    return this.facilityService.findAll();
  }

  @Get('/:id')
  async getOne(@Param('id', new MongoPipe()) id: string) {
    return this.facilityService.findOne(id);
  }

  // ---------------- CRQS --------------------

  @KafkaTopic(`facility-command`) async onCommand(
    @Cmd() command: Command,
  ): Promise<void> {
    const facility: Facility = await this.commandHandler.handler(command);

    const event = {
      id: uuid(),
      type: 'event',
      action: 'FacilityCreated',
      timestamp: Date.now(),
      data: facility,
    };

    this.kafkaClient.emit(`${this.config.kafka.prefix}-facility-event`, event);

    return;
  }

  @KafkaTopic('student-event') async onStudentEvent(
    @Evt() event: Event,
  ): Promise<void> {
    await this.eventHandler.handleEvent(event);
    return;
  }
}
