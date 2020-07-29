import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FloorController } from './floor.controller';
import { FloorSchema } from './floor.schema';
import { LoggingModule } from '../logging/logging.module';
import { FloorService } from './floor.service';
import { CommandHandler } from './commands/command.handler';
import { EventHandler } from './events/event.handler';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Floor',
        schema: FloorSchema,
      },
    ]),
    LoggingModule,
  ],
  controllers: [FloorController],
  providers: [FloorService, CommandHandler, EventHandler],
})
export class FloorModule {}
