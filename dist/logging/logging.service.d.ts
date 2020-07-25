import { Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Config } from '../config/config.interface';
export declare class LoggingService extends Logger {
    private kafkaClient;
    private config;
    constructor(kafkaClient: ClientKafka, config: Config);
    warn(warning: any, context?: string): void;
    error(err: any, trace?: string, context?: string): void;
    private logOnKafka;
}
