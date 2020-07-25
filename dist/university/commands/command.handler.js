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
exports.CommandHandler = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const university_service_1 = require("../university.service");
let CommandHandler = class CommandHandler {
    constructor(universityService) {
        this.universityService = universityService;
    }
    async handler(command) {
        switch (command.action) {
            case 'CreateUniversity':
                return this.handleCreateUniversityCommand(command);
            default:
                throw new microservices_1.RpcException(`Unsupported command action: ${command.action}`);
        }
    }
    async handleCreateUniversityCommand(command) {
        return this.universityService.createOne(command.data);
    }
};
CommandHandler = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [university_service_1.UniversityService])
], CommandHandler);
exports.CommandHandler = CommandHandler;
//# sourceMappingURL=command.handler.js.map