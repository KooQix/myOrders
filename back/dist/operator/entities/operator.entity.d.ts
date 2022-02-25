import { Order } from 'src/order/entities/order.entity';
export declare class Operator {
    id: number;
    name: string;
    surname: string;
    phone: string;
    orders: Order[];
}
