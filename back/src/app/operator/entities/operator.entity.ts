import { Company } from 'src/app/company/entities/company.entity';
import { Order } from 'src/app/order/entities/order.entity';
import { Site } from 'src/app/site/entities/site.entity';
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
    phone: string;

    orders: Order[];

    @ManyToOne(() => Company, (company) => company.operators, {
        nullable: false,
        eager: true,
    })
    company: Company;

    @ManyToOne(() => Site, (site) => site.operators, {
        nullable: false,
        eager: true,
    })
    site: Site;
}
