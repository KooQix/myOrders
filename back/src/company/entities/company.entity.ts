import { Operator } from 'src/operator/entities/operator.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Company {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    city: string;

    @Column()
    zip: string;

    @Column()
    phone: string;

    @Column()
    paid_per_day: boolean;

    @OneToMany(() => Operator, (operator) => operator.company, {
        nullable: false,
        eager: true,
    })
    operators: Operator[];
}
