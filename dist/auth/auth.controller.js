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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
let AuthController = class AuthController {
    constructor(config, httpService) {
        this.config = config;
        this.httpService = httpService;
    }
    async createOne(requestBody) {
        const { username, password } = requestBody;
        if (!username) {
            throw new common_1.BadRequestException('Username is required');
        }
        if (!password) {
            throw new common_1.BadRequestException('Password is required');
        }
        return this.httpService.post('https://94.130.56.60.xip.io/auth/realms/edu/protocol/openid-connect/token', {
            grant_type: 'password',
            client_id: 'university-service',
            client_secret: 'b2d96771-376e-4bb6-9003-fdeea55e542c',
            username,
            password,
            scope: 'roles',
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
    }
};
__decorate([
    common_1.Post(''),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "createOne", null);
AuthController = __decorate([
    common_1.Controller('auth'),
    __param(0, common_1.Inject('CONFIG')),
    __metadata("design:paramtypes", [Object, common_1.HttpService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map