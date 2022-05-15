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
exports.OperatorController = void 0;
const common_1 = require("@nestjs/common");
const operator_service_1 = require("./operator.service");
const create_operator_dto_1 = require("./dto/create-operator.dto");
const update_operator_dto_1 = require("./dto/update-operator.dto");
let OperatorController = class OperatorController {
    constructor(operatorService) {
        this.operatorService = operatorService;
    }
    async create(createOperatorDto) {
        var _a;
        try {
            return await this.operatorService.create(createOperatorDto);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException((_a = error.sqlMessage) !== null && _a !== void 0 ? _a : error);
        }
    }
    async findAll() {
        var _a;
        try {
            return await this.operatorService.findAll();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException((_a = error.sqlMessage) !== null && _a !== void 0 ? _a : error);
        }
    }
    async findOne(id) {
        var _a;
        try {
            return await this.operatorService.findOne(+id);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException((_a = error.sqlMessage) !== null && _a !== void 0 ? _a : error);
        }
    }
    async update(id, updateOperatorDto) {
        var _a;
        try {
            return await this.operatorService.update(+id, updateOperatorDto);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException((_a = error.sqlMessage) !== null && _a !== void 0 ? _a : error);
        }
    }
    async remove(id) {
        var _a;
        try {
            return await this.operatorService.remove(+id);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException((_a = error.sqlMessage) !== null && _a !== void 0 ? _a : error);
        }
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_operator_dto_1.CreateOperatorDto]),
    __metadata("design:returntype", Promise)
], OperatorController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OperatorController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OperatorController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_operator_dto_1.UpdateOperatorDto]),
    __metadata("design:returntype", Promise)
], OperatorController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OperatorController.prototype, "remove", null);
OperatorController = __decorate([
    (0, common_1.Controller)('operator'),
    __metadata("design:paramtypes", [operator_service_1.OperatorService])
], OperatorController);
exports.OperatorController = OperatorController;
//# sourceMappingURL=operator.controller.js.map