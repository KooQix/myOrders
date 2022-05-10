"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const operator_module_1 = require("./operator/operator.module");
const client_module_1 = require("./client/client.module");
const address_module_1 = require("./address/address.module");
const order_module_1 = require("./order/order.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: (_a = process.env.DB_HOST) !== null && _a !== void 0 ? _a : 'localhost',
                port: (_b = parseInt(process.env.DB_PORT)) !== null && _b !== void 0 ? _b : 3306,
                username: (_c = process.env.DB_USER) !== null && _c !== void 0 ? _c : 'root',
                password: (_d = process.env.DB_PASS) !== null && _d !== void 0 ? _d : '',
                database: process.env.DB_NAME,
                autoLoadEntities: true,
                synchronize: true,
            }),
            operator_module_1.OperatorModule,
            client_module_1.ClientModule,
            address_module_1.AddressModule,
            order_module_1.OrderModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map