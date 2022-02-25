import { Address } from 'src/address/entities/address.entity';
import { Client } from 'src/client/entities/client.entity';
import { Operator } from 'src/operator/entities/operator.entity';
export declare class Order {
    id: number;
    date_chargement: Date;
    date_dechargement: Date;
    client: Client;
    address: Address;
    price: number;
    operator?: Operator;
    produit: string;
    info?: string;
}
