import { Order } from 'src/app/order/entities/order.entity';
import { Site } from 'src/app/site/entities/site.entity';
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true })
    name: string;

    @Column({ nullable: false, type: 'float' })
    price: number;

    @OneToMany(() => Order, (order) => order.product)
    orders: Order[];

    @ManyToOne(() => Site, (site) => site.products, {
        nullable: false,
        eager: true,
    })
    site: Site;
}
