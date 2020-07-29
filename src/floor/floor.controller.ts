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
import { Floor } from './floor.schema';
import { FloorService } from './floor.service';
import { CreateFloorDto } from './dto/createFloor.dto';

@Controller('floor')
@UseGuards(RoleGuard)
@UseFilters(ExceptionFilter)
export class FloorController {
  constructor(
    @Inject('KAFKA_SERVICE') private kafkaClient: ClientKafka,
    @Inject('CONFIG') private config: Config,
    private commandHandler: CommandHandler,
    private eventHandler: EventHandler,
    private floorService: FloorService,
  ) {}

  // ---------------- REST --------------------

  @Post('')
  @Roles('Create')
  @UsePipes(ValidationPipe)
  async createOne(@Body() dto: CreateFloorDto): Promise<Floor> {
    const floor: Floor = await this.floorService.createOne(dto);

    const event = {
      id: uuid(),
      type: 'event',
      action: 'FloorEnrolled',
      timestamp: Date.now(),
      data: floor,
    };

    console.log('event wird rausgeballert');

    this.kafkaClient.emit(`${this.config.kafka.prefix}-facility-event`, event);

    return floor;
  }

  @Roles('Read')
  @Get('')
  async getAll(): Promise<Floor[]> {
    return this.floorService.findAll();
  }

  @Get('/:id')
  async getOne(@Param('id', new MongoPipe()) id: string) {
    return this.floorService.findOne(id);
  }

  // ---------------- CRQS --------------------

  @KafkaTopic(`floor-command`) async onCommand(
    @Cmd() command: Command,
  ): Promise<void> {
    const floor: Floor = await this.commandHandler.handler(command);

    const event = {
      id: uuid(),
      type: 'event',
      action: 'FloorEnrolled',
      timestamp: Date.now(),
      data: floor,
    };

    this.kafkaClient.emit(`${this.config.kafka.prefix}-facility-event`, event);

    return;
  }

  /*
  @KafkaTopic(`facility-event`)
  async onFacilityEvent(@Evt() event: Event): Promise<void> {
    await this.eventHandler.handleEvent(event);
    return;
  }*/
}
