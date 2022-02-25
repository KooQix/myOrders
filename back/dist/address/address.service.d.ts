import { Repository } from 'typeorm';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entities/address.entity';
export declare class AddressService {
    private readonly addRepo;
    constructor(addRepo: Repository<Address>);
    create(createAddressDto: CreateAddressDto): Address;
    findAll(): Promise<Address[]>;
    findOne(id: number): Promise<Address>;
    update(id: number, updateAddressDto: UpdateAddressDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
