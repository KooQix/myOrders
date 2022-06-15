import { Client } from 'src/app/client/entities/client.entity';
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from 'src/app/order/entities/order.entity';

@Entity()
export class Address {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    city: string;

    @Column()
    zip: string;

    @Column()
    street: string;

    @Column({ nullable: true })
    number?: number;

    @Column({ nullable: true })
    code_chantier?: string;

    @ManyToOne(() => Client, (client) => client.addresses, {
        nullable: false,
    })
    client: Client;

    @OneToMany(() => Order, (order) => order.address)
    orders: Order[];

    public toString(): string {
        return `${(!!this.number ? this.number + ' ' : '') + this.street}\n${
            this.zip
        } ${this.city}`;
    }
}
