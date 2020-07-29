import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { FloorEnrolledEvent } from './floorEnrolled.event';

import { FacilityService } from '../facility.service';
import { Facility } from '../facility.schema';
import { Event } from './event';

@Injectable()
export class EventHandler {
  constructor(private facilityService: FacilityService) {}

  async handleEvent(event: Event): Promise<Facility> {
    console.log('yeahhh');
    switch (event.action) {
      case 'FloorEnrolled': {
        console.log('huhu');
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
