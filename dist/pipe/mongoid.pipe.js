"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoPipe = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
class MongoPipe {
    async transform(value) {
        if (!class_validator_1.isMongoId(value)) {
            throw new common_1.BadRequestException('ID must be ObjectId');
        }
        return value;
    }
}
exports.MongoPipe = MongoPipe;
//# sourceMappingURL=mongoid.pipe.js.map