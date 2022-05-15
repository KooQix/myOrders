import { Company } from 'src/company/entities/company.entity';
import { Order } from 'src/order/entities/order.entity';
export declare class Operator {
    id: number;
    name?: string;
    surname: string;
    phone: string;
    orders: Order[];
    company: Company;
    created_at: Date;
    updated_at: Date;
}
