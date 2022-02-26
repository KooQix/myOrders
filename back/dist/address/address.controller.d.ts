import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
export declare class AddressController {
    private readonly service;
    constructor(service: AddressService);
    create(createAddressDto: CreateAddressDto): Promise<CreateAddressDto & import("./entities/address.entity").Address>;
    findAll(): Promise<import("./entities/address.entity").Address[]>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
