import { IsString, IsNotEmpty } from 'class-validator';

export class CreateFlatDto {
  @IsNotEmpty()
  @IsString()
  readonly flatName: string;

  @IsNotEmpty()
  @IsString()
  readonly floorId: string;

  readonly rooms: any[];
}
