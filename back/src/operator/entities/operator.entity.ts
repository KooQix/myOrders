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
