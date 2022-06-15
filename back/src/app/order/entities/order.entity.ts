import { Exclude } from 'class-transformer';
import { Address } from 'src/app/address/entities/address.entity';
import { Client } from 'src/app/client/entities/client.entity';
import { Operator } from 'src/app/operator/entities/operator.entity';
import { Product } from 'src/app/product/entities/product.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

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

    @Column({ nullable: false, type: 'float' })
    price: number;

    @Column({ nullable: false, type: 'float' })
    tonnage: number;

    @Column({ nullable: false, type: 'float' })
    deblais: number;

    @ManyToOne(() => Product, (product) => product.orders, {
        nullable: false,
        eager: true,
    })
    product: Product;

    @ManyToMany(() => Operator, {
        eager: true,
        nullable: true,
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinTable()
    operators?: Operator[];

    @Column({ nullable: true, length: 900 })
    info?: string;

    @Column({ default: null })
    sent: boolean;

    constructor(partial: Partial<Order>) {
        Object.assign(this, partial);
    }
}
