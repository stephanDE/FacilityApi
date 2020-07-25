"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniversityModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const university_controller_1 = require("./university.controller");
const university_schema_1 = require("./university.schema");
const logging_module_1 = require("../logging/logging.module");
const university_service_1 = require("./university.service");
const command_handler_1 = require("./commands/command.handler");
const event_handler_1 = require("./events/event.handler");
let UniversityModule = class UniversityModule {
};
UniversityModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: 'Universities',
                    schema: university_schema_1.UniversitySchema,
                },
            ]),
            logging_module_1.LoggingModule,
        ],
        controllers: [university_controller_1.UniversityController],
        providers: [university_service_1.UniversityService, command_handler_1.CommandHandler, event_handler_1.EventHandler],
    })
], UniversityModule);
exports.UniversityModule = UniversityModule;
//# sourceMappingURL=university.module.js.map