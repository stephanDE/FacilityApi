import { RpcExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { LoggingService } from '../logging/logging.service';
export declare class ExceptionFilter implements RpcExceptionFilter<RpcException> {
    private logger;
    constructor(logger: LoggingService);
    catch(exception: RpcException, host: ArgumentsHost): Observable<any>;
}
