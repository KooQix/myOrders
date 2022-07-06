import { Client } from './../../client/entities/client.entity';
import { Product } from 'src/app/product/entities/product.entity';
import { Company } from 'src/app/company/entities/company.entity';
import { Operator } from 'src/app/operator/entities/operator.entity';
import { Order } from 'src/app/order/entities/order.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Site {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    password: string;

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

    //////////////////// Relations \\\\\\\\\\\\\\\\\\\\

    @OneToMany(() => Client, (client) => client.site, {
        nullable: false,
    })
    clients: Client[];

    @OneToMany(() => Company, (company) => company.site, {
        nullable: false,
    })
    companies: Company[];

    @OneToMany(() => Operator, (operator) => operator.site, {
        nullable: false,
    })
    operators: Operator[];

    @OneToMany(() => Order, (order) => order.site, {
        nullable: false,
    })
    orders: Operator[];

    @OneToMany(() => Product, (product) => product.site, {
        nullable: false,
    })
    products: Product[];
}
