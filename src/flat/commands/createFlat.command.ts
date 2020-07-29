import { IsNotEmpty, ValidateNested, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { Command } from 'src/facility/commands/command';

class Flat {
  @IsNotEmpty()
  @IsString()
  readonly flatName;

  @IsNotEmpty()
  @IsString()
  readonly floorId;

  readonly rooms: string[];
}

export class CreateFlatCommand extends Command {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Flat)
  readonly data: Flat;
}
