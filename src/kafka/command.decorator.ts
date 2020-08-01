import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { RpcException } from '@nestjs/microservices';

import { Command } from '../facility/commands/command';
import { CreateFacilityCommand } from '../facility/commands/createFacility.command';
import { CreateFloorCommand } from 'src/floor/commands/createFloor.command';
import { CreateFlatCommand } from 'src/flat/commands/createFlat.command';
import { CreateRoomCommand } from 'src/room/commands/createRoom.command';

export const Cmd = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const ctxData = ctx.switchToRpc().getData();
    const value = ctxData.value;

    if (!ctxData || !ctxData.value || !ctxData.topic || !value.type) {
      throw new RpcException('Invalid kafka message');
    }

    let command: Command;

    switch (value.action) {
      case 'CreateFacility':
        command = plainToClass(CreateFacilityCommand, value);
        break;
      case 'CreateFloor':
        command = plainToClass(CreateFloorCommand, value);
        break;
      case 'CreateFlat':
        command = plainToClass(CreateFlatCommand, value);
        break;
      case 'CreateRoom':
        command = plainToClass(CreateRoomCommand, value);
        break;
      default:
        throw new RpcException('unknown command type');
    }

    // validate
    const errors = await validate(command);

    if (errors.length > 0) {
      throw new RpcException(errors);
    }

    return command;
  },
);
