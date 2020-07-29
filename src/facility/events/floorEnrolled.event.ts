import {
  IsOptional,
  IsString,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';

import { Event } from './event';

export class FloorEnrolledEvent extends Event {
  data: any;
}
