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
exports.AuthMiddleware = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let AuthMiddleware = class AuthMiddleware {
    constructor(config, jwtService) {
        this.config = config;
        this.jwtService = jwtService;
        this.AUTH_SCHEMA = 'Bearer';
    }
    use(req, res, next) {
        const algorithms = this.config.auth.algorithms;
        const issuer = this.config.auth.issuer;
        const authHeader = req.headers.authorization
            ? req.headers.authorization.split(' ')
            : [''];
        if (authHeader[0] === this.AUTH_SCHEMA) {
            const token = authHeader[1];
            try {
                const validToken = this.jwtService.verify(token, {
                    algorithms,
                    issuer,
                });
                if (validToken) {
                    let roles = validToken.scope || [];
                    let resourceRoles = [];
                    try {
                        roles = validToken.realm_access.roles;
                    }
                    catch (error) {
                        roles = validToken.scope || [];
                    }
                    try {
                        resourceRoles =
                            validToken.resource_access[this.config.auth.resource].roles;
                    }
                    catch (error) {
                        resourceRoles = [];
                    }
                    req.user = {
                        id: validToken.sub,
                        name: validToken.preferred_username || validToken.name,
                        clientId: validToken.clientId,
                        roles,
                        resourceRoles,
                    };
                }
            }
            catch (err) {
                const message = err.message ? err.message : 'Invalid Token';
                throw new common_1.UnauthorizedException(message);
            }
        }
        else {
            throw new common_1.UnauthorizedException(`Unsupported authentication method: ${authHeader[0]}. Please use 'bearer' instead.`);
        }
        next();
    }
};
AuthMiddleware = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('CONFIG')),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService])
], AuthMiddleware);
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=auth.middleware.js.map