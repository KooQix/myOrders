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
exports.ClientService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const address_service_1 = require("../address/address.service");
const typeorm_2 = require("typeorm");
const client_entity_1 = require("./entities/client.entity");
let ClientService = class ClientService {
    constructor(clientRepo, addressService) {
        this.clientRepo = clientRepo;
        this.addressService = addressService;
    }
    create(createClientDto) {
        return this.clientRepo.save(createClientDto);
    }
    findAll() {
        return this.clientRepo.find();
    }
    findOne(id) {
        return this.clientRepo.findOne(id);
    }
    async update(id, updateClientDto) {
        for (let address of updateClientDto.addresses) {
            await this.addressService.update(address.id, address);
        }
        delete updateClientDto.addresses;
        return this.clientRepo.update(id, updateClientDto);
    }
    remove(id) {
        return this.clientRepo.delete(id);
    }
};
ClientService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(client_entity_1.Client)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        address_service_1.AddressService])
], ClientService);
exports.ClientService = ClientService;
//# sourceMappingURL=client.service.js.map