import { Order } from 'src/order/entities/order.entity';
import {
    Column,
    Entity,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Operator {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    name?: string;

    @Column()
    surname: string;

    @Column()
    phone: string;

    @Column({ nullable: true })
    company?: string;

    @ManyToMany(() => Order, (order) => order.operators, { nullable: true })
    orders: Order[];
}
