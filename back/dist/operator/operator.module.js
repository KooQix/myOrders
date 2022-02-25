"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperatorModule = void 0;
const common_1 = require("@nestjs/common");
const operator_service_1 = require("./operator.service");
const operator_controller_1 = require("./operator.controller");
const operator_entity_1 = require("./entities/operator.entity");
const typeorm_1 = require("@nestjs/typeorm");
let OperatorModule = class OperatorModule {
};
OperatorModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([operator_entity_1.Operator])],
        controllers: [operator_controller_1.OperatorController],
        providers: [operator_service_1.OperatorService],
        exports: [operator_service_1.OperatorService],
    })
], OperatorModule);
exports.OperatorModule = OperatorModule;
//# sourceMappingURL=operator.module.js.map