import { Address } from 'src/address/entities/address.entity';
import { Order } from 'src/order/entities/order.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
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

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    })
    created_at: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    })
    updated_at: Date;
}
