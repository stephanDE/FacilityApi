import { IsString, IsNotEmpty } from 'class-validator';

export class CreateFloorDto {
  @IsNotEmpty()
  @IsString()
  readonly floorName: string;

  @IsNotEmpty()
  @IsString()
  readonly facilityId: string;

  readonly flats: any[];
}
