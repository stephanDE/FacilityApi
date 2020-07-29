import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

import { FloorService } from '../floor.service';
import { Floor } from '../floor.schema';
import { Command } from './command';
import { CreateFloorCommand } from './createFloor.command';

@Injectable()
export class CommandHandler {
  constructor(private floorService: FloorService) {}

  async handler(command: Command): Promise<Floor> {
    switch (command.action) {
      case 'CreateFloor':
        return this.handleCreateFloorCommand(command as CreateFloorCommand);
      default:
        throw new RpcException(`Unsupported command action: ${command.action}`);
    }
  }

  private async handleCreateFloorCommand(command: CreateFloorCommand) {
    return this.floorService.createOne(command.data);
  }
}
