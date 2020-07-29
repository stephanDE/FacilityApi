import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

import { FlatService } from '../flat.service';
import { Flat } from '../flat.schema';
import { CreateFlatCommand } from './createFlat.command';
import { Command } from 'src/facility/commands/command';

@Injectable()
export class CommandHandler {
  constructor(private flatService: FlatService) {}

  async handler(command: Command): Promise<Flat> {
    switch (command.action) {
      case 'CreateFloor':
        return this.handleCreateFlatCommand(command as CreateFlatCommand);
      default:
        throw new RpcException(`Unsupported command action: ${command.action}`);
    }
  }

  private async handleCreateFlatCommand(command: CreateFlatCommand) {
    return this.flatService.createOne(command.data);
  }
}
