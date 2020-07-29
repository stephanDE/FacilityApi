import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { FloorEnrolledEvent } from './floorEnrolled.event';

import { FacilityService } from '../facility.service';
import { Facility } from '../facility.schema';
import { Event } from './event';
import { FloorService } from 'src/floor/floor.service';

@Injectable()
export class EventHandler {
  constructor(
    private facilityService: FacilityService,
    private floorService: FloorService,
  ) {}

  async handleEvent(event: Event): Promise<Facility> {
    switch (event.action) {
      case 'FloorEnrolled': {
        return this.handleFloorEnrolledEvent(event as FloorEnrolledEvent);
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
}
