import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOperatorDto } from './dto/create-operator.dto';
import { UpdateOperatorDto } from './dto/update-operator.dto';
import { Operator } from './entities/operator.entity';

@Injectable()
export class OperatorService {
    constructor(
        @InjectRepository(Operator)
        private readonly opRepo: Repository<Operator>
    ) {}

    create(createOperatorDto: CreateOperatorDto) {
        return this.opRepo.save(createOperatorDto);
    }

    findAll(): Promise<Operator[]> {
        return this.opRepo.find();
    }

    findOne(id: number) {
        return this.opRepo.findOne(id);
    }

    update(id: number, updateOperatorDto: UpdateOperatorDto) {
        return this.opRepo.update(id, updateOperatorDto);
    }

    remove(id: number) {
        return this.opRepo.delete(id);
    }
}
