"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const app_module_1 = require("./app.module");
const config_service_1 = require("./config/config.service");
const logging_service_1 = require("./logging/logging.service");
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: true,
    });
    const configService = app.get(config_service_1.ConfigService);
    const logger = app.get(logging_service_1.LoggingService);
    const config = configService.getConfig();
    app.enableCors();
    app.setGlobalPrefix(config.prefix);
    app.useLogger(logger);
    app.connectMicroservice({
        transport: microservices_1.Transport.KAFKA,
        options: {
            client: {
                clientId: config.kafka.clientId,
                brokers: config.kafka.brokerUris,
            },
            consumer: {
                groupId: `${config.kafka.prefix}-${config.kafka.clientId}-consumer`,
            },
        },
    });
    await app.startAllMicroservicesAsync();
    await app.listen(config.port);
    logger.log(`Facility service running on port ${config.port}`);
    logger.warn('servus du da');
}
bootstrap();
//# sourceMappingURL=main.js.map