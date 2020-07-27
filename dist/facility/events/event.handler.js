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
exports.EventHandler = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const facility_service_1 = require("../facility.service");
let EventHandler = class EventHandler {
    constructor(universityService) {
        this.universityService = universityService;
    }
    async handleEvent(event) {
        switch (event.action) {
            case 'StudentEnrolled': {
                return this.handleStudentEnrolledEvent(event);
            }
            default:
                throw new microservices_1.RpcException(`Unsupported event action: ${event.action}`);
        }
    }
    async handleStudentEnrolledEvent(event) {
        return this.universityService.enroll(event.data);
    }
};
EventHandler = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [facility_service_1.FacilityService])
], EventHandler);
exports.EventHandler = EventHandler;
//# sourceMappingURL=event.handler.js.map