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
import { Config } from '../config/config.interface';
import { CommandHandler } from './commands/command.handler';
import { Floor } from './floor.schema';
import { FloorService } from './floor.service';
import { CreateFloorDto } from './dto/createFloor.dto';
import { Command } from 'src/facility/commands/command';

@Controller('floor')
@UseGuards(RoleGuard)
@UseFilters(ExceptionFilter)
export class FloorController {
  constructor(
    @Inject('KAFKA_SERVICE') private kafkaClient: ClientKafka,
    @Inject('CONFIG') private config: Config,
    private commandHandler: CommandHandler,
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
}
