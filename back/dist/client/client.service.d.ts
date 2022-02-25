import { Repository } from 'typeorm';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
export declare class ClientService {
    private readonly clientRepo;
    constructor(clientRepo: Repository<Client>);
    create(createClientDto: CreateClientDto): Promise<CreateClientDto & Client>;
    findAll(): Promise<Client[]>;
    findOne(id: number): Promise<Client>;
    update(id: number, updateClientDto: UpdateClientDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
