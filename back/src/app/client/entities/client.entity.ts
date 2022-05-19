import { Address } from 'src/app/address/entities/address.entity';
import { Order } from 'src/app/order/entities/order.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Client {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    phone: number;

    @OneToMany(() => Address, (address) => address.client, {
        nullable: false,
        eager: true,
        cascade: true,
    })
    addresses: Address[];

    @OneToMany(() => Order, (order) => order.client)
    orders: Order[];

    public toString(): string {
        return `${this.name.toUpperCase()} ${this.surname}`;
    }
}
