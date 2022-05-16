import { Address } from 'src/address/entities/address.entity';
import { Client } from 'src/client/entities/client.entity';
import { Operator } from 'src/operator/entities/operator.entity';
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

    @Column()
    price: number;

    @ManyToMany(() => Operator, {
        eager: true,
        nullable: true,
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinTable()
    operators?: Operator[];

    @Column()
    produit: string;

    @Column({ nullable: true, length: 900 })
    info?: string;
}
