import { Order } from 'src/app/order/entities/order.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true })
    name: string;

    @Column({ nullable: false, type: 'float' })
    price: number;

    @OneToMany(() => Order, (order) => order.product)
    orders: Order[];
}
