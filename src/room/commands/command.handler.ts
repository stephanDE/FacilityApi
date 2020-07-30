import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

import { RoomService } from '../room.service';
import { Room } from '../room.schema';
import { CreateRoomCommand } from './createRoom.command';
import { Command } from 'src/facility/commands/command';

@Injectable()
export class CommandHandler {
  constructor(private roomService: RoomService) {}

  async handler(command: Command): Promise<Room> {
    switch (command.action) {
      case 'CreateRoom':
        return this.handleCreateRoomCommand(command as CreateRoomCommand);
      default:
        throw new RpcException(`Unsupported command action: ${command.action}`);
    }
  }

  private async handleCreateRoomCommand(command: CreateRoomCommand) {
    return this.roomService.createOne(command.data);
  }
}
