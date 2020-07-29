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
import { Flat } from './flat.schema';
import { FlatService } from './flat.service';
import { CreateFlatDto } from './dto/createFlat.dto';
import { Command } from 'src/facility/commands/command';

@Controller('flat')
@UseGuards(RoleGuard)
@UseFilters(ExceptionFilter)
export class FlatController {
  constructor(
    @Inject('KAFKA_SERVICE') private kafkaClient: ClientKafka,
    @Inject('CONFIG') private config: Config,
    private commandHandler: CommandHandler,
    private flatService: FlatService,
  ) {}

  // ---------------- REST --------------------

  @Post('')
  @Roles('Create')
  @UsePipes(ValidationPipe)
  async createOne(@Body() dto: CreateFlatDto): Promise<Flat> {
    const flat: Flat = await this.flatService.createOne(dto);

    const event = {
      id: uuid(),
      type: 'event',
      action: 'FlatEnrolled',
      timestamp: Date.now(),
      data: flat,
    };

    this.kafkaClient.emit(`${this.config.kafka.prefix}-facility-event`, event);

    return flat;
  }

  @Roles('Read')
  @Get('')
  async getAll(): Promise<Flat[]> {
    return this.flatService.findAll();
  }

  @Get('/:id')
  async getOne(@Param('id', new MongoPipe()) id: string) {
    return this.flatService.findOne(id);
  }

  // ---------------- CRQS --------------------

  @KafkaTopic(`flat-command`) async onCommand(
    @Cmd() command: Command,
  ): Promise<void> {
    const flat: Flat = await this.commandHandler.handler(command);

    const event = {
      id: uuid(),
      type: 'event',
      action: 'FlatEnrolled',
      timestamp: Date.now(),
      data: flat,
    };

    this.kafkaClient.emit(`${this.config.kafka.prefix}-facility-event`, event);

    return;
  }
}
