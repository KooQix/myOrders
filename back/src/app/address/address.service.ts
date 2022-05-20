import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entities/address.entity';

@Injectable()
export class AddressService {
    constructor(
        @InjectRepository(Address) private readonly addRepo: Repository<Address>
    ) {}

    create(createAddressDto: CreateAddressDto) {
        return this.addRepo.save(createAddressDto);
    }

    findAll() {
        return this.addRepo.find();
    }

    findOne(id: number) {
        return this.addRepo.findOne(id);
    }

    update(id: number, updateAddressDto: UpdateAddressDto) {
        return this.addRepo.update(id, updateAddressDto);
    }

    remove(id: number) {
        return this.addRepo.delete(id);
    }
}
