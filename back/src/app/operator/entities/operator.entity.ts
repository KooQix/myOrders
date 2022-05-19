import { Company } from 'src/app/company/entities/company.entity';
import { Order } from 'src/app/order/entities/order.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Operator {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    name?: string;

    @Column()
    surname: string;

    @Column()
    phone: number;

    orders: Order[];

    @ManyToOne(() => Company, (company) => company.operators, {
        nullable: false,
        eager: true,
    })
    company: Company;
}
