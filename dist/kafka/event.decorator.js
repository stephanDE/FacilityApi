"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Evt = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const studentEnrolled_event_1 = require("../university/events/studentEnrolled.event");
exports.Evt = common_1.createParamDecorator(async (data, ctx) => {
    const ctxData = ctx.switchToRpc().getData();
    const value = ctxData.value;
    if (!ctxData ||
        !ctxData.value ||
        !ctxData.topic ||
        !value.type ||
        !value.action ||
        value.type != 'event') {
        throw new microservices_1.RpcException('Invalid kafka event message');
    }
    let event;
    switch (value.action) {
        case 'StudentEnrolled':
            event = class_transformer_1.plainToClass(studentEnrolled_event_1.StudentEnrolledEvent, value);
            break;
        default:
            throw new microservices_1.RpcException(`Unknown event action: ${value.action}`);
    }
    const errors = await class_validator_1.validate(event);
    if (errors.length > 0) {
        throw new microservices_1.RpcException(errors);
    }
    return event;
});
//# sourceMappingURL=event.decorator.js.map