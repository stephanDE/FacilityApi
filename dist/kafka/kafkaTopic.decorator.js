"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaTopic = void 0;
const microservices_1 = require("@nestjs/microservices");
const config_service_1 = require("../config/config.service");
const PATTERN_METADATA = 'microservices:pattern';
const TRANSPORT_METADATA = 'microservices:transport';
const PATTERN_HANDLER_METADATA = 'microservices:handler_type';
exports.KafkaTopic = (metadata) => {
    return (target, key, descriptor) => {
        const configService = new config_service_1.ConfigService();
        const config = configService.getConfig().kafka;
        Reflect.defineMetadata(PATTERN_METADATA, `${config.prefix}-${metadata}`, descriptor.value);
        Reflect.defineMetadata(PATTERN_HANDLER_METADATA, 2, descriptor.value);
        Reflect.defineMetadata(TRANSPORT_METADATA, microservices_1.Transport.KAFKA, descriptor.value);
        return descriptor;
    };
};
//# sourceMappingURL=kafkaTopic.decorator.js.map