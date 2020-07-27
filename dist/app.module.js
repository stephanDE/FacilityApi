"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const facility_module_1 = require("./facility/facility.module");
const config_module_1 = require("./config/config.module");
const config_service_1 = require("./config/config.service");
const kafka_module_1 = require("./kafka/kafka.module");
const auth_module_1 = require("./auth/auth.module");
let AppModule = class AppModule {
    configure(consumer) {
    }
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_module_1.ConfigModule],
                useFactory: async (configService) => ({
                    uri: configService.getConfig().mongo.uri,
                }),
                inject: [config_service_1.ConfigService],
            }),
            jwt_1.JwtModule.registerAsync({
                inject: [config_service_1.ConfigService],
                useFactory: async (configService) => ({
                    publicKey: configService.getConfig().auth.publicKey,
                }),
            }),
            kafka_module_1.KafkaModule.forRootAsync(),
            config_module_1.ConfigModule.forRoot(),
            facility_module_1.FacilityModule,
            auth_module_1.AuthModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map