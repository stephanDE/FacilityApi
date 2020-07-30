import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RoomController } from './room.controller';
import { RoomSchema } from './room.schema';
import { LoggingModule } from '../logging/logging.module';
import { RoomService } from './room.service';
import { CommandHandler } from './commands/command.handler';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Room',
        schema: RoomSchema,
      },
    ]),
    LoggingModule,
  ],
  controllers: [RoomController],
  providers: [RoomService, CommandHandler],
  exports: [RoomService],
})
export class RoomModule {}
