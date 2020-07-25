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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniversityController = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const microservices_1 = require("@nestjs/microservices");
const mongoid_pipe_1 = require("../pipe/mongoid.pipe");
const kafkaTopic_decorator_1 = require("../kafka/kafkaTopic.decorator");
const command_decorator_1 = require("../kafka/command.decorator");
const auth_decorator_1 = require("../auth/auth.decorator");
const auth_guard_1 = require("../auth/auth.guard");
const kafka_exception_filter_1 = require("../kafka/kafka.exception.filter");
const command_1 = require("./commands/command");
const createUniversity_dto_1 = require("./dto/createUniversity.dto");
const event_1 = require("./events/event");
const command_handler_1 = require("./commands/command.handler");
const event_handler_1 = require("./events/event.handler");
const event_decorator_1 = require("../kafka/event.decorator");
const university_service_1 = require("./university.service");
let UniversityController = class UniversityController {
    constructor(kafkaClient, config, commandHandler, eventHandler, universityService) {
        this.kafkaClient = kafkaClient;
        this.config = config;
        this.commandHandler = commandHandler;
        this.eventHandler = eventHandler;
        this.universityService = universityService;
    }
    async createOne(dto) {
        const university = await this.universityService.createOne(dto);
        const event = {
            id: uuid_1.v4(),
            type: 'event',
            action: 'UniversityCreated',
            timestamp: Date.now(),
            data: university,
        };
        this.kafkaClient.emit(`${this.config.kafka.prefix}-university-event`, event);
        return university;
    }
    async getAll() {
        return this.universityService.findAll();
    }
    async getOne(id) {
        return this.universityService.findOne(id);
    }
    async onCommand(command) {
        const university = await this.commandHandler.handler(command);
        const event = {
            id: uuid_1.v4(),
            type: 'event',
            action: 'UniversityCreated',
            timestamp: Date.now(),
            data: university,
        };
        this.kafkaClient.emit(`${this.config.kafka.prefix}-university-event`, event);
        return;
    }
    async onStudentEvent(event) {
        await this.eventHandler.handleEvent(event);
        return;
    }
};
__decorate([
    common_1.Post(''),
    auth_decorator_1.Roles('Create'),
    common_1.UsePipes(common_1.ValidationPipe),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createUniversity_dto_1.CreateUniversityDto]),
    __metadata("design:returntype", Promise)
], UniversityController.prototype, "createOne", null);
__decorate([
    auth_decorator_1.Roles('Read'),
    common_1.Get(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UniversityController.prototype, "getAll", null);
__decorate([
    common_1.Get('/:id'),
    __param(0, common_1.Param('id', new mongoid_pipe_1.MongoPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UniversityController.prototype, "getOne", null);
__decorate([
    kafkaTopic_decorator_1.KafkaTopic(`university-command`),
    __param(0, command_decorator_1.Cmd()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [command_1.Command]),
    __metadata("design:returntype", Promise)
], UniversityController.prototype, "onCommand", null);
__decorate([
    kafkaTopic_decorator_1.KafkaTopic('student-event'),
    __param(0, event_decorator_1.Evt()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [event_1.Event]),
    __metadata("design:returntype", Promise)
], UniversityController.prototype, "onStudentEvent", null);
UniversityController = __decorate([
    common_1.Controller('university'),
    common_1.UseGuards(auth_guard_1.RoleGuard),
    common_1.UseFilters(kafka_exception_filter_1.ExceptionFilter),
    __param(0, common_1.Inject('KAFKA_SERVICE')),
    __param(1, common_1.Inject('CONFIG')),
    __metadata("design:paramtypes", [microservices_1.ClientKafka, Object, command_handler_1.CommandHandler,
        event_handler_1.EventHandler,
        university_service_1.UniversityService])
], UniversityController);
exports.UniversityController = UniversityController;
//# sourceMappingURL=university.controller.js.map