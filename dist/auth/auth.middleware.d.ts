import { NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { Config } from '../config/config.interface';
import { ExtendedRequest } from './auth.interface';
export declare class AuthMiddleware implements NestMiddleware {
    private config;
    private jwtService;
    private readonly AUTH_SCHEMA;
    constructor(config: Config, jwtService: JwtService);
    use(req: ExtendedRequest, res: Response, next: NextFunction): void;
}
