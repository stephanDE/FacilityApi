import { IsNotEmpty, ValidateNested, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { Command } from 'src/facility/commands/command';

class Room {
  @IsNotEmpty()
  @IsString()
  readonly roomName;

  @IsNotEmpty()
  @IsString()
  readonly flatId;

  readonly deviceId: string;
}

export class CreateRoomCommand extends Command {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Room)
  readonly data: Room;
}
