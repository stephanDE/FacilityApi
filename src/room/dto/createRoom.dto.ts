import { IsString, IsNotEmpty } from 'class-validator';

export class CreateRoomDto {
  @IsNotEmpty()
  @IsString()
  readonly roomName: string;

  @IsNotEmpty()
  @IsString()
  readonly flatId: string;

  readonly deviceId: string;
}
