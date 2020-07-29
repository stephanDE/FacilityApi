import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FlatController } from './flat.controller';
import { FlatSchema } from './flat.schema';
import { LoggingModule } from '../logging/logging.module';
import { FlatService } from './flat.service';
import { CommandHandler } from './commands/command.handler';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Flat',
        schema: FlatSchema,
      },
    ]),
    LoggingModule,
  ],
  controllers: [FlatController],
  providers: [FlatService, CommandHandler],
})
export class FlatModule {}
