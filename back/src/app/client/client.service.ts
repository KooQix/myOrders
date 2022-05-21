import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressService } from 'src/app/address/address.service';
import { Repository } from 'typeorm';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientService {
    constructor(
        @InjectRepository(Client)
        private readonly clientRepo: Repository<Client>,
        private addressService: AddressService
    ) {}

    create(createClientDto: CreateClientDto) {
        return this.clientRepo.save(createClientDto);
    }

    findAll() {
        return this.clientRepo.find({
            order: {
                name: 'ASC',
            },
        });
    }

    findOne(id: number) {
        return this.clientRepo.findOne(id);
    }

    async update(id: number, updateClientDto: UpdateClientDto) {
        for (let address of updateClientDto.addresses) {
            await this.addressService.update(address.id, address);
        }
        delete updateClientDto.addresses;
        return this.clientRepo.update(id, updateClientDto);
    }

    remove(id: number) {
        return this.clientRepo.delete(id);
    }
}
