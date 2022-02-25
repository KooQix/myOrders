import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientService {
    constructor(
        @InjectRepository(Client)
        private readonly clientRepo: Repository<Client>
    ) {}

    create(createClientDto: CreateClientDto) {
        return this.clientRepo.save(createClientDto);
    }

    findAll() {
        return this.clientRepo.find();
    }

    findOne(id: number) {
        return this.clientRepo.findOne(id);
    }

    update(id: number, updateClientDto: UpdateClientDto) {
        return this.clientRepo.update(id, updateClientDto);
    }

    remove(id: number) {
        return this.clientRepo.delete(id);
    }
}
