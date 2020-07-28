import {
  Controller,
  Inject,
  Post,
  Body,
  HttpService,
  BadRequestException,
  Get,
} from '@nestjs/common';

import { Config } from '../config/config.interface';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('CONFIG') private config: Config,
    private httpService: HttpService,
  ) {}

  // ---------------- REST --------------------

  @Post('')
  async authUser(@Body() requestBody: any): Promise<any> {
    const { username, password } = requestBody;
    if (!username) {
      throw new BadRequestException('Username is required');
    }

    if (!password) {
      throw new BadRequestException('Password is required');
    }
    return this.httpService.post(
      'https://keycloak.auth/auth/realms/edu/protocol/openid-connect/token',
      {
        grant_type: 'password',
        client_id: 'university-service',
        client_secret: 'b2d96771-376e-4bb6-9003-fdeea55e542c',
        username,
        password,
        scope: 'roles',
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
  }

  @Get('')
  async get(): Promise<any> {
    return 'geht geht aber';
  }
}
