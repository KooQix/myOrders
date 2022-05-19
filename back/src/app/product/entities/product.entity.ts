import { Order } from 'src/app/order/entities/order.entity';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true })
    name: string;

    @Column({ nullable: false, type: 'float' })
    price: number;

    orders: Order[];
}
