import { OperatorService } from './operator.service';
import { CreateOperatorDto } from './dto/create-operator.dto';
import { UpdateOperatorDto } from './dto/update-operator.dto';
export declare class OperatorController {
    private readonly operatorService;
    constructor(operatorService: OperatorService);
    create(createOperatorDto: CreateOperatorDto): Promise<CreateOperatorDto & import("./entities/operator.entity").Operator>;
    findAll(): Promise<import("./entities/operator.entity").Operator[]>;
    findOne(id: string): Promise<import("./entities/operator.entity").Operator>;
    update(id: string, updateOperatorDto: UpdateOperatorDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
