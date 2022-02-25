import { Address } from 'src/address/entities/address.entity';
import { Order } from 'src/order/entities/order.entity';
import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Client {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    phone: string;

    @OneToMany(() => Address, (address) => address.client, {
        nullable: false,
        eager: true,
        cascade: true,
    })
    addresses: Address[];

    @OneToMany(() => Order, (order) => order.client)
    orders: Order[];
}
