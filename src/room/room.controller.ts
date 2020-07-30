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
import { Room } from './room.schema';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/createRoom.dto';
import { Command } from 'src/facility/commands/command';

@Controller('room')
@UseGuards(RoleGuard)
@UseFilters(ExceptionFilter)
export class RoomController {
  constructor(
    @Inject('KAFKA_SERVICE') private kafkaClient: ClientKafka,
    @Inject('CONFIG') private config: Config,
    private commandHandler: CommandHandler,
    private roomService: RoomService,
  ) {}

  // ---------------- REST --------------------

  @Post('')
  @Roles('Create')
  @UsePipes(ValidationPipe)
  async createOne(@Body() dto: CreateRoomDto): Promise<Room> {
    const room: Room = await this.roomService.createOne(dto);

    const event = {
      id: uuid(),
      type: 'event',
      action: 'RoomEnrolled',
      timestamp: Date.now(),
      data: room,
    };

    this.kafkaClient.emit(`${this.config.kafka.prefix}-facility-event`, event);

    return room;
  }

  @Roles('Read')
  @Get('')
  async getAll(): Promise<Room[]> {
    return this.roomService.findAll();
  }

  @Get('/:id')
  async getOne(@Param('id', new MongoPipe()) id: string) {
    return this.roomService.findOne(id);
  }

  // ---------------- CRQS --------------------

  @KafkaTopic(`room-command`) async onCommand(
    @Cmd() command: Command,
  ): Promise<void> {
    const room: Room = await this.commandHandler.handler(command);

    const event = {
      id: uuid(),
      type: 'event',
      action: 'RoomEnrolled',
      timestamp: Date.now(),
      data: room,
    };

    this.kafkaClient.emit(`${this.config.kafka.prefix}-facility-event`, event);

    return;
  }
}
