import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { FloorEnrolledEvent } from './floorEnrolled.event';

import { FacilityService } from '../facility.service';
import { Facility } from '../facility.schema';
import { Event } from './event';
import { FloorService } from '../../floor/floor.service';
import { FlatEnrolledEvent } from './flatEnrolled.event';
import { Floor } from '../../floor/floor.schema';
import { FlatService } from 'src/flat/flat.service';
import { RoomEnrolledEvent } from './roomEnrolled.event';
import { Flat } from 'src/flat/flat.schema';

@Injectable()
export class EventHandler {
  constructor(
    private facilityService: FacilityService,
    private floorService: FloorService,
    private flatService: FlatService,
  ) {}

  async handleEvent(event: Event): Promise<any> {
    switch (event.action) {
      case 'FloorEnrolled': {
        return this.handleFloorEnrolledEvent(event as FloorEnrolledEvent);
      }

      case 'FlatEnrolled': {
        return this.handleFlatEnrolledEvent(event as FlatEnrolledEvent);
      }

      case 'RoomEnrolled': {
        return this.handleRoomEnrolledEvent(event as RoomEnrolledEvent);
      }

      default:
        throw new RpcException(`Unsupported event action: ${event.action}`);
    }
  }

  private async handleFloorEnrolledEvent(
    event: FloorEnrolledEvent,
  ): Promise<Facility> {
    return this.facilityService.enroll(event);
  }

  private async handleRoomEnrolledEvent(
    event: RoomEnrolledEvent,
  ): Promise<Flat> {
    return this.flatService.enroll(event);
  }

  private async handleFlatEnrolledEvent(
    event: FlatEnrolledEvent,
  ): Promise<Floor> {
    return this.floorService.enroll(event);
  }
}
