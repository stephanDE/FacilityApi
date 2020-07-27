import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { StudentEnrolledEvent } from './studentEnrolled.event';

import { FacilityService } from '../facility.service';
import { Facility } from '../facility.schema';
import { Event } from './event';

@Injectable()
export class EventHandler {
  constructor(private facilityService: FacilityService) {}

  async handleEvent(event: Event): Promise<Facility> {
    switch (event.action) {
      case 'StudentEnrolled': {
        return this.handleStudentEnrolledEvent(event as StudentEnrolledEvent);
      }

      default:
        throw new RpcException(`Unsupported event action: ${event.action}`);
    }
  }

  private async handleStudentEnrolledEvent(
    event: StudentEnrolledEvent,
  ): Promise<Facility> {
    return this.facilityService.enroll(event.data);
  }
}
