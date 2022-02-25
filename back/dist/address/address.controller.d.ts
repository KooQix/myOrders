import { AddressService } from './address.service';
export declare class AddressController {
    private readonly service;
    constructor(service: AddressService);
    findAll(): Promise<import("./entities/address.entity").Address[]>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
