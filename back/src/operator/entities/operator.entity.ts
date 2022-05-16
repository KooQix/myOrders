import { Company } from 'src/company/entities/company.entity';
import { Order } from 'src/order/entities/order.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
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

    orders: Order[];

    @ManyToOne(() => Company, (company) => company.operators, {
        nullable: false,
    })
    company: Company;
}
