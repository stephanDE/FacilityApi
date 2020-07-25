"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var KafkaModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaModule = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const config_service_1 = require("../config/config.service");
let KafkaModule = KafkaModule_1 = class KafkaModule {
    static forRootAsync() {
        const kafkaProvider = {
            provide: 'KAFKA_SERVICE',
            useFactory: async (configService) => {
                const kafkaConfig = configService.getConfig().kafka;
                const clientProxy = microservices_1.ClientProxyFactory.create({
                    transport: microservices_1.Transport.KAFKA,
                    options: {
                        client: {
                            clientId: kafkaConfig.clientId,
                            brokers: kafkaConfig.brokerUris,
                        },
                        consumer: {
                            groupId: `${kafkaConfig.prefix}-${kafkaConfig.clientId}-consumer`,
                        },
                    },
                });
                await clientProxy.connect();
                return clientProxy;
            },
            inject: [config_service_1.ConfigService],
        };
        return {
            module: KafkaModule_1,
            providers: [kafkaProvider],
            exports: [kafkaProvider],
        };
    }
};
KafkaModule = KafkaModule_1 = __decorate([
    common_1.Global(),
    common_1.Module({})
], KafkaModule);
exports.KafkaModule = KafkaModule;
//# sourceMappingURL=kafka.module.js.map