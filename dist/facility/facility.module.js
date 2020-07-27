"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacilityModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const facility_controller_1 = require("./facility.controller");
const facility_schema_1 = require("./facility.schema");
const logging_module_1 = require("../logging/logging.module");
const facility_service_1 = require("./facility.service");
const command_handler_1 = require("./commands/command.handler");
const event_handler_1 = require("./events/event.handler");
let FacilityModule = class FacilityModule {
};
FacilityModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: 'Facilities',
                    schema: facility_schema_1.FacilitySchema,
                },
            ]),
            logging_module_1.LoggingModule,
        ],
        controllers: [facility_controller_1.FacilityController],
        providers: [facility_service_1.FacilityService, command_handler_1.CommandHandler, event_handler_1.EventHandler],
    })
], FacilityModule);
exports.FacilityModule = FacilityModule;
//# sourceMappingURL=facility.module.js.map