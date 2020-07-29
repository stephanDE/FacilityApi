import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { StudentEnrolledEvent } from './studentEnrolled.event';

import { FloorService } from '../floor.service';
import { Floor } from '../floor.schema';
import { Event } from './event';

@Injectable()
export class EventHandler {
  constructor(private floorService: FloorService) {}

  async handleEvent(event: Event): Promise<Floor> {
    console.log('ficken ajj');
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
  ): Promise<Floor> {
    return this.floorService.enroll(event.data);
  }
}
