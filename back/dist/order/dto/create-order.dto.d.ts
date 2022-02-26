import { Address } from 'src/address/entities/address.entity';
import { Client } from 'src/client/entities/client.entity';
export declare class CreateOrderDto {
    date_chargement: Date;
    date_dechargement: Date;
    client: Client;
    address: Address;
    price: number;
    produit: string;
}
