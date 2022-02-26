import { Address } from 'src/address/entities/address.entity';
import { Client } from 'src/client/entities/client.entity';
import { Operator } from 'src/operator/entities/operator.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date_chargement: Date;

    @Column()
    date_dechargement: Date;

    @ManyToOne(() => Client, (client) => client.orders, {
        eager: true,
        nullable: false,
    })
    client: Client;

    @ManyToOne(() => Address, (address) => address.orders, {
        eager: true,
        nullable: false,
    })
    address: Address;

    @Column()
    price: number;

    @ManyToOne(() => Operator, (operator) => operator.orders, {
        eager: true,
        nullable: true,
    })
    operator?: Operator;

    @Column()
    produit: string;

    @Column({ nullable: true, length: 900 })
    info?: string;
}
