import { Address } from 'src/address/entities/address.entity';
import { Order } from 'src/order/entities/order.entity';
export declare class Client {
    id: number;
    name: string;
    surname: string;
    phone: string;
    addresses: Address[];
    orders: Order[];
    created_at: Date;
    updated_at: Date;
}
