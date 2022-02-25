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
exports.OperatorService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const operator_entity_1 = require("./entities/operator.entity");
let OperatorService = class OperatorService {
    constructor(opRepo) {
        this.opRepo = opRepo;
    }
    create(createOperatorDto) {
        return this.opRepo.save(createOperatorDto);
    }
    findAll() {
        return this.opRepo.find();
    }
    findOne(id) {
        return this.opRepo.findOne(id);
    }
    update(id, updateOperatorDto) {
        return this.opRepo.update(id, updateOperatorDto);
    }
    remove(id) {
        return this.opRepo.delete(id);
    }
};
OperatorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(operator_entity_1.Operator)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OperatorService);
exports.OperatorService = OperatorService;
//# sourceMappingURL=operator.service.js.map