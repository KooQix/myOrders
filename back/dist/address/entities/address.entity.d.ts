import { Client } from 'src/client/entities/client.entity';
import { Order } from 'src/order/entities/order.entity';
export declare class Address {
    id: number;
    city: string;
    zip: number;
    street: string;
    number?: number;
    code_chantier?: number;
    client: Client;
    orders: Order[];
}
