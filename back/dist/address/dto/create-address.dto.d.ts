import { Client } from 'src/client/entities/client.entity';
export declare class CreateAddressDto {
    city: string;
    zip: number;
    street: string;
    client: Client;
}
