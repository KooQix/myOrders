import { Address } from 'src/address/entities/address.entity';
import { Client } from 'src/client/entities/client.entity';
export declare class CreateOrderDto {
    date_chargement: string;
    date_dechargement: string;
    client: Client;
    address: Address;
    price: number;
    produit: string;
}
