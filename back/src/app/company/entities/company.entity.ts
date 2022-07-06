import { Operator } from 'src/app/operator/entities/operator.entity';
import { Site } from 'src/app/site/entities/site.entity';
import {
    Column,
    Entity,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
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
        eager: false,
    })
    operators: Operator[];

    @ManyToOne(() => Site, (site) => site.companies, {
        nullable: false,
        eager: true,
    })
    site: Site;
}
