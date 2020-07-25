"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
const logging_service_1 = require("../logging/logging.service");
let ExceptionFilter = class ExceptionFilter {
    constructor(logger) {
        this.logger = logger;
    }
    catch(exception, host) {
        const value = host.switchToRpc().getData().value;
        const errors = exception.getError();
        if (errors instanceof Array) {
            let msg = '';
            for (const error of errors) {
                if (error.constraints) {
                    msg += `Error on property ${error.property} with ${JSON.stringify(error.constraints)} \n`;
                }
                else if (error.children) {
                    msg += `Error on nested property ${error.property} with \n`;
                    for (const nestedError of error.children) {
                        msg += `Error on property ${nestedError.property} with ${nestedError.constraints} \n`;
                    }
                }
            }
            exception.message = msg;
        }
        this.logger.error(`${exception.message} => ${JSON.stringify(value)}`);
        return rxjs_1.throwError(exception.getError());
    }
};
ExceptionFilter = __decorate([
    common_1.Catch(microservices_1.RpcException),
    __metadata("design:paramtypes", [logging_service_1.LoggingService])
], ExceptionFilter);
exports.ExceptionFilter = ExceptionFilter;
//# sourceMappingURL=kafka.exception.filter.js.map