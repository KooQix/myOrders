import { Address } from 'src/app/address/entities/address.entity';
import { Order } from 'src/app/order/entities/order.entity';
import { Site } from 'src/app/site/entities/site.entity';
import {
    Column,
    Entity,
    ManyToOne,
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

    @ManyToOne(() => Site, (site) => site.clients, {
        nullable: false,
        eager: true,
    })
    site: Site;

    public toString(): string {
        return `${this.name.toUpperCase()} ${this.surname}`;
    }
}
