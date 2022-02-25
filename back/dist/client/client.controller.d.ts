import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
export declare class ClientController {
    private readonly clientService;
    constructor(clientService: ClientService);
    create(createClientDto: CreateClientDto): Promise<CreateClientDto & import("./entities/client.entity").Client>;
    findAll(): Promise<import("./entities/client.entity").Client[]>;
    findOne(id: string): Promise<import("./entities/client.entity").Client>;
    update(id: string, updateClientDto: UpdateClientDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
