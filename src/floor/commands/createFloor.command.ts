import { IsNotEmpty, ValidateNested, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { Command } from 'src/facility/commands/command';

class Floor {
  @IsNotEmpty()
  @IsString()
  readonly floorName;

  @IsNotEmpty()
  @IsString()
  readonly facilityId;

  readonly flats: string[];
}

export class CreateFloorCommand extends Command {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Floor)
  readonly data: Floor;
}
