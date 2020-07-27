import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

import { FacilityService } from '../facility.service';
import { Facility } from '../facility.schema';
import { Command } from './command';
import { CreateUniversityCommand } from './createUniversity.command';

@Injectable()
export class CommandHandler {
  constructor(private universityService: FacilityService) {}

  async handler(command: Command): Promise<Facility> {
    switch (command.action) {
      case 'CreateUniversity':
        return this.handleCreateUniversityCommand(
          command as CreateUniversityCommand,
        );
      default:
        throw new RpcException(`Unsupported command action: ${command.action}`);
    }
  }

  private async handleCreateUniversityCommand(
    command: CreateUniversityCommand,
  ) {
    return this.universityService.createOne(command.data);
  }
}
