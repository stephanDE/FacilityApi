import { HttpService } from '@nestjs/common';
import { Config } from '../config/config.interface';
export declare class AuthController {
    private config;
    private httpService;
    constructor(config: Config, httpService: HttpService);
    createOne(requestBody: any): Promise<any>;
}
