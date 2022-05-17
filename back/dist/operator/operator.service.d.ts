import { Repository } from 'typeorm';
import { CreateOperatorDto } from './dto/create-operator.dto';
import { UpdateOperatorDto } from './dto/update-operator.dto';
import { Operator } from './entities/operator.entity';
export declare class OperatorService {
    private readonly opRepo;
    constructor(opRepo: Repository<Operator>);
    create(createOperatorDto: CreateOperatorDto): Promise<CreateOperatorDto & Operator>;
    findAll(): Promise<Operator[]>;
    findOne(id: number): Promise<Operator>;
    update(id: number, updateOperatorDto: UpdateOperatorDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    findAllByCompany(id: string): Promise<Operator[]>;
}
