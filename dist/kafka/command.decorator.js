"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cmd = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const microservices_1 = require("@nestjs/microservices");
const createUniversity_command_1 = require("../facility/commands/createUniversity.command");
exports.Cmd = common_1.createParamDecorator(async (data, ctx) => {
    const ctxData = ctx.switchToRpc().getData();
    const value = ctxData.value;
    if (!ctxData || !ctxData.value || !ctxData.topic || !value.type) {
        throw new microservices_1.RpcException('Invalid kafka message');
    }
    let command;
    switch (value.action) {
        case 'CreateUniversity':
            command = class_transformer_1.plainToClass(createUniversity_command_1.CreateUniversityCommand, value);
            break;
        default:
            throw new microservices_1.RpcException('unknown command type');
    }
    const errors = await class_validator_1.validate(command);
    if (errors.length > 0) {
        throw new microservices_1.RpcException(errors);
    }
    return command;
});
//# sourceMappingURL=command.decorator.js.map